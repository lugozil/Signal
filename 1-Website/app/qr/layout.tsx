import type { Metadata } from "next";
import Link from "next/link";
import { JetBrains_Mono, Poppins } from "next/font/google";
import { LogoMark } from "@/components/logo-mark";
import { isLoggedIn } from "@/lib/qr/auth";
import { logoutAction } from "./actions";
import "../globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// The whole panel depends on the session cookie: never prerender it.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { default: "Códigos QR — SIGNAL", template: "%s — SIGNAL QR" },
  description: "Generador de códigos QR dinámicos del equipo SIGNAL.",
  robots: { index: false, follow: false },
};

export default async function QrLayout({ children }: { children: React.ReactNode }) {
  const loggedIn = await isLoggedIn();

  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${poppins.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <header className="sticky top-0 z-40 border-b border-white/5 bg-signal-dark/80 backdrop-blur-md">
          <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
            <Link href="/qr" className="flex items-center gap-2">
              <LogoMark />
              <span className="text-lg font-bold tracking-tight">SIGNAL</span>
              <span className="rounded-full border border-signal-orange/40 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-signal-orange">
                QR
              </span>
            </Link>
            {loggedIn && (
              <div className="flex items-center gap-2 sm:gap-4">
                <Link
                  href="/qr"
                  className="hidden font-mono text-xs uppercase tracking-wide text-signal-mist hover:text-signal-paper sm:inline"
                >
                  Mis QR
                </Link>
                <Link
                  href="/qr/nuevo"
                  className="inline-flex min-h-10 items-center rounded-full bg-signal-orange px-4 text-sm font-semibold text-signal-dark transition-colors hover:bg-signal-orange-light"
                >
                  + Generar QR
                </Link>
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="font-mono text-xs uppercase tracking-wide text-signal-mist-dim hover:text-signal-paper"
                  >
                    Salir
                  </button>
                </form>
              </div>
            )}
          </nav>
        </header>
        <main className="grid-bg min-h-[calc(100vh-4rem)]">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">{children}</div>
        </main>
      </body>
    </html>
  );
}
