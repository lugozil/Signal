import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/qr/auth";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Acceso" };

export default async function LoginPage() {
  if (await isLoggedIn()) redirect("/qr");

  return (
    <div className="mx-auto flex max-w-sm flex-col pt-8 sm:pt-16">
      <span className="kicker">Equipo SIGNAL</span>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">Códigos QR</h1>
      <p className="mt-2 text-signal-mist">Escribe la clave del equipo para entrar.</p>
      <div className="bento-card mt-8 p-6">
        <LoginForm />
      </div>
    </div>
  );
}
