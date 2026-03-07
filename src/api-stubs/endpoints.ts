/**
 * API Stubs — Placeholder endpoint definitions
 * These files document the expected request/response shapes for each backend endpoint.
 * They contain NO server logic — implement these on your backend (Supabase Edge Functions, Express, etc.)
 */

// ─── AUTH ────────────────────────────────────────────────────────────────────

/**
 * POST /auth/register
 * Request:  { companyName: string, adminName: string, adminEmail: string, password: string }
 * Response: { user: { id: string, email: string, role: string }, token: string }
 * Notes: Creates company + admin user. Returns JWT for session.
 */

/**
 * POST /auth/login
 * Request:  { email: string, password: string }
 * Response: { user: { id: string, email: string, role: string }, token: string }
 * Notes: Validates credentials, returns JWT. If MFA enabled, returns { mfaRequired: true, challengeId: string }.
 */

// ─── CHALLENGE / VERIFY (Hardware Auth) ─────────────────────────────────────

/**
 * POST /challenge
 * Request:  { userId: string, actionType: "approve" | "unlock" }
 * Response: { challengeId: string, expiresAt: string }
 * Notes: Initiates a hardware verification challenge (fingerprint/NFC). Returns a challenge ID.
 */

/**
 * POST /verify
 * Request:  { challengeId: string, response: string (biometric hash or NFC token) }
 * Response: { verified: boolean }
 * Notes: Verifies the hardware challenge response.
 */

// ─── DEVICE MANAGEMENT ──────────────────────────────────────────────────────

/**
 * POST /tamper
 * Request:  { deviceId: string, reportType: "firmware" | "network" | "behavior", details: string }
 * Response: { alertId: string, severity: string }
 * Notes: Reports a tamper event. System auto-isolates if severity is critical.
 */

/**
 * POST /onboard-request
 * Request:  { deviceName: string, deviceType: string, macAddress: string, firmwareVersion: string }
 * Response: { requestId: string, status: "pending" }
 * Notes: Submits a new device for onboarding approval.
 */

// ─── ADMIN ACTIONS ──────────────────────────────────────────────────────────

/**
 * POST /admin/approve
 * Request:  { requestId: string, reason: string, challengeVerification: string }
 * Response: { deviceId: string, status: "active" }
 * Notes: Approves a pending onboard request. Requires prior /challenge + /verify.
 */

/**
 * POST /admin/unlock
 * Request:  { deviceId: string, reason: string, challengeVerification: string, totpCode: string }
 * Response: { deviceId: string, status: "active" }
 * Notes: Unlocks a locked device. Requires hardware verification + TOTP.
 */

export {};
