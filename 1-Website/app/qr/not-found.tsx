import Link from "next/link";

export default function QrNotFound() {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <span className="kicker">404</span>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">Ese QR no existe</h1>
      <p className="mt-2 text-signal-mist">Revisa el código o vuelve al listado.</p>
      <Link
        href="/qr"
        className="mt-8 inline-flex min-h-11 items-center rounded-full bg-signal-orange px-6 text-sm font-semibold text-signal-dark hover:bg-signal-orange-light"
      >
        Ver todos los QR
      </Link>
    </div>
  );
}
