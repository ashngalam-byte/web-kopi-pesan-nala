import { createServerFn } from "@tanstack/react-start";

type Input = { name: string; email: string; password: string };

export const registerUser = createServerFn({ method: "POST" })
  .inputValidator((data: Input) => {
    const name = String(data?.name ?? "").trim();
    const email = String(data?.email ?? "").trim().toLowerCase();
    const password = String(data?.password ?? "");
    if (name.length < 2 || name.length > 100) throw new Error("Nama minimal 2 karakter.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) throw new Error("Email tidak valid.");
    if (password.length < 8 || password.length > 128) throw new Error("Password minimal 8 karakter.");
    return { name, email, password };
  })
  .handler(async ({ data }) => {
    const { neonExecute, hashPassword } = await import("./neon.server");
    const hash = await hashPassword(data.password);
    try {
      const r = await neonExecute(
        "insert into public.users (name, email, password_hash) values ($1, $2, $3) returning id",
        [data.name, data.email, hash],
      );
      return { ok: true as const, id: String(r.rows[0]?.["id"] ?? "") };
    } catch (err: any) {
      console.error(err);
      if (err?.kind === "unique") return { ok: false as const, error: "Email sudah terdaftar." };
      if (err?.kind === "maybe_committed") return { ok: false as const, error: "Pendaftaran mungkin sudah tersimpan. Coba masuk sebelum mendaftar ulang." };
      return { ok: false as const, error: "Database sedang tidak tersedia. Coba lagi sebentar." };
    }
  });
