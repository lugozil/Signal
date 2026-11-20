// TEMPORARY diagnostics for Netlify Blobs in production. Remove after use.
import { getStore } from "@netlify/blobs";
export const dynamic = "force-dynamic";

const withTimeout = async <T,>(label: string, p: () => Promise<T>, ms = 6000) => {
  const t0 = Date.now();
  try {
    const v = await Promise.race([
      p(),
      new Promise<never>((_, rej) => setTimeout(() => rej(new Error("TIMEOUT")), ms)),
    ]);
    return { label, ok: true, ms: Date.now() - t0, value: JSON.stringify(v)?.slice(0, 120) };
  } catch (e) {
    const err = e as Error;
    return { label, ok: false, ms: Date.now() - t0, error: `${err.name}: ${err.message}`.slice(0, 300) };
  }
};

export async function GET() {
  const g = globalThis as { netlifyBlobsContext?: string; fetch: typeof fetch & { _nextOriginalFetch?: typeof fetch } };
  const raw = g.netlifyBlobsContext ?? process.env.NETLIFY_BLOBS_CONTEXT;
  let keys: string[] = [];
  try { keys = Object.keys(JSON.parse(Buffer.from(raw ?? "", "base64").toString() || "{}")); } catch {}
  const orig = g.fetch._nextOriginalFetch;
  const results = [];
  results.push({ contextFrom: g.netlifyBlobsContext ? "global" : process.env.NETLIFY_BLOBS_CONTEXT ? "env" : "none", keys, hasOriginalFetch: !!orig, node: process.version });
  const st = getStore({ name: "qr-codes", fetch: orig ?? fetch });
  results.push(await withTimeout("getMetadata missing", () => st.getMetadata("zzzzzz")));
  results.push(await withTimeout("getWithMetadata missing", () => st.getWithMetadata("zzzzzz")));
  results.push(await withTimeout("get missing json", () => st.get("zzzzzz", { type: "json" })));
  results.push(await withTimeout("list prefix missing", () => st.list({ prefix: "zzzzzz" }).then((r) => r.blobs.map((b) => b.key))));
  results.push(await withTimeout("setJSON __diag", () => st.setJSON("__diag", { ok: 1 })));
  results.push(await withTimeout("get __diag", () => st.get("__diag", { type: "json" })));
  results.push(await withTimeout("strong get __diag", () => getStore({ name: "qr-codes", consistency: "strong", fetch: orig ?? fetch }).get("__diag", { type: "json" })));
  results.push(await withTimeout("delete __diag", () => st.delete("__diag")));
  results.push(await withTimeout("list after", () => st.list().then((r) => r.blobs.map((b) => b.key))));
  return Response.json(results, { headers: { "Cache-Control": "no-store" } });
}
