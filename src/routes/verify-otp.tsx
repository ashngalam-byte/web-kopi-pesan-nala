import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { OtpInput, PrimaryButton, Screen } from "@/components/nala";
import { colors, font } from "@/lib/design";

export const Route = createFileRoute("/verify-otp")({
  validateSearch: (search: Record<string, unknown>) => ({
    phone:
      typeof search["phone"] === "string" && search["phone"]
        ? search["phone"]
        : "+62 812 3456 7890",
  }),
  head: () => ({
    meta: [
      { title: "Masukkan Kode OTP — Nala Coffee Roastery" },
      { name: "description", content: "Masukkan kode OTP verifikasi akun." },
    ],
  }),
  component: VerifyOtpPage,
});

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

/* ══════════════════════════════════════════
   LAYAR 5 — MASUKKAN KODE OTP
   (desain: baris 1, kolom 5)
   Kotak 6 digit sesuai desain: 1 3 2 5 4 8
══════════════════════════════════════════ */
function VerifyOtpPage() {
  const navigate = useNavigate();
  const { phone } = Route.useSearch();
  // Diisi default sesuai gambar desain: 1 3 2 5 4 8
  const [code, setCode] = useState("132548");
  const [countdown, setCountdown] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const complete = code.length === OTP_LENGTH;

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
        {/* Tombol Kembali ke Layar 4 */}
        <div style={{ paddingTop: 16 }}>
          <button
            type="button"
            aria-label="Kembali ke Verifikasi Nomor"
            onClick={() => void navigate({ to: "/verify-phone" })}
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

        <div style={{ height: 36 }} />

        <h1
          style={{
            margin: "0 0 12px",
            textAlign: "center",
            fontFamily: font.display,
            fontWeight: 700,
            fontSize: "1.55rem",
            color: colors.ink,
          }}
        >
          Masukkan Kode OTP
        </h1>
        <p
          style={{
            margin: "0 0 32px",
            textAlign: "center",
            fontFamily: font.sans,
            fontSize: "0.82rem",
            lineHeight: 1.5,
            color: colors.muted,
          }}
        >
          Kode sudah dikirim ke <strong style={{ color: colors.ink }}>{phone}</strong>
        </p>

        {/* 6 Digit Input OTP (1 3 2 5 4 8) */}
        <OtpInput value={code} onChange={setCode} length={OTP_LENGTH} />

        {/* Tombol Isi Otomatis Contoh Desain */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 14 }}>
          <button
            type="button"
            onClick={() => setCode("132548")}
            style={{
              background: colors.creamSoft,
              border: "none",
              borderRadius: 999,
              padding: "4px 12px",
              fontSize: "0.72rem",
              fontFamily: font.sans,
              color: colors.green,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Isi Contoh Desain: 1 3 2 5 4 8
          </button>
        </div>

        <p
          style={{
            margin: "18px 0 0",
            textAlign: "center",
            fontSize: "0.75rem",
            color: colors.faint,
            fontFamily: font.sans,
            minHeight: 20,
          }}
        >
          {countdown > 0 ? (
            `Kirim Ulang dalam 00:${countdown.toString().padStart(2, "0")}`
          ) : (
            <button
              type="button"
              onClick={() => setCountdown(RESEND_SECONDS)}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                color: colors.gold,
                fontWeight: 700,
                fontFamily: font.sans,
                fontSize: "0.75rem",
              }}
            >
              Kirim ulang kode OTP
            </button>
          )}
        </p>

        <div style={{ marginTop: "auto", paddingTop: 28 }}>
          <PrimaryButton
            disabled={!complete}
            onClick={() => {
              void navigate({ to: "/verified", replace: true });
            }}
          >
            Verifikasi
          </PrimaryButton>
        </div>
      </div>
    </Screen>
  );
}
