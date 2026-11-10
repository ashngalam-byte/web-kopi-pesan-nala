import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { PrimaryButton, Screen } from "@/components/nala";
import { colors, font } from "@/lib/design";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Terima Kasih — Nala Coffee Roastery" },
      { name: "description", content: "Terima kasih telah memesan di Nala Coffee Roastery." },
    ],
  }),
  component: ThankYouPage,
});

/* ══════════════════════════════════════════
   LAYAR 23 — TERIMA KASIH
   (desain: baris 3, kolom 6 — Layar Terakhir)
══════════════════════════════════════════ */
function ThankYouPage() {
  const navigate = useNavigate();

  return (
    <Screen bg={colors.green}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Tombol Kembali ke Layar 22 */}
        <div style={{ padding: "18px 20px 0" }}>
          <button
            type="button"
            aria-label="Kembali ke Pembayaran Sukses"
            onClick={() => void navigate({ to: "/payment-success" })}
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "none",
              borderRadius: 999,
              padding: 6,
              cursor: "pointer",
              display: "flex",
              color: "#fff",
            }}
          >
            <ArrowLeft size={20} />
          </button>
        </div>

        <div style={{ flex: 1, padding: "8px 28px 0", textAlign: "center" }}>
          {/* Logo versi putih dari aset asli */}
          <img
            src="/nala-logo.png"
            alt="NALA Coffee Roastery"
            style={{
              width: 110,
              objectFit: "contain",
              margin: "0 auto",
              display: "block",
              filter: "brightness(0) invert(1)",
            }}
          />

          <h1
            style={{
              margin: "18px 0 0",
              fontFamily: font.display,
              fontWeight: 700,
              fontSize: "1.75rem",
              color: "#fff",
            }}
          >
            Terima Kasih!
          </h1>
          <p
            style={{
              margin: "6px 0 0",
              fontFamily: font.sans,
              fontWeight: 700,
              fontSize: "0.95rem",
              color: colors.cream,
            }}
          >
            Thank You!
          </p>
          <p
            style={{
              margin: "14px 0 0",
              fontFamily: font.sans,
              fontWeight: 600,
              fontSize: "0.85rem",
              lineHeight: 1.65,
              color: "#fff",
            }}
          >
            Sampai jumpa di pesanan
            <br />
            berikutnya!
          </p>
          <p
            style={{
              margin: "6px 0 0",
              fontFamily: font.sans,
              fontWeight: 600,
              fontSize: "0.82rem",
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            See you on your next order!
          </p>

          <div style={{ height: 1, background: "rgba(255, 255, 255, 0.2)", margin: "18px 12px" }} />

          <p
            style={{
              margin: 0,
              fontFamily: font.sans,
              fontWeight: 800,
              letterSpacing: "0.1em",
              fontSize: "0.85rem",
              color: "#fff",
            }}
          >
            NALA COFFEE ROASTERY
          </p>
          <p
            style={{
              margin: "4px 0 0",
              fontFamily: font.sans,
              fontWeight: 600,
              fontSize: "0.78rem",
              color: colors.cream,
            }}
          >
            Taste the Quality, Feel the Story.
          </p>
        </div>

        {/* Foto seni latte kopi dengan biji kopi sesuai gambar desain */}
        <div style={{ marginTop: 18, overflow: "hidden" }}>
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2087?w=900&q=80"
            alt="Kopi Nala Coffee Roastery"
            style={{
              width: "100%",
              height: 220,
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        <div
          style={{ padding: "16px 24px 24px", display: "flex", flexDirection: "column", gap: 10 }}
        >
          <button
            type="button"
            onClick={() => void navigate({ to: "/home", replace: true })}
            style={{
              width: "100%",
              background: colors.caramel,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "14px",
              fontFamily: font.sans,
              fontWeight: 700,
              fontSize: "0.92rem",
              cursor: "pointer",
            }}
          >
            Kembali ke Beranda
          </button>

          <button
            type="button"
            onClick={() => void navigate({ to: "/", replace: true })}
            style={{
              width: "100%",
              background: "rgba(255, 255, 255, 0.15)",
              color: "#fff",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: 8,
              padding: "12px",
              fontFamily: font.sans,
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <RotateCcw size={16} />
            Mulai Ulang →
          </button>
        </div>
      </div>
    </Screen>
  );
}
