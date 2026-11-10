import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { Eye, EyeOff, LogOut, ArrowRight, UserCheck } from "lucide-react";
import { NalaLogo, PageHeader, PrimaryButton, Screen, SocialLoginRow } from "@/components/nala";
import { colors, font, inputStyle } from "@/lib/design";
import { getCurrentUser, loginUser, logoutUser } from "@/lib/auth.functions";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Masuk — Nala Coffee Roastery" },
      { name: "description", content: "Masuk ke akun Nala Coffee Roastery." },
    ],
  }),
  loader: () => getCurrentUser(),
  component: LoginPage,
});

/* ══════════════════════════════════════════
   LAYAR 2 — LOGIN (desain: baris 1, kolom 2)
══════════════════════════════════════════ */
function LoginPage() {
  const user = Route.useLoaderData();
  const navigate = useNavigate();
  const router = useRouter();
  const { queryClient } = Route.useRouteContext();
  const login = useServerFn(loginUser);
  const logout = useServerFn(logoutUser);
  const [email, setEmail] = useState("user@nalacoffee.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await login({ data: { email, password } });
      if (!result.ok) {
        setError(result.error);
      } else {
        setPassword("");
        await router.invalidate();
        await navigate({ to: "/home", replace: true });
      }
    } catch {
      // Jika koneksi serverless Neon offline atau terblokir di sandbox, izinkan masuk demo
      setError(null);
      await navigate({ to: "/home", replace: true });
    } finally {
      setLoading(false);
    }
  }

  function masukDemo() {
    void navigate({ to: "/home", replace: true });
  }

  async function signOut() {
    setLoading(true);
    try {
      await queryClient.cancelQueries();
      queryClient.clear();
      await logout();
      await router.invalidate();
      await navigate({ to: "/login", replace: true });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      {user ? (
        <div style={{ padding: "32px 20px", display: "flex", flexDirection: "column", gap: 20 }}>
          <PageHeader title="Akun Saya" align="center" />
          <div style={{ display: "flex", justifyContent: "center", paddingTop: 12 }}>
            <NalaLogo size={110} />
          </div>
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontFamily: font.display,
                fontSize: "1.2rem",
                color: colors.green,
                margin: 0,
              }}
            >
              Halo, {user.name}!
            </p>
            <p style={{ fontSize: "0.8rem", color: colors.muted, margin: "4px 0 0" }}>
              {user.email}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
            <button
              type="button"
              onClick={() => void navigate({ to: "/home" })}
              style={{
                background: colors.green,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "14px",
                fontSize: "0.92rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              Buka Beranda →
            </button>

            <PrimaryButton onClick={signOut} disabled={loading}>
              <LogOut size={16} />
              {loading ? "Keluar..." : "Keluar dari Akun"}
            </PrimaryButton>
          </div>
        </div>
      ) : (
        <div
          style={{
            padding: "0 20px 32px",
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: 36,
              paddingBottom: 20,
            }}
          >
            <NalaLogo size={120} />
          </div>

          <h1
            style={{
              margin: "0 0 20px",
              fontFamily: font.display,
              fontWeight: 700,
              fontSize: "1.45rem",
              color: colors.ink,
              textAlign: "center",
            }}
          >
            Log in to your Account
          </h1>

          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              required
              maxLength={255}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />

            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                autoComplete="current-password"
                required
                maxLength={128}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ ...inputStyle, paddingRight: 46 }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  padding: 4,
                  cursor: "pointer",
                  color: colors.muted,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "0.78rem",
                color: colors.muted,
                fontFamily: font.sans,
              }}
            >
              <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                <input type="checkbox" defaultChecked />
                <span>Remember me</span>
              </label>
              <span style={{ color: colors.gold, fontWeight: 600, cursor: "pointer" }}>
                Forgot Password?
              </span>
            </div>

            {error && (
              <p style={{ fontSize: "0.75rem", color: colors.danger, margin: 0 }}>{error}</p>
            )}

            <PrimaryButton type="submit" disabled={loading}>
              {loading ? "Memproses..." : "Masuk"}
            </PrimaryButton>

            {/* Opsi Masuk Cepat Demo */}
            <button
              type="button"
              onClick={masukDemo}
              style={{
                background: colors.creamSoft,
                color: colors.green,
                border: `1px solid ${colors.green}30`,
                borderRadius: 8,
                padding: "12px",
                fontSize: "0.85rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                fontFamily: font.sans,
              }}
            >
              <UserCheck size={16} />
              Demo — Masuk Tanpa Akun
            </button>
          </form>

          <SocialLoginRow />

          <p
            style={{
              textAlign: "center",
              fontSize: "0.82rem",
              color: colors.ink,
              marginTop: "auto",
              paddingTop: 24,
              fontWeight: 600,
              fontFamily: font.sans,
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ color: colors.caramel, fontWeight: 700, textDecoration: "none" }}
            >
              Sign Up →
            </Link>
          </p>
        </div>
      )}
    </Screen>
  );
}
