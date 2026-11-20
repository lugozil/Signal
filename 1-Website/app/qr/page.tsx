import Link from "next/link";
import { requireLogin } from "@/lib/qr/auth";
import { listQrs } from "@/lib/qr/store";
import { shortUrl } from "@/lib/qr/code";
import { KIND_LABEL, formatDate } from "@/lib/qr/format";
import { QrSvg } from "@/components/qr/qr-svg";

export const dynamic = "force-dynamic";

export default async function QrListPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  await requireLogin();
  const q = ((await searchParams).q ?? "").trim();
  const all = await listQrs();
  const needle = q.toLowerCase();
  const items = needle
    ? all.filter((r) =>
        [r.name, r.code, r.destination].some((v) => v.toLowerCase().includes(needle)),
      )
    : all;

  return (
    <>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="kicker">Códigos QR</span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Todos los QR</h1>
          <p className="mt-2 max-w-xl text-signal-mist">
            El QR impreso nunca cambia. Si necesitas otro destino, edítalo aquí y la tarjeta
            seguirá funcionando.
          </p>
        </div>
        <form action="/qr" className="w-full sm:w-72">
          <label htmlFor="q" className="sr-only">
            Buscar
          </label>
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={q}
            placeholder="Buscar por nombre o enlace…"
            className="w-full rounded-full border border-white/10 bg-signal-graphite px-5 py-3 text-sm outline-none placeholder:text-signal-mist-dim focus:border-signal-orange"
          />
        </form>
      </div>

      <p className="mt-8 font-mono text-xs uppercase tracking-wide text-signal-mist-dim">
        {items.length} {items.length === 1 ? "código" : "códigos"}
        {q && ` para “${q}”`}
      </p>

      {items.length === 0 ? (
        <div className="bento-card mt-4 flex flex-col items-center px-6 py-16 text-center">
          <p className="text-lg font-semibold">
            {q ? "No hay resultados." : "Aún no hay códigos QR."}
          </p>
          <p className="mt-1 text-signal-mist">
            {q ? "Prueba con otra búsqueda." : "Crea el primero en segundos."}
          </p>
          {!q && (
            <Link
              href="/qr/nuevo"
              className="mt-6 inline-flex min-h-11 items-center rounded-full bg-signal-orange px-6 text-sm font-semibold text-signal-dark hover:bg-signal-orange-light"
            >
              + Generar QR
            </Link>
          )}
        </div>
      ) : (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((r) => (
            <li key={r.code} className="bento-card flex flex-col p-5">
              <div className="flex gap-4">
                <Link href={`/qr/ver/${r.code}`} className="shrink-0" aria-label={`Ver ${r.name}`}>
                  <QrSvg value={shortUrl(r.code)} className="h-24 w-24" />
                </Link>
                <div className="min-w-0">
                  <span className="rounded-full bg-white/5 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-signal-mist">
                    {KIND_LABEL[r.kind]}
                  </span>
                  <h2 className="mt-2 truncate font-semibold" title={r.name}>
                    {r.name}
                  </h2>
                  <p className="truncate font-mono text-xs text-signal-orange">/qr/{r.code}</p>
                  <p className="mt-1 truncate text-xs text-signal-mist" title={r.destination}>
                    → {r.destination}
                  </p>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between gap-2 border-t border-white/5 pt-4">
                <span className="text-xs text-signal-mist-dim">{formatDate(r.createdAt)}</span>
                <div className="flex gap-2">
                  <Link
                    href={`/qr/editar/${r.code}`}
                    className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium hover:border-white/40"
                  >
                    Editar
                  </Link>
                  <Link
                    href={`/qr/ver/${r.code}`}
                    className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium hover:bg-white/20"
                  >
                    Ver
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
