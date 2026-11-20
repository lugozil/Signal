import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireLogin } from "@/lib/qr/auth";
import { getQr } from "@/lib/qr/store";
import { CODE_PATTERN, shortUrl } from "@/lib/qr/code";
import { KIND_LABEL, formatDate } from "@/lib/qr/format";
import { QrSvg } from "@/components/qr/qr-svg";
import { DownloadButtons } from "@/components/qr/download-buttons";
import { CopyButton } from "@/components/qr/copy-button";

export const metadata: Metadata = { title: "Ver QR" };
export const dynamic = "force-dynamic";

export default async function ViewQrPage({
  params,
  searchParams,
}: {
  params: Promise<{ code: string }>;
  searchParams: Promise<{ nuevo?: string; editado?: string }>;
}) {
  await requireLogin();
  const { code } = await params;
  const flags = await searchParams;
  const record = CODE_PATTERN.test(code) ? await getQr(code) : null;
  if (!record) notFound();

  const link = shortUrl(record.code);
  const notice = flags.nuevo
    ? "QR generado. Descárgalo e imprímelo con tranquilidad: el enlace es permanente."
    : flags.editado
      ? "Destino actualizado. El mismo QR ya lleva al nuevo enlace."
      : null;

  return (
    <>
      <Link href="/qr" className="font-mono text-xs uppercase tracking-wide text-signal-mist hover:text-signal-paper">
        ← Todos los QR
      </Link>

      {notice && (
        <p role="status" className="mt-6 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
          {notice}
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,420px)_1fr]">
        <div className="bento-card p-6">
          <QrSvg value={link} className="aspect-square w-full" />
          <div className="mt-6">
            <DownloadButtons value={link} name={record.name} code={record.code} />
          </div>
        </div>

        <div className="min-w-0">
          <span className="kicker">{KIND_LABEL[record.kind]}</span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight break-words sm:text-4xl">{record.name}</h1>

          <dl className="mt-8 space-y-6">
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.18em] text-signal-mist">
                Enlace del QR (fijo, no cambia)
              </dt>
              <dd className="mt-2 flex items-center gap-3 rounded-xl border border-white/10 bg-signal-graphite px-4 py-3">
                <span className="min-w-0 flex-1 truncate font-mono text-sm text-signal-orange">{link}</span>
                <CopyButton value={link} />
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.18em] text-signal-mist">
                Redirige actualmente a
              </dt>
              <dd className="mt-2 flex items-center gap-3 rounded-xl border border-white/10 bg-signal-graphite px-4 py-3">
                <span className="min-w-0 flex-1 truncate text-sm" title={record.destination}>
                  {record.destination}
                </span>
                <CopyButton value={record.destination} />
              </dd>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-signal-mist-dim">Creado</dt>
                <dd className="mt-1">{formatDate(record.createdAt)}</dd>
              </div>
              <div>
                <dt className="text-signal-mist-dim">Última edición</dt>
                <dd className="mt-1">{formatDate(record.updatedAt)}</dd>
              </div>
            </div>
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/qr/editar/${record.code}`}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-signal-orange px-6 text-sm font-semibold text-signal-dark hover:bg-signal-orange-light"
            >
              Editar destino
            </Link>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-semibold hover:border-white/50"
            >
              Probar enlace ↗
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
