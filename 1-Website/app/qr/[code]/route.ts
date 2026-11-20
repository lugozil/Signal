// Public redirect for printed QR codes: viralsignal.net/qr/{code} → current destination.
// Always a temporary (302) redirect with no caching, so editing the destination
// in the panel takes effect on the next scan. Never use 301 here: browsers and
// phones cache permanent redirects and the printed QR would get "stuck".

import { getQr } from "@/lib/qr/store";
import { CODE_PATTERN } from "@/lib/qr/code";

export const dynamic = "force-dynamic";

const NO_CACHE = "no-store, no-cache, must-revalidate, max-age=0";

export async function GET(_request: Request, ctx: { params: Promise<{ code: string }> }) {
  const code = (await ctx.params).code.toLowerCase();
  const record = CODE_PATTERN.test(code) ? await getQr(code) : null;

  if (!record) {
    return new Response(NOT_FOUND_HTML, {
      status: 404,
      headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": NO_CACHE },
    });
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: record.destination,
      "Cache-Control": NO_CACHE,
      "Netlify-CDN-Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}

const NOT_FOUND_HTML = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>Enlace no disponible — SIGNAL</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0e0e10;color:#fafafb;font-family:system-ui,sans-serif;text-align:center;padding:24px}
h1{font-size:28px;margin:16px 0 8px}p{color:#a0a0a6;margin:0 0 24px}a{color:#0e0e10;background:#ff5a00;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:600}</style></head>
<body><main><svg width="48" height="48" viewBox="0 0 32 32" fill="none" aria-hidden="true"><circle cx="6" cy="26" r="3" fill="#FF5A00"/><path d="M6 18 a10 10 0 0 1 10 10" stroke="#FF5A00" stroke-width="3" stroke-linecap="round"/><path d="M6 10 a18 18 0 0 1 18 18" stroke="#FF5A00" stroke-width="3" stroke-linecap="round"/></svg>
<h1>Este enlace no está disponible</h1><p>El código QR que escaneaste no existe o el enlace está incompleto.</p><a href="https://viralsignal.net">Ir a SIGNAL</a></main></body></html>`;
