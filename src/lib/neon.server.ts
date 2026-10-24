import { neon as neonHttp } from "@neondatabase/serverless";

function getClient() {
  const url = process.env["DATABASE_URL"];
  if (!url) throw new Error("Missing DATABASE_URL");
  return neonHttp(url);
}

type NeonResult = { rows: Record<string, unknown>[]; rowCount: number | null };
type NeonError = Error & { status: number; code?: string; kind: string };

function classifyError(err: unknown): NeonError {
  const e = err as any;
  const code: string = e?.code ?? "";
  const message: string = e?.message ?? "";
  let kind = "rejected";

  if (code === "28P01" || code === "28000" || /password authentication failed/.test(message)) kind = "stale_connection";
  else if (/endpoint.*disabled/i.test(message)) kind = "endpoint_blocked";
  else if (code === "23505") kind = "unique";
  else if (/^2[23]/.test(code)) kind = "input";
  else if (/ECONNREFUSED|ETIMEDOUT|EAI_AGAIN|network|fetch failed/i.test(message)) kind = "unavailable";
  else if (code === "429") kind = "rate_limited";

  return Object.assign(
    new Error(`Neon error [${code}]: ${message}`),
    { status: e?.status ?? 0, code, kind },
  ) as NeonError;
}

// Writes: no automatic retry.
export async function neonExecute(query: string, params: unknown[] = [], _readOnly = false): Promise<NeonResult> {
  try {
    const sql = getClient();
    // @neondatabase/serverless tagged-template returns rows directly
    const rows = (await sql(query, params)) as Record<string, unknown>[];
    return { rows, rowCount: rows.length };
  } catch (err: unknown) {
    return Promise.reject(classifyError(err));
  }
}

export function neonQuery(query: string, params: unknown[] = []) {
  return neonExecute(query, params, true);
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [algorithm, rounds, saltHex, expectedHex] = stored.split("$");
  if (
    algorithm !== "pbkdf2" ||
    rounds !== "100000" ||
    !saltHex ||
    !expectedHex ||
    !/^[a-f0-9]{32}$/.test(saltHex) ||
    !/^[a-f0-9]{64}$/.test(expectedHex)
  )
    return false;
  const salt = Uint8Array.from(saltHex.match(/.{2}/g) ?? [], (x) => parseInt(x, 16));
  const expected = Uint8Array.from(expectedHex.match(/.{2}/g) ?? [], (x) => parseInt(x, 16));
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const actual = new Uint8Array(
    await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: 100_000, hash: "SHA-256" }, key, 256),
  );
  let difference = 0;
  for (let i = 0; i < actual.length; i++) difference |= (actual[i] ?? 0) ^ (expected[i] ?? 0);
  return difference === 0;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: 100_000, hash: "SHA-256" }, key, 256);
  const hex = (b: Uint8Array) => Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
  return `pbkdf2$100000$${hex(salt)}$${hex(new Uint8Array(bits))}`;
}
