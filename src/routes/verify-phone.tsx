import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowLeft, MessageCircle, ShieldCheck } from "lucide-react";
import { PrimaryButton, Screen } from "@/components/nala";
import { colors, font, inputStyle } from "@/lib/design";

export const Route = createFileRoute("/verify-phone")({
  head: () => ({
    meta: [
      { title: "Verifikasi Nomor Telepon — Nala Coffee Roastery" },
      { name: "description", content: "Verifikasi nomor telepon akun Anda." },
    ],
  }),
  component: VerifyPhonePage,
});

/* ══════════════════════════════════════════
   LAYAR 4 — VERIFIKASI NOMOR TELEPON
   (desain: baris 1, kolom 4)
══════════════════════════════════════════ */
function VerifyPhonePage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("812 3456 7890");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const cleanPhone = phone.trim() || "812 3456 7890";
    const target = { to: "/verify-otp", search: { phone: `+62 ${cleanPhone}` } } as const;
    void navigate(target);
  }

  return (
    <Screen>
      <div
        style={{
          padding: "0 24px 32px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {/* Tombol Kembali ke Layar 3 */}
        <div style={{ paddingTop: 16 }}>
          <button
            type="button"
            aria-label="Kembali ke Registrasi"
            onClick={() => void navigate({ to: "/register" })}
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

        {/* Ilustrasi smartphone dengan icon SMS & Shield sesuai desain */}
        <div
          style={{
            margin: "36px auto 28px",
            width: 120,
            height: 120,
            borderRadius: 30,
            background: colors.creamSoft,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <MessageCircle size={52} color={colors.green} strokeWidth={1.8} />
          <div
            style={{
              position: "absolute",
              right: -6,
              bottom: -6,
              width: 44,
              height: 44,
              borderRadius: 999,
              background: colors.green,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `3px solid ${colors.paper}`,
              boxShadow: "0 4px 10px rgba(8,54,40,0.2)",
            }}
          >
            <ShieldCheck size={22} color="#fff" />
          </div>
        </div>

        <h1
          style={{
            margin: "0 0 10px",
            textAlign: "center",
            fontFamily: font.display,
            fontWeight: 700,
            fontSize: "1.55rem",
            color: colors.ink,
          }}
        >
          Verifikasi Nomor Telepon
        </h1>
        <p
          style={{
            margin: "0 0 28px",
            textAlign: "center",
            fontFamily: font.sans,
            fontSize: "0.82rem",
            lineHeight: 1.6,
            color: colors.muted,
          }}
        >
          Masukkan nomor telepon Anda untuk verifikasi akun Nala Coffee Roastery
        </p>

        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", gap: 10 }}>
            <div
              style={{
                ...inputStyle,
                width: 90,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "16px 12px",
                cursor: "default",
              }}
              aria-label="Kode negara Indonesia"
            >
              <span style={{ fontSize: "1.1rem" }}>🇮🇩</span>
              <span style={{ fontSize: "0.88rem", fontWeight: 700, color: colors.ink }}>+62</span>
            </div>
            <input
              type="tel"
              placeholder="812 3456 7890"
              autoComplete="tel-national"
              required
              minLength={8}
              maxLength={15}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ ...inputStyle, flex: 1, padding: "16px 16px", fontSize: "0.95rem" }}
            />
          </div>

          <PrimaryButton type="submit">Kirim Kode OTP</PrimaryButton>
        </form>
      </div>
    </Screen>
  );
}
