import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { NalaLogo } from "@/components/NalaLogo";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Halaman 3 → halaman 4 (verifikasi nomor telepon).
    navigate({ to: "/verify-phone" });
  };

  return (
    <div className="nala-phone-frame" style={phoneWrapStyle}>
      <div style={pageStyle}>
        {/* Back arrow */}
        <button
          onClick={() => navigate({ to: "/login" })}
          style={backBtnStyle}
          aria-label="Kembali"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19L8 12L15 5" stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Logo */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
          <NalaLogo size={160} />
        </div>

        {/* Judul */}
        <h1 style={titleStyle}>Login to your Account</h1>

        {/* Form */}
        <form onSubmit={handleSignUp} style={formStyle}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <button type="submit" style={primaryBtnStyle}>
            Sign up
          </button>
        </form>

        {/* Divider */}
        <div style={dividerStyle}>
          <span style={dividerTextStyle}>-Or sign in with-</span>
        </div>

        {/* Social Buttons */}
        <div style={socialRowStyle}>
          {/* Google */}
          <button style={socialBtnStyle} aria-label="Sign up with Google">
            <svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
          </button>

          {/* Facebook */}
          <button style={socialBtnStyle} aria-label="Sign up with Facebook">
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" fill="#1877F2"/>
              <path d="M16.5 8H14.5C13.9 8 13.5 8.4 13.5 9V11H16.5L16 14H13.5V22H10.5V14H8V11H10.5V9C10.5 6.8 12.1 5 14.3 5H16.5V8Z" fill="white"/>
            </svg>
          </button>

          {/* Apple */}
          <button style={socialBtnStyle} aria-label="Sign up with Apple">
            <svg width="22" height="22" viewBox="0 0 814 1000" xmlns="http://www.w3.org/2000/svg">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.6-155.5-115.1C46.1 790 0 665.1 0 544.3c0-213.3 139.5-326 276.4-326 70.1 0 128.4 46.4 172.5 46.4 42.1 0 108.2-49 191.5-49 30.8 0 134.2 2.6 198.3 99.2zM549 143c23.4-35.1 39.5-83.4 39.5-131.7 0-6.5-.6-13-1.9-18.4-37.6 1.3-82.3 25.1-109.6 63.2-21.1 29.5-39.5 77.8-39.5 126.8 0 7.1.6 14.3 1.3 16.5 2.6.6 6.5 1.3 10.4 1.3 33.5 0 75.7-22.5 99.8-57.7z" fill="#000"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Styles ─────────────────────────── */

const phoneWrapStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 430,
  minHeight: "100vh",
  backgroundColor: "#ffffff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const pageStyle: React.CSSProperties = {
  padding: "48px 32px 40px",
  display: "flex",
  flexDirection: "column",
  gap: 0,
  position: "relative",
};

const backBtnStyle: React.CSSProperties = {
  position: "absolute",
  top: 48,
  left: 24,
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: 4,
  display: "flex",
  alignItems: "center",
};

const titleStyle: React.CSSProperties = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: 24,
  fontWeight: 700,
  color: "#111111",
  marginBottom: 24,
  marginTop: 0,
};

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 14,
  marginBottom: 24,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "16px 18px",
  borderRadius: 12,
  border: "1px solid #e5e7eb",
  backgroundColor: "#f9fafb",
  fontSize: 16,
  fontFamily: "'Montserrat', sans-serif",
  color: "#111",
  outline: "none",
  boxSizing: "border-box",
  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
};

const primaryBtnStyle: React.CSSProperties = {
  width: "100%",
  padding: "16px",
  borderRadius: 12,
  border: "none",
  backgroundColor: "#0E3A23",
  color: "#ffffff",
  fontSize: 17,
  fontWeight: 600,
  fontFamily: "'Montserrat', sans-serif",
  cursor: "pointer",
  marginTop: 4,
  boxShadow: "0 2px 8px rgba(14,58,35,0.25)",
};

const dividerStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: 20,
};

const dividerTextStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#888",
  fontFamily: "'Montserrat', sans-serif",
};

const socialRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: 16,
  marginBottom: 32,
};

const socialBtnStyle: React.CSSProperties = {
  width: 72,
  height: 56,
  borderRadius: 12,
  border: "1px solid #e5e7eb",
  backgroundColor: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
};
