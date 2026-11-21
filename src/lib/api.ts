export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export interface UserSessionParam {
  id?: string;
  email?: string;
  name?: string;
  role?: string;
  image?: string;
}

/**
 * Retrieve or exchange a JWT token from the backend.
 * Synchronizes user state with backend /api/jwt endpoint.
 */
export async function getBackendToken(user?: UserSessionParam | null): Promise<string | null> {
  if (typeof window === "undefined") return null;

  // Resolve user info from parameter or local client session first
  let activeUser = user;
  if (!activeUser?.email && typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("salonbook_client_session");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.user) activeUser = parsed.user;
      }
    } catch {}
  }

  // Check existing token validity and verify it matches the active user
  const existingToken = localStorage.getItem("salonbook_token");
  if (existingToken) {
    try {
      const parts = existingToken.split(".");
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        const isUnexpired = payload.exp && payload.exp * 1000 > Date.now();
        const matchesUser =
          !activeUser?.email ||
          payload.email?.toLowerCase() === activeUser.email.toLowerCase();

        if (isUnexpired && matchesUser) {
          // Token is valid and belongs to the currently logged-in account
          return existingToken;
        }
      }
    } catch {
      localStorage.removeItem("salonbook_token");
    }
    // Token belongs to another user or expired: purge it so fresh token is requested
    localStorage.removeItem("salonbook_token");
  }

  // Request new token from backend
  try {
    const res = await fetch(`${API_BASE_URL}/api/jwt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: activeUser?.email,
        userId: activeUser?.id,
        name: activeUser?.name,
        role: activeUser?.role || "customer",
        image: activeUser?.image,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("salonbook_token", data.token);
        return data.token;
      }
    }
  } catch (err) {
    console.error("Backend JWT exchange failed:", err);
  }

  return null;
}

/**
 * Book an appointment on the backend
 */
export async function createBackendAppointment(
  appointmentData: {
    serviceId: string;
    serviceName: string;
    servicePrice: number;
    category?: string;
    image?: string;
    appointmentDate: string;
    timeSlot: string;
    message?: string;
  },
  user?: UserSessionParam | null
) {
  const token = await getBackendToken(user);
  if (!token) {
    throw new Error("You must be logged in to book an appointment.");
  }

  const res = await fetch(`${API_BASE_URL}/api/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(appointmentData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to book appointment.");
  }

  return data;
}

/**
 * Fetch customer's own appointments from backend
 */
export async function getCustomerAppointments(user?: UserSessionParam | null) {
  const token = await getBackendToken(user);
  if (!token) return [];

  const res = await fetch(`${API_BASE_URL}/api/appointments/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return [];
  const data = await res.json();
  return data.appointments || [];
}

/**
 * Cancel customer's own appointment
 */
export async function cancelCustomerAppointment(appointmentId: string, user?: UserSessionParam | null) {
  const token = await getBackendToken(user);
  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${API_BASE_URL}/api/appointments/${appointmentId}/cancel`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to cancel appointment.");
  }
  return data;
}

/**
 * Fetch all appointments for Admin Dashboard
 */
export async function getAdminAppointments(user?: UserSessionParam | null) {
  const token = await getBackendToken(user);
  if (!token) return [];

  const res = await fetch(`${API_BASE_URL}/api/admin/appointments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return [];
  const data = await res.json();
  return data.appointments || [];
}

/**
 * Admin: Update appointment status (confirm or cancel)
 */
export async function updateAdminAppointmentStatus(
  appointmentId: string,
  status: "confirmed" | "cancelled",
  user?: UserSessionParam | null
) {
  const token = await getBackendToken(user);
  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${API_BASE_URL}/api/admin/appointments/${appointmentId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || `Failed to update appointment status to ${status}.`);
  }
  return data;
}

/**
 * Fetch all registered customers for Admin Dashboard from MongoDB
 */
export async function getAdminUsers(user?: UserSessionParam | null) {
  const token = await getBackendToken(user);
  if (!token) return [];

  const res = await fetch(`${API_BASE_URL}/api/admin/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return [];
  const data = await res.json();
  return data.users || [];
}

/**
 * Admin: Block or unblock a customer account
 */
export async function toggleAdminUserBlock(
  userId: string,
  isBlocked: boolean,
  user?: UserSessionParam | null
) {
  const token = await getBackendToken(user);
  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${API_BASE_URL}/api/admin/users/${userId}/block`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ isBlocked }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to update user block status.");
  }
  return data;
}
