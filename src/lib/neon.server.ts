const GATEWAY_URL = "https://connector-gateway.lovable.dev/neon";

type NeonResult = { rows: Record<string, unknown>[]; rowCount: number | null };
type NeonError = Error & { status: number; code?: string; kind: string };

function gatewayHeaders(): Record<string, string> {
  const LOVABLE_API_KEY = process.env["LOVABLE_API_KEY"];
  const NEON_API_KEY = process.env["NEON_API_KEY"];
  if (!LOVABLE_API_KEY || !NEON_API_KEY) throw new Error("Missing LOVABLE_API_KEY or NEON_API_KEY");
  return {
    Authorization: `Bearer ${LOVABLE_API_KEY}`,
    "X-Connection-Api-Key": NEON_API_KEY,
    "Content-Type": "application/json",
  };
}

// Writes: no automatic retry.
export async function neonExecute(query: string, params: unknown[] = [], readOnly = false): Promise<NeonResult> {
  const headers = gatewayHeaders();
  let status = 0;
  let json: any = {};
  let text = "";
  try {
    const res = await fetch(`${GATEWAY_URL}/sql`, {
      method: "POST",
      headers,
      body: JSON.stringify({ query, params }),
    });
    status = res.status;
    text = await res.text();
    try { json = JSON.parse(text); } catch { json = {}; }
    if (res.ok) return json as NeonResult;
  } catch (err: any) {
    json = { message: String(err?.name ?? err) };
  }
  const code = json?.code || json?.type;
  let kind = "rejected";
  if (code === "28P01" || code === "28000" || /^(password authentication failed|Control plane request failed: endpoint cannot be found)/.test(json?.message ?? "")) kind = "stale_connection";
  else if (/^(The endpoint has been disabled|Control plane request failed: endpoint is)/.test(json?.message ?? "")) kind = "endpoint_blocked";
  else if (code === "23505") kind = "unique";
  else if (/^2[23]/.test(code ?? "")) kind = "input";
  else if (status === 0 || status === 502) kind = readOnly ? "unavailable" : "maybe_committed";
  else if (status === 429) kind = "rate_limited";
  else if (status >= 500) kind = "unavailable";
  return Promise.reject(
    Object.assign(new Error(`Neon ${status} ${code ?? ""}: ${json?.message ?? text.slice(0, 300)}`), { status, code, kind }) as NeonError,
  );
}

export function neonQuery(query: string, params: unknown[] = []) {
  return neonExecute(query, params, true);
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [algorithm, rounds, saltHex, expectedHex] = stored.split("$");
  if (algorithm !== "pbkdf2" || rounds !== "100000" || !saltHex || !expectedHex || !/^[a-f0-9]{32}$/.test(saltHex) || !/^[a-f0-9]{64}$/.test(expectedHex)) return false;
  const salt = Uint8Array.from(saltHex.match(/.{2}/g) ?? [], (x) => parseInt(x, 16));
  const expected = Uint8Array.from(expectedHex.match(/.{2}/g) ?? [], (x) => parseInt(x, 16));
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const actual = new Uint8Array(await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: 100_000, hash: "SHA-256" }, key, 256));
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
