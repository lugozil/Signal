// Persistence for QR records.
// Production (Netlify): Netlify Blobs, one JSON blob per code, strong consistency
// so an edited destination is live on the very next scan.
// Local `next dev` (no Netlify context): a JSON file in .data/qr.json.

import { promises as fs } from "node:fs";
import path from "node:path";
import { getStore, type Store } from "@netlify/blobs";
import {
  RESERVED_CODES,
  generateCode,
  type QrKind,
  type QrRecord,
} from "./code";

const STORE_NAME = "qr-codes";
const LOCAL_FILE = path.join(process.cwd(), ".data", "qr.json");

interface Backend {
  get(code: string): Promise<QrRecord | null>;
  list(): Promise<QrRecord[]>;
  /** Returns false when the code already exists. */
  insert(record: QrRecord): Promise<boolean>;
  put(record: QrRecord): Promise<void>;
}

/**
 * Strong consistency needs an "uncached edge URL" that not every Netlify
 * runtime provides. If a strong read fails for that reason, fall back to the
 * default (eventual) reads; writes are unaffected.
 */
function withFallback(primary: Backend, fallback: Backend): Backend {
  const isConsistencyError = (e: unknown) =>
    e instanceof Error && /consistency/i.test(`${e.name} ${e.message}`);
  const retry =
    <A extends unknown[], R>(fn: (b: Backend) => (...a: A) => Promise<R>) =>
    async (...args: A) => {
      try {
        return await fn(primary)(...args);
      } catch (e) {
        if (!isConsistencyError(e)) throw e;
        return fn(fallback)(...args);
      }
    };
  return {
    get: retry((b) => b.get),
    list: retry((b) => b.list),
    insert: retry((b) => b.insert),
    put: retry((b) => b.put),
  };
}

function blobsBackend(store: Store): Backend {
  return {
    async get(code) {
      return ((await store.get(code, { type: "json" })) as QrRecord | null) ?? null;
    },
    async list() {
      const { blobs } = await store.list();
      const records = await Promise.all(
        blobs.map((b) => store.get(b.key, { type: "json" }) as Promise<QrRecord | null>),
      );
      return records.filter((r): r is QrRecord => r !== null);
    },
    async insert(record) {
      const res = await store.setJSON(record.code, record, { onlyIfNew: true });
      return res.modified;
    },
    async put(record) {
      await store.setJSON(record.code, record);
    },
  };
}

async function readLocal(): Promise<Record<string, QrRecord>> {
  try {
    return JSON.parse(await fs.readFile(LOCAL_FILE, "utf8"));
  } catch {
    return {};
  }
}

async function writeLocal(data: Record<string, QrRecord>) {
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await fs.writeFile(LOCAL_FILE, JSON.stringify(data, null, 2));
}

const localBackend: Backend = {
  async get(code) {
    return (await readLocal())[code] ?? null;
  },
  async list() {
    return Object.values(await readLocal());
  },
  async insert(record) {
    const data = await readLocal();
    if (data[record.code]) return false;
    data[record.code] = record;
    await writeLocal(data);
    return true;
  },
  async put(record) {
    const data = await readLocal();
    data[record.code] = record;
    await writeLocal(data);
  },
};

// Next.js patches global fetch (caching/dedup). Blobs must talk to the API
// with the original fetch, as Netlify's own Next.js runtime does.
function rawFetch(): typeof fetch {
  const f = globalThis.fetch as typeof fetch & { _nextOriginalFetch?: typeof fetch };
  return f._nextOriginalFetch ?? f;
}

function backend(): Backend {
  if (process.env.QR_LOCAL_STORE === "1") return localBackend;
  try {
    const fetchImpl = rawFetch();
    const strong = getStore({ name: STORE_NAME, consistency: "strong", fetch: fetchImpl });
    const eventual = getStore({ name: STORE_NAME, fetch: fetchImpl });
    return withFallback(blobsBackend(strong), blobsBackend(eventual));
  } catch (error) {
    // Outside Netlify (local dev) there is no Blobs context.
    if (process.env.NODE_ENV !== "production") return localBackend;
    throw error;
  }
}

export async function getQr(code: string) {
  return backend().get(code);
}

export async function listQrs() {
  const records = await backend().list();
  return records.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createQr(input: {
  name: string;
  destination: string;
  kind: QrKind;
  whatsapp?: QrRecord["whatsapp"];
}) {
  const db = backend();
  const now = new Date().toISOString();
  for (let attempt = 0; attempt < 8; attempt++) {
    const code = generateCode();
    if (RESERVED_CODES.has(code)) continue;
    const record: QrRecord = {
      code,
      ...input,
      createdAt: now,
      updatedAt: now,
      history: [],
    };
    if (await db.insert(record)) return record;
  }
  throw new Error("No se pudo generar un código único. Inténtalo de nuevo.");
}

export async function updateQr(
  code: string,
  input: {
    name: string;
    destination: string;
    kind: QrKind;
    whatsapp?: QrRecord["whatsapp"];
  },
) {
  const db = backend();
  const current = await db.get(code);
  if (!current) return null;
  const now = new Date().toISOString();
  const history =
    current.destination !== input.destination
      ? [{ destination: current.destination, changedAt: now }, ...current.history].slice(0, 50)
      : current.history;
  // `code` and `createdAt` are intentionally preserved: the printed QR never changes.
  const next: QrRecord = {
    ...current,
    name: input.name,
    destination: input.destination,
    kind: input.kind,
    whatsapp: input.whatsapp,
    updatedAt: now,
    history,
  };
  await db.put(next);
  return next;
}
