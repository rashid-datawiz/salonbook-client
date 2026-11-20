import { createAuthClient } from "better-auth/react"
import type { auth } from "./auth"
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || process.env.BETTER_AUTH_URL,
    plugins: [inferAdditionalFields<typeof auth>()]
})

export const { signIn, signUp, signOut, useSession } = authClient;

/**
 * Normalizes user role ("admin" | "customer") with client fallback for immediate UI reactivity
 */
export function getActiveUserRole(role?: string | null): "admin" | "customer" {
  if (role === "admin") return "admin";
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("salonbook_user_role");
    if (stored === "admin") return "admin";
  }
  return "customer";
}

export function setUserRolePreference(role: "admin" | "customer") {
  if (typeof window !== "undefined") {
    localStorage.setItem("salonbook_user_role", role);
  }
}

export function clearUserRolePreference() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("salonbook_user_role");
  }
}
