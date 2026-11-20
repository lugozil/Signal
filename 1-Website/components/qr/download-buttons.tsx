"use client";

import QRCode from "qrcode";
import { useState } from "react";
import { QR_OPTIONS } from "./qr-options";

function slug(name: string) {
  return (
    name
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40) || "qr"
  );
}

function trigger(href: string, filename: string) {
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function DownloadButtons({ value, name, code }: { value: string; name: string; code: string }) {
  const [busy, setBusy] = useState<"png" | "svg" | null>(null);
  const base = `signal-qr-${slug(name)}-${code}`;

  async function downloadPng() {
    setBusy("png");
    try {
      const url = await QRCode.toDataURL(value, { ...QR_OPTIONS, width: 2048 });
      trigger(url, `${base}.png`);
    } finally {
      setBusy(null);
    }
  }

  async function downloadSvg() {
    setBusy("svg");
    try {
      const svg = await QRCode.toString(value, { ...QR_OPTIONS, type: "svg" });
      const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
      trigger(url, `${base}.svg`);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } finally {
      setBusy(null);
    }
  }

  const btn =
    "inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors disabled:opacity-60";

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={downloadPng}
        disabled={busy !== null}
        className={`${btn} bg-signal-orange text-signal-dark hover:bg-signal-orange-light`}
      >
        {busy === "png" ? "Generando…" : "Descargar PNG"}
      </button>
      <button
        type="button"
        onClick={downloadSvg}
        disabled={busy !== null}
        className={`${btn} border border-white/20 text-signal-paper hover:border-white/50`}
      >
        {busy === "svg" ? "Generando…" : "Descargar SVG (imprenta)"}
      </button>
    </div>
  );
}
