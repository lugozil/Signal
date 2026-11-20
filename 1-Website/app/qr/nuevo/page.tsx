import type { Metadata } from "next";
import { requireLogin } from "@/lib/qr/auth";
import { QrForm } from "@/components/qr/qr-form";
import { createQrAction } from "../actions";

export const metadata: Metadata = { title: "Generar QR" };

export default async function NewQrPage() {
  await requireLogin();

  return (
    <div className="mx-auto max-w-2xl">
      <span className="kicker">Generar</span>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Nuevo código QR</h1>
      <p className="mt-2 text-signal-mist">
        Se creará un enlace fijo de SIGNAL para imprimir. Podrás cambiar el destino cuando quieras
        sin reimprimir.
      </p>
      <div className="bento-card mt-8 p-6 sm:p-8">
        <QrForm action={createQrAction} submitLabel="Generar QR" />
      </div>
    </div>
  );
}
