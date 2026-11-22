export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

/**
 * Smart fetch with resilient local fallback:
 * Calls API_BASE_URL. If the app is opened on localhost and the remote backend
 * is protected or unreachable, it seamlessly attempts the local Express server on port 5001.
 */
export async function apiFetch(endpoint: string, options: RequestInit = {}): Promise<Response> {
  const targetUrl = `${API_BASE_URL}${endpoint}`;
  try {
    const res = await fetch(targetUrl, options);
    if (!res.ok && [401, 403, 404, 502, 503, 504].includes(res.status) && typeof window !== "undefined") {
      const isLocalHost =
        window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
      if (isLocalHost && !API_BASE_URL.includes("localhost") && !API_BASE_URL.includes("127.0.0.1")) {
        try {
          const localRes = await fetch(`http://localhost:5001${endpoint}`, options);
          if (localRes.ok) return localRes;
        } catch {}
      }
    }
    return res;
  } catch (err) {
    if (typeof window !== "undefined") {
      const isLocalHost =
        window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
      if (isLocalHost && !API_BASE_URL.includes("localhost") && !API_BASE_URL.includes("127.0.0.1")) {
        try {
          return await fetch(`http://localhost:5001${endpoint}`, options);
        } catch {}
      }
    }
    throw err;
  }
}

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
    const res = await apiFetch("/api/jwt", {
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

  const res = await apiFetch("/api/appointments", {
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

  try {
    const res = await apiFetch("/api/appointments/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data.appointments || [];
  } catch (err) {
    console.error("getCustomerAppointments error:", err);
    return [];
  }
}

/**
 * Cancel customer's own appointment
 */
export async function cancelCustomerAppointment(appointmentId: string, user?: UserSessionParam | null) {
  const token = await getBackendToken(user);
  if (!token) throw new Error("Unauthorized");

  const res = await apiFetch(`/api/appointments/${appointmentId}/cancel`, {
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

  try {
    const res = await apiFetch("/api/admin/appointments", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data.appointments || [];
  } catch (err) {
    console.error("getAdminAppointments error:", err);
    return [];
  }
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

  const res = await apiFetch(`/api/admin/appointments/${appointmentId}/status`, {
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

  try {
    const res = await apiFetch("/api/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data.users || [];
  } catch (err) {
    console.error("getAdminUsers error:", err);
    return [];
  }
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

  const res = await apiFetch(`/api/admin/users/${userId}/block`, {
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

/**
 * Customer: Create Stripe Checkout Session for a confirmed appointment
 */
export async function createStripeCheckoutSession(
  appointmentId: string,
  user?: UserSessionParam | null
) {
  const token = await getBackendToken(user);
  if (!token) throw new Error("You must be logged in to initiate checkout.");

  const res = await apiFetch("/api/payments/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ appointmentId }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to initiate Stripe Checkout session.");
  }
  return data as { sessionId: string; url: string };
}

/**
 * Public / Authenticated: Verify Stripe Checkout Session upon return to success page
 */
export async function verifyStripeSession(sessionId: string) {
  const res = await apiFetch(`/api/payments/verify-session/${encodeURIComponent(sessionId)}`);

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to verify Stripe payment session.");
  }
  return data as {
    success: boolean;
    isPaid: boolean;
    sessionId: string;
    amount: number;
    currency: string;
    customerEmail: string;
    customerName: string;
    appointmentId?: string;
    serviceName?: string;
  };
}

/**
 * Admin: Fetch all transactions (Strictly Read-Only Financial Ledger)
 */
export async function getAdminTransactions(user?: UserSessionParam | null) {
  const token = await getBackendToken(user);
  if (!token) return [];

  try {
    const res = await apiFetch("/api/admin/transactions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data.transactions || [];
  } catch (err) {
    console.error("getAdminTransactions error:", err);
    return [];
  }
}

/**
 * Customer: Fetch personal payment transactions
 */
export async function getCustomerTransactions(user?: UserSessionParam | null) {
  const token = await getBackendToken(user);
  if (!token) return [];

  try {
    const res = await apiFetch("/api/transactions/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data.transactions || [];
  } catch (err) {
    console.error("getCustomerTransactions error:", err);
    return [];
  }
}
