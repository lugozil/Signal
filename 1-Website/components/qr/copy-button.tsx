"use client";

import { useState } from "react";

export function CopyButton({ value, label = "Copiar" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be blocked (http, permissions); the value stays visible to copy by hand.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="shrink-0 rounded-full border border-white/15 px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-wide text-signal-mist transition-colors hover:border-signal-orange hover:text-signal-paper"
    >
      {copied ? "¡Copiado!" : label}
    </button>
  );
}
