import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, CreditCard, MapPin, Wallet, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { PrimaryButton, Screen } from "@/components/nala";
import { colors, font, formatRp } from "@/lib/design";
import { DELIVERY_FEE, SERVICE_FEE, useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Nala Coffee Roastery" },
      { name: "description", content: "Checkout pesanan Nala Coffee Roastery." },
    ],
  }),
  loader: () => null,
  component: CheckoutPage,
});

type DeliveryMode = "pickup" | "delivery";
type PaymentMethod = "qris" | "ewallet" | "card";

const PAYMENT_OPTIONS: Array<{
  id: PaymentMethod;
  label: string;
  icon: typeof Wallet;
  desc: string;
}> = [
  { id: "qris", label: "QRIS", icon: Wallet, desc: "GoPay, OVO, DANA, ShopeePay & BCA" },
  { id: "ewallet", label: "Transfer Bank / VA", icon: Wallet, desc: "BCA, Mandiri, BRI, BNI" },
  { id: "card", label: "Kartu Kredit / Debit", icon: CreditCard, desc: "Visa, Mastercard, JCB" },
];

/* ══════════════════════════════════════════
   LAYAR 21 — CHECKOUT
   (desain: baris 3, kolom 4)
══════════════════════════════════════════ */
function CheckoutPage() {
  const navigate = useNavigate();
  const cart = useCart();
  const [delivery, setDelivery] = useState<DeliveryMode>("pickup");
  const [payment, setPayment] = useState<PaymentMethod>("qris");

  // Jika keranjang kosong saat masuk, otomatis isi item desain (Nala Coffee Milk)
  useEffect(() => {
    if (cart.items.length === 0) {
      cart.add(
        {
          productId: "nala-coffee-milk",
          name: "Nala Coffee Milk",
          image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&q=80",
          price: 13000,
          size: "M",
        },
        1,
      );
    }
  }, [cart]);

  const deliveryFee = delivery === "delivery" ? DELIVERY_FEE : 0;
  const subtotal = cart.subtotal > 0 ? cart.subtotal : 13000;
  const total = subtotal + SERVICE_FEE + deliveryFee;

  return (
    <Screen>
      <div style={{ flex: 1, padding: "0 20px 24px", display: "flex", flexDirection: "column" }}>
        {/* Header Checkout */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "18px 0 14px",
            position: "relative",
          }}
        >
          <button
            type="button"
            aria-label="Kembali ke Keranjang"
            onClick={() => void navigate({ to: "/cart" })}
            style={{
              position: "absolute",
              left: 0,
              background: "none",
              border: "none",
              padding: 4,
              cursor: "pointer",
              display: "flex",
              color: colors.ink,
            }}
          >
            <ArrowLeft size={22} />
          </button>
          <h1
            style={{
              margin: 0,
              fontFamily: font.display,
              fontWeight: 700,
              fontSize: "1.45rem",
              color: colors.ink,
            }}
          >
            Checkout
          </h1>
        </div>

        {/* 1. Alamat / Lokasi Pengambilan */}
        <div style={{ marginBottom: 16 }}>
          <p
            style={{
              margin: "0 0 8px",
              fontFamily: font.sans,
              fontWeight: 700,
              fontSize: "0.88rem",
              color: colors.ink,
            }}
          >
            Alamat Pengiriman / Outlet
          </p>
          <div
            style={{
              padding: 14,
              background: colors.creamSoft,
              borderRadius: 14,
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
            }}
          >
            <MapPin size={18} color={colors.green} style={{ marginTop: 2, flexShrink: 0 }} />
            <div>
              <p
                style={{
                  margin: 0,
                  fontFamily: font.sans,
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  color: colors.ink,
                }}
              >
                Nala Coffee Roastery - Senopati
              </p>
              <p style={{ margin: "3px 0 0", fontSize: "0.75rem", color: colors.muted }}>
                Jl. Surabaya No.12, Malang (1.2 km)
              </p>
            </div>
          </div>
        </div>

        {/* 2. Metode Pengiriman */}
        <div style={{ marginBottom: 16 }}>
          <p
            style={{
              margin: "0 0 8px",
              fontFamily: font.sans,
              fontWeight: 700,
              fontSize: "0.88rem",
              color: colors.ink,
            }}
          >
            Metode Pengiriman
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {(["pickup", "delivery"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setDelivery(m)}
                style={{
                  padding: "11px 12px",
                  borderRadius: 12,
                  border: delivery === m ? `2px solid ${colors.green}` : `1px solid ${colors.line}`,
                  background: delivery === m ? `${colors.green}12` : colors.paper,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontFamily: font.sans,
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  color: delivery === m ? colors.green : colors.ink,
                }}
              >
                <span>{m === "pickup" ? "Pick Up di Outlet" : "Delivery"}</span>
                {delivery === m && <CheckCircle2 size={16} color={colors.green} />}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Ringkasan Pesanan */}
        <div style={{ marginBottom: 16 }}>
          <p
            style={{
              margin: "0 0 8px",
              fontFamily: font.sans,
              fontWeight: 700,
              fontSize: "0.88rem",
              color: colors.ink,
            }}
          >
            Pesanan Anda
          </p>
          <div
            style={{
              padding: 12,
              background: colors.paper,
              borderRadius: 14,
              border: `1px solid ${colors.line}`,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&q=80"
              alt="Nala Coffee Milk"
              style={{
                width: 52,
                height: 52,
                borderRadius: 10,
                objectFit: "cover",
                background: colors.creamSoft,
              }}
            />
            <div style={{ flex: 1 }}>
              <p
                style={{
                  margin: 0,
                  fontFamily: font.display,
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: colors.green,
                }}
              >
                Nala Coffee Milk (Size: M)
              </p>
              <p style={{ margin: "2px 0 0", fontSize: "0.78rem", color: colors.muted }}>
                1x • Rp 13.000
              </p>
            </div>
          </div>
        </div>

        {/* 4. Metode Pembayaran */}
        <div style={{ marginBottom: 16 }}>
          <p
            style={{
              margin: "0 0 8px",
              fontFamily: font.sans,
              fontWeight: 700,
              fontSize: "0.88rem",
              color: colors.ink,
            }}
          >
            Metode Pembayaran
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {PAYMENT_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setPayment(opt.id)}
                style={{
                  padding: "11px 14px",
                  borderRadius: 12,
                  border:
                    payment === opt.id ? `2px solid ${colors.green}` : `1px solid ${colors.line}`,
                  background: payment === opt.id ? `${colors.green}10` : colors.paper,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  textAlign: "left",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <opt.icon size={18} color={payment === opt.id ? colors.green : colors.muted} />
                  <div>
                    <span
                      style={{
                        display: "block",
                        fontFamily: font.sans,
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        color: colors.ink,
                      }}
                    >
                      {opt.label}
                    </span>
                    <span style={{ fontSize: "0.7rem", color: colors.muted }}>{opt.desc}</span>
                  </div>
                </div>
                {payment === opt.id && <CheckCircle2 size={16} color={colors.green} />}
              </button>
            ))}
          </div>
        </div>

        {/* 5. Ringkasan Biaya */}
        <div
          style={{
            background: colors.creamSoft,
            padding: "14px 16px",
            borderRadius: 14,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            marginBottom: 20,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
            <span style={{ color: colors.muted }}>Subtotal</span>
            <span style={{ fontWeight: 700, color: colors.ink }}>{formatRp(subtotal, true)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
            <span style={{ color: colors.muted }}>Biaya Layanan</span>
            <span style={{ fontWeight: 700, color: colors.ink }}>
              {formatRp(SERVICE_FEE, true)}
            </span>
          </div>
          {delivery === "delivery" && (
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
              <span style={{ color: colors.muted }}>Ongkos Kirim</span>
              <span style={{ fontWeight: 700, color: colors.ink }}>
                {formatRp(DELIVERY_FEE, true)}
              </span>
            </div>
          )}
          <div style={{ height: 1, background: "rgba(8, 54, 40, 0.12)", margin: "4px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span
              style={{
                fontFamily: font.display,
                fontWeight: 700,
                fontSize: "1.2rem",
                color: colors.green,
              }}
            >
              Total Pembayaran
            </span>
            <span
              style={{
                fontFamily: font.sans,
                fontWeight: 800,
                fontSize: "1.15rem",
                color: colors.green,
              }}
            >
              {formatRp(total, true)}
            </span>
          </div>
        </div>

        {/* Tombol Bayar Sekarang */}
        <div style={{ marginTop: "auto" }}>
          <PrimaryButton
            onClick={() => {
              // Nomor pesanan sesuai screenshot desain mockup 22: ANG0123456
              const orderNumber = "ANG0123456";
              cart.clear();
              void navigate({ to: "/payment-success", search: { order: orderNumber } });
            }}
          >
            Bayar Sekarang
          </PrimaryButton>
        </div>
      </div>
    </Screen>
  );
}
