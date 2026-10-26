import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, type FormEvent } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { registerUser } from "@/lib/register.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nala Coffee Roastory" },
      { name: "description", content: "Nala Coffee Roastory — Good Coffee, Better Days." },
    ],
  }),
  component: Home,
});

const GREEN = "#083628";
const CREAM = "#E8DDD0";

function NalaLogo({ size = 70 }: { size?: number }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
      <img src="/nala-logo.png" alt="Nala Coffee Roastory"
        style={{ width: size, objectFit: "contain" }} />
    </div>
  );
}

function GoogleIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>;
}
function FacebookIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#1877F3" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
}
function AppleIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="#000"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>;
}

function SocialBtn({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <button type="button" aria-label={label}
      style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: 10, padding: "12px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
      {icon}
    </button>
  );
}

const boxStyle: React.CSSProperties = {
  background: "#f5f5f5", borderRadius: 9,
  padding: "12px 14px", border: "1px solid #e8e8e8",
  display: "flex", alignItems: "center", marginBottom: 9,
};
const inpStyle: React.CSSProperties = {
  flex: 1, border: "none", background: "transparent",
  outline: "none", fontSize: "0.83rem", color: "#333",
  fontFamily: "'Montserrat', sans-serif",
};

/* ══════════════════════════════════════════
   SPLASH — card krem, logo di tengah
══════════════════════════════════════════ */
function SplashScreen({ onNext }: { onNext: () => void }) {
  useEffect(() => {
    const t = setTimeout(onNext, 2500);
    return () => clearTimeout(t);
  }, [onNext]);

  return (
    <div style={{
      minHeight: "100vh",
      background: GREEN,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 16px",
      fontFamily: "'Montserrat', sans-serif",
    }}>
      <div onClick={onNext} style={{
        width: "100%",
        maxWidth: 320,
        background: CREAM,
        borderRadius: 32,
        boxShadow: "0 16px 48px rgba(0,0,0,0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        aspectRatio: "9/16",
      }}>
        <img src="/nala-logo.png" alt="Nala Coffee Roastory"
          style={{ width: 160, objectFit: "contain" }} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   REGISTER
══════════════════════════════════════════ */
function RegisterScreen({ onBack }: { onBack: () => void }) {
  const [form, setForm]         = useState({ email: "", password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [done, setDone]         = useState(false);
  const navigate                = useNavigate();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirm) { setError("Password tidak cocok."); return; }
    setError(null);
    setLoading(true);
    try {
      const name = form.email.split("@")[0] ?? "user";
      const res = await registerUser({ data: { name, email: form.email, password: form.password } });
      if (res.ok) {
        setDone(true);
        setTimeout(() => navigate({ to: "/login" }), 1500);
      } else setError(res.error);
    } catch (err: any) {
      setError(err?.message ?? "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: GREEN, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", fontFamily: "'Montserrat', sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 320, background: "#fff", borderRadius: 28, padding: "24px 20px 20px", boxShadow: "0 16px 48px rgba(0,0,0,0.25)" }}>

        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", marginBottom: 4, padding: 0, display: "flex", color: "#333" }}>
          <ArrowLeft size={20} />
        </button>

        <NalaLogo size={70} />

        {done ? (
          <p style={{ textAlign: "center", color: GREEN, fontWeight: 700 }}>Akun dibuat! Redirecting...</p>
        ) : (
          <>
            <h2 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1a1a1a", margin: "0 0 12px" }}>Login to your Account</h2>

            <form onSubmit={onSubmit}>
              <div style={boxStyle}><input type="email" placeholder="Email" required maxLength={255} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inpStyle} /></div>
              <div style={boxStyle}>
                <input type={showPass ? "text" : "password"} placeholder="Password" required minLength={8} maxLength={128} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} style={inpStyle} />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa", padding: 0, display: "flex" }}>{showPass ? <EyeOff size={16} /> : <Eye size={16} />}</button>
              </div>
              <div style={boxStyle}>
                <input type={showConf ? "text" : "password"} placeholder="Confirm Password" required minLength={8} maxLength={128} value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} style={inpStyle} />
                <button type="button" onClick={() => setShowConf(!showConf)} style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa", padding: 0, display: "flex" }}>{showConf ? <EyeOff size={16} /> : <Eye size={16} />}</button>
              </div>
              {error && <p style={{ fontSize: "0.75rem", color: "#e53e3e", marginBottom: 8 }}>{error}</p>}
              <button type="submit" disabled={loading} style={{ width: "100%", background: "#083628", color: "#ffffff", border: "none", borderRadius: 8, padding: "12px", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer", opacity: loading ? 0.7 : 1, fontFamily: "'Montserrat', sans-serif", WebkitAppearance: "none" }}>
                {loading ? "Mendaftarkan..." : "Sign up"}
              </button>
            </form>

            <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "12px 0" }}>
              <div style={{ flex: 1, height: 1, background: "#ebebeb" }} />
              <span style={{ fontSize: "0.7rem", color: "#aaa" }}>-Or sign in with-</span>
              <div style={{ flex: 1, height: 1, background: "#ebebeb" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              <SocialBtn label="Google" icon={<GoogleIcon />} />
              <SocialBtn label="Facebook" icon={<FacebookIcon />} />
              <SocialBtn label="Apple" icon={<AppleIcon />} />
            </div>

            <p style={{ textAlign: "center", fontSize: "0.72rem", color: "#888", marginTop: 12 }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#083628", fontWeight: 700, textDecoration: "none" }}>Sign in</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   HOME — splash → register
══════════════════════════════════════════ */
function Home() {
  const [screen, setScreen] = useState<"splash" | "register">("splash");
  return screen === "splash"
    ? <SplashScreen onNext={() => setScreen("register")} />
    : <RegisterScreen onBack={() => setScreen("splash")} />;
}
