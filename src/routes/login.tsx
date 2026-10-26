import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { Eye, EyeOff, ArrowLeft, LogOut } from "lucide-react";
import { getCurrentUser, loginUser, logoutUser } from "@/lib/auth.functions";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Masuk — Nala Coffee Roastory" },
      { name: "description", content: "Masuk ke akun Nala Coffee Roastory." },
    ],
  }),
  loader: () => getCurrentUser(),
  component: Login,
});

const GREEN = "#083628";
const GOLD  = "#B29973";

function NalaLogo() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
      <img src="/nala-logo.png" alt="Nala Coffee Roastory"
        style={{ width: 70, objectFit: "contain" }} />
    </div>
  );
}

/* Social icons SVG asli */
function GoogleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24">
      <path fill="#1877F3" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#000">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

function Login() {
  const user = Route.useLoaderData();
  const navigate = useNavigate();
  const router = useRouter();
  const { queryClient } = Route.useRouteContext();
  const login = useServerFn(loginUser);
  const logout = useServerFn(logoutUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await login({ data: { email, password } });
      if (!result.ok) setError(result.error);
      else {
        setPassword("");
        await router.invalidate();
        await navigate({ to: "/menu", replace: true });
      }
    } catch {
      setError("Login belum dapat diproses. Coba lagi sebentar.");
    } finally {
      setLoading(false);
    }
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

  const inputStyle: React.CSSProperties = {
    width: "100%", border: "none", background: "transparent",
    outline: "none", fontSize: "0.92rem", color: "#1a1a1a",
    fontFamily: "'Montserrat', sans-serif",
  };

  const boxStyle: React.CSSProperties = {
    background: "#f7f7f7", borderRadius: 10,
    padding: "15px 16px", border: "1px solid #e8e8e8",
    display: "flex", alignItems: "center",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#083628", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", fontFamily: "'Montserrat', sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 320, background: "#fff", borderRadius: 28, padding: "24px 20px 20px", boxShadow: "0 16px 48px rgba(0,0,0,0.25)" }}>

        {/* Back arrow */}
        <div style={{ marginBottom: 16 }}>
          <Link to="/" style={{ color: "#1a1a1a", display: "inline-flex", alignItems: "center", textDecoration: "none" }}>
            <ArrowLeft size={22} />
          </Link>
        </div>

        {/* Logo foto asli */}
        <NalaLogo />

        {user ? (
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "1rem", color: GREEN, fontWeight: 700, marginBottom: 4 }}>Halo, {user.name}!</p>
            <p style={{ fontSize: "0.8rem", color: "#888", marginBottom: 24 }}>{user.email}</p>
            <button onClick={signOut} disabled={loading}
              style={{ width: "100%", background: GREEN, color: "#fff", border: "none", borderRadius: 12, padding: "16px", fontSize: "0.95rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <LogOut size={16} />{loading ? "Keluar..." : "Keluar"}
            </button>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1a1a1a", marginBottom: 12, textAlign: "left" }}>
              Login to your Account
            </h2>

            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={boxStyle}>
                <input type="email" placeholder="Email" autoComplete="email" required maxLength={255}
                  value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
              </div>

              <div style={boxStyle}>
                <input type={showPassword ? "text" : "password"} placeholder="Password"
                  autoComplete="current-password" required maxLength={128}
                  value={password} onChange={e => setPassword(e.target.value)}
                  style={{ ...inputStyle, flex: 1 }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa", padding: 0, display: "flex", marginLeft: 8 }}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {error && <p style={{ fontSize: "0.78rem", color: "#e53e3e", margin: 0 }}>{error}</p>}

              <button type="submit" disabled={loading}
                style={{ width: "100%", background: "#083628", color: "#ffffff", border: "none", borderRadius: 8, padding: "12px", fontSize: "0.85rem", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, fontFamily: "'Montserrat', sans-serif", marginTop: 4, WebkitAppearance: "none" as const }}>
                {loading ? "Memproses..." : "Sign in"}
              </button>
            </form>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "14px 0" }}>
              <div style={{ flex: 1, height: 1, background: "#ebebeb" }} />
              <span style={{ fontSize: "0.72rem", color: "#aaa" }}>-Or sign in with-</span>
              <div style={{ flex: 1, height: 1, background: "#ebebeb" }} />
            </div>

            {/* Social buttons */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {[
                { label: "Google", icon: <GoogleIcon /> },
                { label: "Facebook", icon: <FacebookIcon /> },
                { label: "Apple", icon: <AppleIcon /> },
              ].map(s => (
                <button key={s.label} type="button" aria-label={s.label}
                  style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12, padding: "14px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  {s.icon}
                </button>
              ))}
            </div>

            <p style={{ textAlign: "center", fontSize: "0.78rem", color: "#888", marginTop: 14 }}>
              Don't have an account?{" "}
              <Link to="/" style={{ color: "#083628", fontWeight: 700, textDecoration: "none" }}>Sign up</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
