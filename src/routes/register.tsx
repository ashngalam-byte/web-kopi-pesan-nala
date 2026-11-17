import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { registerUser } from "@/lib/register.functions";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Daftar — TemuBal" }] }),
  component: Register,
});

const PURPLE = "#6C63FF";
const BG = "#F0F3FA";

function AppLogo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 20 }}>
      <div style={{ width: 56, height: 56, background: PURPLE, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
        <span style={{ fontSize: "1.5rem" }}>🔍</span>
      </div>
      <p style={{ margin: 0, fontWeight: 800, fontSize: "1rem", color: "#1a1a2e" }}>TemuBal</p>
      <p style={{ margin: "2px 0 0", fontSize: "0.65rem", color: "#888" }}>Aplikasi Barang Hilang & Temuan</p>
    </div>
  );
}

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirm) { setError("Password tidak cocok."); return; }
    setError(null);
    setLoading(true);
    try {
      const res = await registerUser({ data: { name: form.name || form.email.split("@")[0] || "user", email: form.email, password: form.password } });
      if (res.ok) {
        setDone(true);
        setTimeout(() => navigate({ to: "/login", replace: true }), 1500);
      } else setError(res.error);
    } catch (err: any) {
      setError(err?.message ?? "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }

  const box: React.CSSProperties = { background: "#f5f5f5", borderRadius: 10, padding: "12px 14px", border: "1px solid #e8e8e8", display: "flex", alignItems: "center", marginBottom: 9 };
  const inp: React.CSSProperties = { flex: 1, border: "none", background: "transparent", outline: "none", fontSize: "0.85rem", color: "#333", fontFamily: "'Inter', sans-serif" };

  return (
    <div style={{ minHeight: "100vh", background: BG, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 340, background: "#fff", borderRadius: 28, padding: "24px 22px 22px", boxShadow: "0 16px 48px rgba(0,0,0,0.12)" }}>

        <button onClick={() => navigate({ to: "/login" })} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", color: "#333", marginBottom: 10, padding: 0 }}>
          <ArrowLeft size={20} />
        </button>

        <AppLogo />

        {done ? (
          <p style={{ textAlign: "center", color: PURPLE, fontWeight: 700, padding: "16px 0" }}>Akun berhasil dibuat! 🎉</p>
        ) : (
          <>
            <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1a1a2e", margin: "0 0 14px" }}>Login to your Account</h2>

            <form onSubmit={onSubmit}>
              <div style={box}>
                <input type="email" placeholder="Email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inp} />
              </div>
              <div style={box}>
                <input type={showPass ? "text" : "password"} placeholder="Password" required minLength={8} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} style={inp} />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa", padding: 0, display: "flex" }}>
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              <div style={box}>
                <input type={showConf ? "text" : "password"} placeholder="Confirm Password" required minLength={8} value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} style={inp} />
                <button type="button" onClick={() => setShowConf(!showConf)} style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa", padding: 0, display: "flex" }}>
                  {showConf ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {error && <p style={{ fontSize: "0.73rem", color: "#e53e3e", marginBottom: 8 }}>{error}</p>}
              <button type="submit" disabled={loading} style={{ width: "100%", background: "#083628", color: "#fff", border: "none", borderRadius: 10, padding: "13px", fontSize: "0.88rem", fontWeight: 700, cursor: "pointer", opacity: loading ? 0.7 : 1, fontFamily: "'Inter', sans-serif" }}>
                {loading ? "Mendaftarkan..." : "Sign up"}
              </button>
            </form>

            <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "12px 0" }}>
              <div style={{ flex: 1, height: 1, background: "#ebebeb" }} />
              <span style={{ fontSize: "0.68rem", color: "#aaa" }}>-Or sign in with-</span>
              <div style={{ flex: 1, height: 1, background: "#ebebeb" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
              {[GoogleIcon, FacebookIcon, AppleIcon].map((Icon, i) => (
                <button key={i} type="button" style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: 10, padding: "10px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <Icon />
                </button>
              ))}
            </div>

            <p style={{ textAlign: "center", fontSize: "0.73rem", color: "#888" }}>
              Already have an account?{" "}
              <button onClick={() => navigate({ to: "/login" })} style={{ background: "none", border: "none", color: PURPLE, fontWeight: 700, cursor: "pointer", fontSize: "0.73rem", padding: 0 }}>Sign in</button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function GoogleIcon() { return <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>; }
function FacebookIcon() { return <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#1877F3" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>; }
function AppleIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="#000"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>; }
