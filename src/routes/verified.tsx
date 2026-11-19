import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/verified")({
  component: VerifiedPage,
});

function VerifiedPage() {
  const navigate = useNavigate();

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
        onClick={() => navigate({ to: "/verify-otp" })}
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

      <div
        style={{
          padding: "80px 32px 48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Success Circle with Checkmark */}
        <div
          style={{
            width: 160,
            height: 160,
            borderRadius: "50%",
            backgroundColor: "#6BBF7A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 36,
            boxShadow: "0 8px 32px rgba(107,191,122,0.35)",
          }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16 40L32 56L64 24"
              stroke="white"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 24,
            fontWeight: 700,
            color: "#111111",
            textAlign: "center",
            marginBottom: 16,
            marginTop: 0,
            lineHeight: 1.3,
          }}
        >
          Akun Anda Berhasil Diverifikasi!
        </h1>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 14,
            color: "#666",
            textAlign: "center",
            marginBottom: 48,
            marginTop: 0,
            lineHeight: 1.7,
          }}
        >
          Sekarang Anda dapat menikmati pengalaman terbaik di Nala Coffee Roastory
        </p>

        {/* Continue Button */}
        <button
          onClick={() => navigate({ to: "/onboarding" })}
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
          Lanjutkan
        </button>
      </div>
    </div>
  );
}
