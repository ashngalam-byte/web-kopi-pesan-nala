import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";

export const Route = createFileRoute("/verify-otp")({
  component: VerifyOtpPage,
});

function VerifyOtpPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [seconds, setSeconds] = useState(59);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-advance to next input
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const formatTime = (s: number) =>
    `00:${s.toString().padStart(2, "0")}`;

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
        onClick={() => navigate({ to: "/verify-phone" })}
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
        {/* Title */}
        <h1
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 26,
            fontWeight: 700,
            color: "#111111",
            textAlign: "center",
            marginBottom: 14,
            marginTop: 0,
          }}
        >
          Masukkan Kode OTP
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 14,
            color: "#666",
            textAlign: "center",
            marginBottom: 36,
            marginTop: 0,
            lineHeight: 1.6,
          }}
        >
          Kode telah dikirim ke{" "}
          <span style={{ fontWeight: 700, color: "#111" }}>+62 812 3456 7890</span>
        </p>

        {/* OTP Input Boxes */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 24,
            justifyContent: "center",
          }}
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              style={{
                width: 48,
                height: 56,
                borderRadius: 12,
                border: `2px solid ${digit ? "#0E3A23" : "#e5e7eb"}`,
                backgroundColor: "#f9fafb",
                fontSize: 22,
                fontWeight: 700,
                fontFamily: "'Montserrat', sans-serif",
                color: "#111",
                textAlign: "center",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#0E3A23";
                e.target.style.boxShadow = "0 0 0 3px rgba(14,58,35,0.12)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = digit ? "#0E3A23" : "#e5e7eb";
                e.target.style.boxShadow = "none";
              }}
            />
          ))}
        </div>

        {/* Resend Timer */}
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 13,
            color: "#999",
            textAlign: "center",
            marginBottom: 32,
            marginTop: 0,
          }}
        >
          {seconds > 0 ? (
            <>Kirim ulang dalam <span style={{ fontWeight: 600 }}>{formatTime(seconds)}</span></>
          ) : (
            <button
              onClick={() => setSeconds(59)}
              style={{
                background: "none",
                border: "none",
                color: "#0E3A23",
                fontWeight: 700,
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 13,
                cursor: "pointer",
                padding: 0,
              }}
            >
              Kirim Ulang Kode
            </button>
          )}
        </p>

        {/* Verify Button */}
        <button
          onClick={() => navigate({ to: "/verified" })}
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
          Verifikasi
        </button>
      </div>
    </div>
  );
}
