import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "TemuBal — Aplikasi Barang Hilang & Temuan" }] }),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/login", replace: true }), 2500);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div style={{ minHeight: "100vh", background: "#6C63FF", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px", fontFamily: "'Inter', sans-serif" }}>
      <div
        onClick={() => navigate({ to: "/login", replace: true })}
        style={{
          width: "100%", maxWidth: 320,
          background: "#fff",
          borderRadius: 36,
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          aspectRatio: "9/16",
          cursor: "pointer",
          padding: "40px 32px",
        }}
      >
        {/* Logo icon */}
        <div style={{ width: 100, height: 100, background: "#6C63FF", borderRadius: 28, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, boxShadow: "0 8px 24px rgba(108,99,255,0.35)" }}>
          <span style={{ fontSize: "3rem" }}>🔍</span>
        </div>
        {/* App name */}
        <p style={{ margin: "0 0 8px", fontWeight: 800, fontSize: "2rem", color: "#1a1a2e", letterSpacing: "-0.02em" }}>TemuBal</p>
        <p style={{ margin: 0, fontSize: "0.8rem", color: "#888", textAlign: "center" }}>Aplikasi Barang Hilang & Temuan</p>
        {/* Tagline */}
        <p style={{ margin: "32px 0 0", fontSize: "0.72rem", color: "#aaa", textAlign: "center", lineHeight: 1.6 }}>
          Laporkan · Temukan · Cocokkan
        </p>
      </div>
    </div>
  );
}
