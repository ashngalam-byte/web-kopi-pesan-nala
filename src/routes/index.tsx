import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { registerUser } from "@/lib/register.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Daftar Akun" },
      { name: "description", content: "Buat akun baru dalam hitungan detik." },
      { property: "og:title", content: "Daftar Akun" },
      { property: "og:description", content: "Buat akun baru dalam hitungan detik." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Register,
});

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await registerUser({ data: form });
      if (res.ok) setDone(true);
      else setError(res.error);
    } catch (err: any) {
      setError(err?.message ?? "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-background px-4">
      <div className="w-full max-w-md">
        <p className="font-display text-sm uppercase tracking-[0.3em] text-primary">Selamat datang</p>
        <h1 className="mt-2 font-display text-5xl text-foreground">Buat akun.</h1>
        {done ? (
          <div className="mt-10 rounded-lg border border-border bg-card p-6 text-card-foreground">
            <p className="text-lg">Pendaftaran berhasil 🎉</p>
            <p className="mt-1 text-sm text-muted-foreground">Akun {form.email} sudah tersimpan.</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-10 space-y-5">
            {([
              ["name", "Nama lengkap", "text"],
              ["email", "Email", "email"],
              ["password", "Password (min. 8 karakter)", "password"],
            ] as const).map(([key, label, type]) => (
              <label key={key} className="block">
                <span className="text-sm text-muted-foreground">{label}</span>
                <input
                  type={type}
                  required
                  minLength={key === "password" ? 8 : key === "name" ? 2 : undefined}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="mt-1 w-full border-b-2 border-input bg-transparent py-2 text-lg text-foreground outline-none transition-colors focus:border-primary"
                />
              </label>
            ))}
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-primary py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Mendaftarkan..." : "Daftar"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
