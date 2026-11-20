// Shared (server + client) helpers for QR records: types, short-code
// generation and destination validation.

export const QR_BASE_URL = (
  process.env.NEXT_PUBLIC_QR_BASE_URL ?? "https://viralsignal.net"
).replace(/\/$/, "");

export type QrKind = "web" | "whatsapp" | "otro";

export type QrHistoryEntry = { destination: string; changedAt: string };

export type QrRecord = {
  /** Permanent short code encoded in the printed QR. Never changes. */
  code: string;
  name: string;
  /** Where /qr/{code} currently redirects. Editable at any time. */
  destination: string;
  kind: QrKind;
  whatsapp?: { phone: string; message: string };
  createdAt: string;
  updatedAt: string;
  /** Previous destinations, newest first. */
  history: QrHistoryEntry[];
};

/** The URL that is encoded in the QR image. Fixed forever for a given code. */
export function shortUrl(code: string) {
  return `${QR_BASE_URL}/qr/${code}`;
}

// No 0/o/1/l/i so codes can be read aloud or typed without confusion.
const ALPHABET = "23456789abcdefghjkmnpqrstuvwxyz";
const CODE_LENGTH = 6;

/** Codes that collide with panel routes under /qr. */
export const RESERVED_CODES = new Set(["nuevo", "editar", "ver", "login", "logout"]);

export const CODE_PATTERN = /^[a-z0-9]{3,32}$/;

export function generateCode() {
  const bytes = new Uint8Array(CODE_LENGTH);
  crypto.getRandomValues(bytes);
  let out = "";
  for (const b of bytes) out += ALPHABET[b % ALPHABET.length];
  return out;
}

const ALLOWED_PROTOCOLS = new Set(["http:", "https:", "tel:", "mailto:"]);

/**
 * Normalizes a user-entered destination ("google.com" → "https://google.com")
 * and returns null when it is not an acceptable redirect target.
 */
export function normalizeDestination(raw: string): string | null {
  const value = raw.trim();
  if (!value) return null;
  const withProtocol = /^[a-z][a-z0-9+.-]*:/i.test(value) ? value : `https://${value}`;
  try {
    const url = new URL(withProtocol);
    if (!ALLOWED_PROTOCOLS.has(url.protocol)) return null;
    if ((url.protocol === "http:" || url.protocol === "https:") && !url.hostname.includes(".")) {
      return null;
    }
    // Avoid loops: a QR must not point to another (or the same) short link.
    if (withProtocol.startsWith(`${QR_BASE_URL}/qr/`)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

/** Builds a wa.me link from a phone number (any formatting) and optional message. */
export function whatsappUrl(phone: string, message: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 8) return null;
  const text = message.trim();
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}
