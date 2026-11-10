import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowLeft, Trash2 } from "lucide-react";
import { PrimaryButton, QuantityStepper, Screen } from "@/components/nala";
import { colors, font, formatRp } from "@/lib/design";
import { SERVICE_FEE, useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Keranjang — Nala Coffee Roastery" },
      { name: "description", content: "Keranjang pesanan Nala Coffee Roastery." },
    ],
  }),
  loader: () => null,
  component: CartPage,
});

/* ══════════════════════════════════════════
   LAYAR 20 — KERANJANG
   (desain: baris 3, kolom 3)
   Item: Nala Coffee Milk (Rp13.000)
   Biaya Layanan: Rp2.000, Total: Rp15.000
══════════════════════════════════════════ */
function CartPage() {
  const navigate = useNavigate();
  const cart = useCart();

  // Inisialisasi otomatis produk desain mockup jika keranjang masih kosong
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

  return (
    <Screen>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 20px 24px" }}>
        {/* Header Keranjang */}
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
            aria-label="Kembali ke Pilih Outlet"
            onClick={() => void navigate({ to: "/outlet" })}
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
            Keranjang
          </h1>
        </div>


        {cart.items.length === 0 ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 18,
              textAlign: "center",
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: font.sans,
                fontSize: "0.85rem",
                color: colors.muted,
              }}
            >
              Keranjangmu masih kosong.
            </p>
            <PrimaryButton
              onClick={() =>
                void navigate({ to: "/menu/$category", params: { category: "coffee" } })
              }
            >
              Lihat Menu
            </PrimaryButton>
          </div>
        ) : (
          <>
            {/* Daftar item */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingTop: 6 }}>
              {cart.items.map((item) => (
                <div key={`${item.productId}-${item.size ?? "fixed"}`}>
                  <div style={{ display: "flex", gap: 12 }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: 84,
                        height: 84,
                        borderRadius: 14,
                        objectFit: "cover",
                        background: colors.creamSoft,
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          margin: 0,
                          fontFamily: font.display,
                          fontWeight: 700,
                          fontSize: "1.05rem",
                          lineHeight: 1.3,
                          color: colors.green,
                        }}
                      >
                        {item.name}
                      </p>
                      {item.size && (
                        <p
                          style={{
                            margin: "3px 0 0",
                            fontFamily: font.sans,
                            fontSize: "0.78rem",
                            color: colors.muted,
                          }}
                        >
                          Size: {item.size}
                        </p>
                      )}
                      <p
                        style={{
                          margin: "6px 0 0",
                          fontFamily: font.sans,
                          fontWeight: 800,
                          fontSize: "0.95rem",
                          color: colors.ink,
                        }}
                      >
                        {formatRp(item.price)}*
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      gap: 10,
                      marginTop: 8,
                    }}
                  >
                    <QuantityStepper
                      value={item.qty}
                      onChange={(q) => cart.setQty(item.productId, item.size, q)}
                      min={1}
                    />
                    <button
                      type="button"
                      aria-label={`Hapus ${item.name}`}
                      onClick={() => cart.remove(item.productId, item.size)}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        border: "none",
                        background: colors.danger,
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                  <div style={{ height: 1, background: colors.line, marginTop: 14 }} />
                </div>
              ))}
            </div>

            {/* Ringkasan biaya sesuai mockup */}
            <div
              style={{
                marginTop: 22,
                display: "flex",
                flexDirection: "column",
                gap: 12,
                background: colors.creamSoft,
                padding: "16px",
                borderRadius: 16,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontFamily: font.sans,
                    fontWeight: 600,
                    fontSize: "0.88rem",
                    color: colors.ink,
                  }}
                >
                  Subtotal
                </span>
                <span
                  style={{
                    fontFamily: font.sans,
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    color: colors.ink,
                  }}
                >
                  {formatRp(cart.subtotal, true)}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontFamily: font.sans,
                    fontWeight: 600,
                    fontSize: "0.88rem",
                    color: colors.ink,
                  }}
                >
                  Biaya Layanan
                </span>
                <span
                  style={{
                    fontFamily: font.sans,
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    color: colors.ink,
                  }}
                >
                  {formatRp(SERVICE_FEE, true)}
                </span>
              </div>
              <div style={{ height: 1, background: "rgba(8, 54, 40, 0.12)" }} />
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <span
                  style={{
                    fontFamily: font.display,
                    fontWeight: 700,
                    fontSize: "1.35rem",
                    color: colors.green,
                  }}
                >
                  Total
                </span>
                <span
                  style={{
                    fontFamily: font.sans,
                    fontWeight: 800,
                    fontSize: "1.2rem",
                    color: colors.green,
                  }}
                >
                  {formatRp(cart.subtotal + SERVICE_FEE, true)}
                </span>
              </div>
            </div>

            <div style={{ marginTop: "auto", paddingTop: 24 }}>
              <PrimaryButton withArrow onClick={() => void navigate({ to: "/checkout" })}>
                Checkout →
              </PrimaryButton>
            </div>
          </>
        )}
      </div>
    </Screen>
  );
}
