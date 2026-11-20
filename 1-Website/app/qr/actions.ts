"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  checkPassword,
  isAuthConfigured,
  requireLogin,
  sessionToken,
} from "@/lib/qr/auth";
import { createQr, updateQr } from "@/lib/qr/store";
import {
  CODE_PATTERN,
  normalizeDestination,
  whatsappUrl,
  type QrKind,
  type QrRecord,
} from "@/lib/qr/code";

export type FormState = { error?: string };

type ParsedInput = {
  name: string;
  destination: string;
  kind: QrKind;
  whatsapp?: QrRecord["whatsapp"];
};

function parseForm(formData: FormData): ParsedInput | { error: string } {
  const name = String(formData.get("name") ?? "").trim().slice(0, 120);
  const rawKind = String(formData.get("kind") ?? "web");
  const kind: QrKind = rawKind === "whatsapp" || rawKind === "otro" ? rawKind : "web";

  if (!name) return { error: "Ponle un nombre al QR para identificarlo." };

  if (kind === "whatsapp") {
    const phone = String(formData.get("phone") ?? "").trim();
    const message = String(formData.get("message") ?? "").slice(0, 1000);
    const destination = whatsappUrl(phone, message);
    if (!destination) {
      return { error: "Escribe el número de WhatsApp con código de país (ej. +1 787 528 8989)." };
    }
    return { name, kind, destination, whatsapp: { phone, message } };
  }

  const destination = normalizeDestination(String(formData.get("destination") ?? ""));
  if (!destination) {
    return { error: "El enlace de destino no es válido. Ejemplo: https://viralsignal.net" };
  }
  return { name, kind, destination };
}

export async function createQrAction(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireLogin();
  const input = parseForm(formData);
  if ("error" in input) return input;

  const record = await createQr(input);
  revalidatePath("/qr");
  redirect(`/qr/ver/${record.code}?nuevo=1`);
}

export async function updateQrAction(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireLogin();
  const code = String(formData.get("code") ?? "");
  if (!CODE_PATTERN.test(code)) return { error: "Código inválido." };

  const input = parseForm(formData);
  if ("error" in input) return input;

  const record = await updateQr(code, input);
  if (!record) return { error: "Este QR no existe." };

  revalidatePath("/qr");
  revalidatePath(`/qr/ver/${code}`);
  revalidatePath(`/qr/editar/${code}`);
  redirect(`/qr/ver/${code}?editado=1`);
}

export async function loginAction(_prev: FormState, formData: FormData): Promise<FormState> {
  if (!isAuthConfigured()) {
    return { error: "Falta configurar QR_TEAM_PASSWORD en el servidor." };
  }
  // Small fixed delay to slow down guessing.
  await new Promise((r) => setTimeout(r, 400));
  if (!checkPassword(String(formData.get("password") ?? ""))) {
    return { error: "Clave incorrecta." };
  }
  (await cookies()).set(SESSION_COOKIE, sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/qr",
    maxAge: SESSION_MAX_AGE,
  });
  redirect("/qr");
}

export async function logoutAction() {
  (await cookies()).delete({ name: SESSION_COOKIE, path: "/qr" });
  redirect("/qr/login");
}
