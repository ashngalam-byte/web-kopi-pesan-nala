import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/verify-phone")({
  component: VerifyPhonePage,
});

function VerifyPhonePage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");

  return (
    <div
      className="nala-phone-frame"
      style={{
        width: "100%",
        maxWidth: 430,
        minHeight: "100vh",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Back Arrow */}
      <button
        onClick={() => navigate({ to: "/signup" })}
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-label="Kembali"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 18L9 12L15 6"
            stroke="#0E3A23"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div style={{ padding: "80px 32px 48px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* SVG Illustration */}
        <div style={{ marginBottom: 32, position: "relative" }}>
          <svg width="180" height="200" viewBox="0 0 180 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Phone body */}
            <rect x="45" y="30" width="90" height="155" rx="16" fill="none" stroke="#0E3A23" strokeWidth="4" />
            {/* Phone screen */}
            <rect x="52" y="48" width="76" height="110" rx="8" fill="#F5EDD9" />
            {/* Home button indicator */}
            <rect x="75" y="168" width="30" height="4" rx="2" fill="#0E3A23" />
            {/* Speaker */}
            <rect x="72" y="37" width="36" height="4" rx="2" fill="#0E3A23" />
            {/* Coffee plant icon inside screen */}
            <g transform="translate(68, 65)">
              {/* Stem */}
              <line x1="22" y1="80" x2="22" y2="30" stroke="#0E3A23" strokeWidth="2.5" strokeLinecap="round" />
              {/* Left leaf */}
              <ellipse cx="10" cy="50" rx="12" ry="7" fill="#0E3A23" transform="rotate(-25 10 50)" />
              {/* Right leaf */}
              <ellipse cx="34" cy="45" rx="12" ry="7" fill="#0E3A23" transform="rotate(25 34 45)" />
              {/* Coffee beans */}
              <ellipse cx="22" cy="22" rx="6" ry="8" fill="#0E3A23" />
              <line x1="22" y1="14" x2="22" y2="30" stroke="#F5EDD9" strokeWidth="1.5" strokeLinecap="round" />
              {/* Pot */}
              <path d="M8 85 Q22 95 36 85 L40 100 H4 Z" fill="#0E3A23" />
              <rect x="4" y="82" width="36" height="6" rx="3" fill="#0E3A23" />
            </g>
          </svg>

          {/* Chat bubble */}
          <div
            style={{
              position: "absolute",
              top: 10,
              right: -20,
              backgroundColor: "#0E3A23",
              borderRadius: "16px 16px 16px 4px",
              padding: "10px 14px",
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            <div style={{ width: 28, height: 3, backgroundColor: "#fff", borderRadius: 2 }} />
            <div style={{ width: 20, height: 3, backgroundColor: "#fff", borderRadius: 2 }} />
            <div style={{ width: 24, height: 3, backgroundColor: "#fff", borderRadius: 2 }} />
          </div>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 22,
            fontWeight: 700,
            color: "#111111",
            textAlign: "center",
            marginBottom: 10,
            marginTop: 0,
          }}
        >
          Verifikasi Nomor Telepon
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 14,
            color: "#666",
            textAlign: "center",
            marginBottom: 32,
            marginTop: 0,
            lineHeight: 1.6,
          }}
        >
          Masukkan nomor telepon Anda untuk menerima kode OTP
        </p>

        {/* Phone Input Row */}
        <div
          style={{
            display: "flex",
            gap: 10,
            width: "100%",
            marginBottom: 24,
          }}
        >
          {/* Country Code Button */}
          <button
            style={{
              padding: "16px 14px",
              borderRadius: 12,
              border: "1.5px solid #e5e7eb",
              backgroundColor: "#fff",
              fontSize: 15,
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              color: "#111",
              cursor: "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            +62 ▾
          </button>

          {/* Phone Number Input */}
          <input
            type="tel"
            placeholder="Nomor Telepon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              flex: 1,
              padding: "16px 18px",
              borderRadius: 12,
              border: "1.5px solid #e5e7eb",
              backgroundColor: "#f9fafb",
              fontSize: 15,
              fontFamily: "'Montserrat', sans-serif",
              color: "#111",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={() => navigate({ to: "/verify-otp" })}
          style={{
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
            boxShadow: "0 2px 8px rgba(14,58,35,0.25)",
          }}
        >
          Kirim Kode OTP
        </button>
      </div>
    </div>
  );
}
