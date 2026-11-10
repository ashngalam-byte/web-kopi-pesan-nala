import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PrimaryButton, Screen } from "@/components/nala";
import { colors, font } from "@/lib/design";

export const Route = createFileRoute("/verified")({
  head: () => ({
    meta: [
      { title: "Akun Terverifikasi — Nala Coffee Roastory" },
      { name: "description", content: "Akun Anda berhasil diverifikasi." },
    ],
  }),
  component: VerifiedPage,
});

/* ══════════════════════════════════════════
   LAYAR 6 — AKUN BERHASIL DIVERIFIKASI
   (desain: baris 1, kolom 6)
══════════════════════════════════════════ */
function VerifiedPage() {
  const navigate = useNavigate();

  return (
    <Screen>
      <div
        style={{
          padding: "0 28px 32px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <div style={{ height: 88 }} />

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: 132,
              height: 132,
              borderRadius: 999,
              background: "#4CAF50",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Check size={72} color="#FFFFFF" strokeWidth={3.4} />
          </div>
        </div>

        <h1
          style={{
            margin: "36px 0 0",
            textAlign: "center",
            fontFamily: font.display,
            fontWeight: 700,
            fontSize: "1.5rem",
            lineHeight: 1.35,
            color: colors.ink,
          }}
        >
          Akun Anda
          <br />
          Berhasil Diverifikasi!
        </h1>
        <p
          style={{
            margin: "16px 0 0",
            textAlign: "center",
            fontFamily: font.sans,
            fontWeight: 600,
            fontSize: "0.85rem",
            lineHeight: 1.7,
            color: colors.ink,
          }}
        >
          Sekarang Anda dapat
          <br />
          menikmati pengalaman terbaik
          <br />
          di Nala Coffee Roastery
        </p>

        <div style={{ marginTop: "auto", paddingTop: 24 }}>
          <PrimaryButton onClick={() => void navigate({ to: "/onboarding", replace: true })}>
            Lanjutkan
          </PrimaryButton>
        </div>
      </div>
    </Screen>
  );
}
