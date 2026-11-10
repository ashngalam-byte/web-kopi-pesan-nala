import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { PrimaryButton, Screen } from "@/components/nala";
import { colors, font } from "@/lib/design";

export const Route = createFileRoute("/payment-success")({
  validateSearch: (search: Record<string, unknown>) => ({
    order: typeof search["order"] === "string" && search["order"] ? search["order"] : "ANG0123456",
  }),
  head: () => ({
    meta: [
      { title: "Pembayaran Berhasil — Nala Coffee Roastery" },
      { name: "description", content: "Pembayaran berhasil diproses." },
    ],
  }),
  component: PaymentSuccessPage,
});

/* ══════════════════════════════════════════
   LAYAR 22 — PEMBAYARAN BERHASIL
   (desain: baris 3, kolom 5)
   Nomor Pesanan: ANG0123456
══════════════════════════════════════════ */
function PaymentSuccessPage() {
  const navigate = useNavigate();
  const { order } = Route.useSearch();

  return (
    <Screen>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Tombol Kembali ke Layar 21 */}
        <div style={{ padding: "18px 20px 0" }}>
          <button
            type="button"
            aria-label="Kembali ke Checkout"
            onClick={() => void navigate({ to: "/checkout" })}
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

        <div style={{ flex: 1, padding: "8px 28px 0", textAlign: "center" }}>

          {/* Ikon Sukses Hijau Besar */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                width: 110,
                height: 110,
                borderRadius: 999,
                background: "#4CAF50",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 25px rgba(76, 175, 80, 0.35)",
              }}
            >
              <Check size={60} color="#FFFFFF" strokeWidth={3.4} />
            </div>
          </div>

          <h1
            style={{
              margin: "24px 0 0",
              fontFamily: font.display,
              fontWeight: 700,
              fontSize: "1.6rem",
              color: colors.ink,
            }}
          >
            Pembayaran Berhasil!
          </h1>
          <p
            style={{
              margin: "8px 0 0",
              fontFamily: font.sans,
              fontWeight: 700,
              fontSize: "0.95rem",
              color: colors.ink,
            }}
          >
            Payment Successful!
          </p>
          <p
            style={{
              margin: "8px 0 0",
              fontFamily: font.sans,
              fontWeight: 600,
              fontSize: "0.82rem",
              color: colors.muted,
            }}
          >
            Pesanan Anda sedang diproses
          </p>

          <div style={{ height: 1, background: colors.line, margin: "18px 12px" }} />

          <p
            style={{
              margin: 0,
              fontFamily: font.sans,
              fontWeight: 700,
              fontSize: "0.85rem",
              color: colors.muted,
            }}
          >
            Nomor Pesanan
          </p>
          <p
            style={{
              margin: "6px 0 0",
              fontFamily: font.sans,
              fontWeight: 800,
              fontSize: "1.35rem",
              color: colors.green,
              letterSpacing: "0.04em",
            }}
          >
            #{order}
          </p>

          <div style={{ marginTop: 20 }}>
            <PrimaryButton onClick={() => void navigate({ to: "/thank-you" })}>
              Lacak Pesanan →
            </PrimaryButton>
          </div>
        </div>

        {/* Foto produk kopi di bawah sesuai gambar desain */}
        <div style={{ marginTop: 20, overflow: "hidden" }}>
          <img
            src="https://images.unsplash.com/photo-1541167760496-1628856ab772?w=900&q=80"
            alt="Kopi Nala Coffee Roastery"
            style={{
              width: "100%",
              height: 220,
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      </div>
    </Screen>
  );
}
