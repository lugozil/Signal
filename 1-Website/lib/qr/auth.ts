// Single shared team password for the QR panel. A successful login stores an
// HMAC-signed, httpOnly cookie; changing QR_TEAM_PASSWORD or QR_SESSION_SECRET
// invalidates every existing session.

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const SESSION_COOKIE = "signal_qr_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 180; // 180 days

function secrets() {
  const password = process.env.QR_TEAM_PASSWORD;
  const secret = process.env.QR_SESSION_SECRET ?? password;
  return password && secret ? { password, secret } : null;
}

function sign(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function isAuthConfigured() {
  return secrets() !== null;
}

export function checkPassword(input: string) {
  const s = secrets();
  if (!s) return false;
  // Compare HMACs so lengths always match and timing doesn't leak.
  return safeEqual(sign(input, s.secret), sign(s.password, s.secret));
}

/** Token bound to the current password, so rotating it logs everyone out. */
export function sessionToken() {
  const s = secrets();
  if (!s) throw new Error("QR_TEAM_PASSWORD no está configurada.");
  return sign(`session:${sign(s.password, s.secret)}`, s.secret);
}

export async function isLoggedIn() {
  // Read cookies first so every caller is always rendered per request.
  const value = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!secrets()) return false;
  return !!value && safeEqual(value, sessionToken());
}

/** Use at the top of every panel page and server action. */
export async function requireLogin() {
  if (!(await isLoggedIn())) redirect("/qr/login");
}
