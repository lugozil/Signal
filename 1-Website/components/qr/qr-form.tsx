"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import type { FormState } from "@/app/qr/actions";
import type { QrKind, QrRecord } from "@/lib/qr/code";

type Action = (prev: FormState, formData: FormData) => Promise<FormState>;

const KINDS: { value: QrKind; label: string; hint: string }[] = [
  { value: "web", label: "Página web", hint: "Sitio, landing, Instagram, Google Maps…" },
  { value: "whatsapp", label: "WhatsApp", hint: "Abre un chat con un número" },
  { value: "otro", label: "Otro enlace", hint: "Teléfono (tel:), correo (mailto:), PDF…" },
];

const input =
  "w-full rounded-xl border border-white/10 bg-signal-graphite px-4 py-3 text-base text-signal-paper placeholder:text-signal-mist-dim outline-none transition-colors focus:border-signal-orange";
const labelCls = "mb-2 block text-sm font-medium text-signal-paper";

export function QrForm({
  action,
  record,
  submitLabel,
}: {
  action: Action;
  record?: QrRecord;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const [kind, setKind] = useState<QrKind>(record?.kind ?? "web");

  return (
    <form action={formAction} className="space-y-7">
      {record && <input type="hidden" name="code" value={record.code} />}
      <input type="hidden" name="kind" value={kind} />

      <div>
        <label htmlFor="name" className={labelCls}>
          Nombre del QR
        </label>
        <input
          id="name"
          name="name"
          required
          maxLength={120}
          defaultValue={record?.name}
          placeholder="Ej. Tarjeta Oscar — WhatsApp ventas"
          className={input}
        />
        <p className="mt-2 text-xs text-signal-mist-dim">Solo para identificarlo en el panel.</p>
      </div>

      <fieldset>
        <legend className={labelCls}>¿A dónde debe llevar?</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {KINDS.map((k) => {
            const active = kind === k.value;
            return (
              <button
                key={k.value}
                type="button"
                onClick={() => setKind(k.value)}
                aria-pressed={active}
                className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                  active
                    ? "border-signal-orange bg-signal-orange/10"
                    : "border-white/10 bg-signal-graphite hover:border-white/25"
                }`}
              >
                <span className="block text-sm font-semibold">{k.label}</span>
                <span className="mt-0.5 block text-xs text-signal-mist">{k.hint}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {kind === "whatsapp" ? (
        <div className="grid gap-5">
          <div>
            <label htmlFor="phone" className={labelCls}>
              Número de WhatsApp (con código de país)
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              inputMode="tel"
              defaultValue={record?.whatsapp?.phone}
              placeholder="+1 787 528 8989"
              className={input}
            />
          </div>
          <div>
            <label htmlFor="message" className={labelCls}>
              Mensaje predeterminado <span className="text-signal-mist-dim">(opcional)</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              maxLength={1000}
              defaultValue={record?.whatsapp?.message}
              placeholder="Hola, vi su tarjeta y quiero más información."
              className={input}
            />
          </div>
        </div>
      ) : (
        <div>
          <label htmlFor="destination" className={labelCls}>
            Enlace de destino
          </label>
          <input
            id="destination"
            name="destination"
            required
            inputMode="url"
            autoComplete="url"
            defaultValue={record?.kind !== "whatsapp" ? record?.destination : undefined}
            placeholder={kind === "otro" ? "tel:+17875288989 o mailto:hola@…" : "https://viralsignal.net"}
            className={input}
          />
        </div>
      )}

      {state.error && (
        <p role="alert" className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {state.error}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
        <Link
          href={record ? `/qr/ver/${record.code}` : "/qr"}
          className="inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm text-signal-mist hover:text-signal-paper"
        >
          Cancelar
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-signal-orange px-7 text-sm font-semibold text-signal-dark shadow-glow transition-colors hover:bg-signal-orange-light disabled:opacity-60"
        >
          {pending ? "Guardando…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
