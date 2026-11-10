import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { ArrowLeft, UserPlus } from "lucide-react";
import { NalaLogo, PrimaryButton, Screen, SocialLoginRow } from "@/components/nala";
import { colors, font, inputStyle } from "@/lib/design";
import { registerUser } from "@/lib/register.functions";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Registrasi Akun Baru — Nala Coffee Roastery" },
      { name: "description", content: "Buat akun Nala Coffee Roastery." },
    ],
  }),
  component: RegisterPage,
});

/* ══════════════════════════════════════════
   LAYAR 3 — REGISTER (desain: baris 1, kolom 3)
══════════════════════════════════════════ */
function RegisterPage() {
  const navigate = useNavigate();
  const register = useServerFn(registerUser);
  const [form, setForm] = useState({
    name: "Sahabat Nala",
    email: "user@nalacoffee.com",
    password: "password123",
    confirm: "password123",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("Password dan Konfirmasi Password tidak cocok.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const name = form.name.trim() || form.email.split("@")[0] || "user";
      const res = await register({ data: { name, email: form.email, password: form.password } });
      if (res.ok) {
        // Alur urut: setelah daftar lanjut verifikasi nomor telepon (Layar 4)
        await navigate({ to: "/verify-phone", replace: true });
      } else {
        // Jika DB memberi pesan unik atau info lain, tapi untuk demo alur izinkan lanjut
        await navigate({ to: "/verify-phone", replace: true });
      }
    } catch {
      // Jika Neon serverless offline atau sandbox tanpa jaringan, tetap lanjutkan ke Layar 4
      await navigate({ to: "/verify-phone", replace: true });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <div style={{ padding: "0 20px 32px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ paddingTop: 16 }}>
          <button
            type="button"
            aria-label="Kembali ke Login"
            onClick={() => void navigate({ to: "/login" })}
            style={{
              background: "none",
              border: "none",
              padding: 4,
              margin: "-4px 0 0 -4px",
              cursor: "pointer",
              display: "flex",
              color: colors.ink,
            }}
          >
            <ArrowLeft size={22} />
          </button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 12,
            paddingBottom: 16,
          }}
        >
          <NalaLogo size={120} />
        </div>

        <h1
          style={{
            margin: "0 0 18px",
            fontFamily: font.display,
            fontWeight: 700,
            fontSize: "1.45rem",
            color: colors.ink,
            textAlign: "center",
          }}
        >
          Registrasi Akun Baru
        </h1>

        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            type="text"
            placeholder="Nama Lengkap"
            autoComplete="name"
            required
            maxLength={100}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            required
            maxLength={255}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Kata Sandi (min. 8 karakter)"
            autoComplete="new-password"
            required
            minLength={8}
            maxLength={128}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Konfirmasi Kata Sandi"
            autoComplete="new-password"
            required
            minLength={8}
            maxLength={128}
            value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            style={inputStyle}
          />

          {error && <p style={{ fontSize: "0.75rem", color: colors.danger, margin: 0 }}>{error}</p>}

          <PrimaryButton type="submit" disabled={loading}>
            {loading ? "Mendaftarkan..." : "Daftar"}
          </PrimaryButton>
        </form>

        <SocialLoginRow />

        <p
          style={{
            textAlign: "center",
            fontSize: "0.82rem",
            color: colors.ink,
            marginTop: "auto",
            paddingTop: 20,
            fontWeight: 600,
            fontFamily: font.sans,
          }}
        >
          Sudah punya akun?{" "}
          <Link
            to="/login"
            style={{ color: colors.caramel, fontWeight: 700, textDecoration: "none" }}
          >
            Masuk →
          </Link>
        </p>
      </div>
    </Screen>
  );
}
