import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireLogin } from "@/lib/qr/auth";
import { getQr } from "@/lib/qr/store";
import { CODE_PATTERN, shortUrl } from "@/lib/qr/code";
import { formatDate } from "@/lib/qr/format";
import { QrForm } from "@/components/qr/qr-form";
import { QrSvg } from "@/components/qr/qr-svg";
import { updateQrAction } from "../../actions";

export const metadata: Metadata = { title: "Editar QR" };
export const dynamic = "force-dynamic";

export default async function EditQrPage({ params }: { params: Promise<{ code: string }> }) {
  await requireLogin();
  const { code } = await params;
  const record = CODE_PATTERN.test(code) ? await getQr(code) : null;
  if (!record) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <span className="kicker">Editar</span>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{record.name}</h1>

      <div className="mt-6 flex items-center gap-4 rounded-2xl border border-signal-orange/30 bg-signal-orange/5 p-4">
        <QrSvg value={shortUrl(record.code)} className="h-16 w-16 shrink-0" />
        <p className="text-sm text-signal-mist">
          <strong className="text-signal-paper">El código QR no cambia.</strong> Las tarjetas
          impresas siguen apuntando a{" "}
          <span className="font-mono text-signal-orange">{shortUrl(record.code)}</span>; solo
          cambias a dónde las envía.
        </p>
      </div>

      <div className="bento-card mt-6 p-6 sm:p-8">
        <QrForm action={updateQrAction} record={record} submitLabel="Guardar cambios" />
      </div>

      {record.history.length > 0 && (
        <section className="mt-10">
          <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-signal-mist">
            Destinos anteriores
          </h2>
          <ul className="mt-3 divide-y divide-white/5 rounded-2xl border border-white/10">
            {record.history.map((h, i) => (
              <li key={i} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="truncate text-sm text-signal-mist" title={h.destination}>
                  {h.destination}
                </span>
                <span className="shrink-0 text-xs text-signal-mist-dim">
                  hasta {formatDate(h.changedAt)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
