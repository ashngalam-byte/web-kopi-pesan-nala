import { createServerFn } from "@tanstack/react-start";

export const loginUser = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string; password: string }) => {
    const email = String(data?.email ?? "").trim().toLowerCase();
    const password = String(data?.password ?? "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255 || !password || password.length > 128) throw new Error("Email atau password tidak valid.");
    return { email, password };
  })
  .handler(async ({ data }) => {
    const { neonQuery, verifyPassword } = await import("./neon.server");
    const { userSession } = await import("./auth.server");
    try {
      const result = await neonQuery("select id, password_hash from public.users where email = $1 limit 1", [data.email]);
      const row = result.rows[0];
      const fallback = `pbkdf2$100000$${"0".repeat(32)}$${"0".repeat(64)}`;
      const valid = await verifyPassword(data.password, row ? String(row["password_hash"]) : fallback);
      if (!row || !valid) return { ok: false as const, error: "Email atau password salah." };
      const session = await userSession();
      await session.clear();
      await session.update({ userId: String(row["id"]) });
      return { ok: true as const };
    } catch (error) {
      console.error(error);
      const kind = (error as { kind?: string })?.kind;
      const message = kind === "stale_connection" ? "Koneksi database perlu diperbarui oleh pemilik aplikasi." : kind === "endpoint_blocked" ? "Database belum tersedia. Pemilik aplikasi perlu memeriksa Neon." : "Login belum dapat diproses. Coba lagi sebentar.";
      return { ok: false as const, error: message };
    }
  });

export const getCurrentUser = createServerFn({ method: "GET" }).handler(async () => {
  const { sessionUser } = await import("./auth.server");
  return sessionUser();
});

export const logoutUser = createServerFn({ method: "POST" }).handler(async () => {
  const { userSession } = await import("./auth.server");
  const session = await userSession();
  await session.clear();
  return { ok: true };
});