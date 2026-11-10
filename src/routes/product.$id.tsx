import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Star } from "lucide-react";
import { PrimaryButton, QuantityStepper, Screen, SizePicker } from "@/components/nala";
import { colors, font, formatDecimal, formatRp } from "@/lib/design";
import { useCart } from "@/lib/cart";
import { findProduct, PRODUCTS } from "@/data/products";

export const Route = createFileRoute("/product/$id")({
  head: () => ({
    meta: [
      { title: "Detail Produk — Nala Coffee Roastery" },
      { name: "description", content: "Detail produk Nala Coffee Roastery." },
    ],
  }),
  loader: () => null,
  component: ProductDetailPage,
});

/* ══════════════════════════════════════════
   LAYAR 18 — DETAIL PRODUK
   (desain: baris 3, kolom 1)
   Produk unggulan: Nala Coffee Milk (Rp13.000)
══════════════════════════════════════════ */
function ProductDetailPage() {
  const navigate = useNavigate();
  const { id } = Route.useParams();
  const cart = useCart();

  // Cari produk atau default ke nala-coffee-milk sesuai gambar desain mockup 18
  const defaultProduct = PRODUCTS.find((p) => p.id === "nala-coffee-milk") ?? PRODUCTS[0]!;
  const product = findProduct(id) ?? defaultProduct;

  const [size, setSize] = useState<"S" | "M" | "L">("M");
  const [qty, setQty] = useState(1);

  return (
    <Screen>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Foto produk + tombol kembali */}
        <div style={{ position: "relative" }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              height: 290,
              objectFit: "cover",
              display: "block",
              background: colors.creamSoft,
            }}
          />
          <button
            type="button"
            aria-label="Kembali ke Menu"
            onClick={() =>
              void navigate({
                to: "/menu/$category",
                params: { category: product.category },
              })
            }
            style={{
              position: "absolute",
              top: 14,
              left: 14,
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(4px)",
              border: "none",
              borderRadius: 999,
              padding: 8,
              cursor: "pointer",
              display: "flex",
              color: colors.ink,
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            <ArrowLeft size={20} />
          </button>
        </div>

        <div
          style={{ padding: "18px 20px 24px", flex: 1, display: "flex", flexDirection: "column" }}
        >
          <h1
            style={{
              margin: 0,
              fontFamily: font.display,
              fontWeight: 700,
              fontSize: "1.75rem",
              color: colors.green,
            }}
          >
            {product.name}
          </h1>

          <p
            style={{
              margin: "6px 0 0",
              fontFamily: font.display,
              fontWeight: 700,
              fontSize: "1.35rem",
              color: colors.ink,
            }}
          >
            {formatRp(product.price)}*{product.unit ? ` / ${product.unit}` : ""}
          </p>

          <p
            style={{
              margin: "8px 0 0",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontFamily: font.sans,
              fontWeight: 700,
              fontSize: "0.82rem",
              color: colors.ink,
            }}
          >
            <Star size={15} fill={colors.star} color={colors.star} />
            {product.rating ? formatDecimal(product.rating) : "4,8"}
            <span style={{ color: colors.muted, fontWeight: 500 }}>
              ({(product.reviews ?? 1200).toLocaleString("id-ID")} ulasan)
            </span>
          </p>

          <p
            style={{
              margin: "12px 0 0",
              fontFamily: font.sans,
              fontSize: "0.82rem",
              lineHeight: 1.65,
              color: colors.muted,
            }}
          >
            {product.desc}
          </p>

          {product.sizes?.length ? (
            <div style={{ marginTop: 20 }}>
              <p
                style={{
                  margin: "0 0 10px",
                  fontFamily: font.sans,
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  color: colors.ink,
                }}
              >
                Ukuran
              </p>
              <SizePicker sizes={product.sizes} value={size} onChange={setSize} />
            </div>
          ) : null}

          <div style={{ marginTop: 20 }}>
            <p
              style={{
                margin: "0 0 10px",
                fontFamily: font.sans,
                fontWeight: 700,
                fontSize: "0.85rem",
                color: colors.ink,
              }}
            >
              Jumlah
            </p>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <QuantityStepper value={qty} onChange={setQty} min={1} />
            </div>
          </div>

          <div style={{ marginTop: "auto", paddingTop: 28 }}>
            <PrimaryButton
              onClick={() => {
                cart.add(
                  {
                    productId: product.id,
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    size: product.sizes?.length ? size : null,
                  },
                  qty,
                );
                // Lanjut ke Layar 19 (Pilih Outlet)
                void navigate({ to: "/outlet" });
              }}
            >
              Pilih Outlet
            </PrimaryButton>
          </div>
        </div>
      </div>
    </Screen>
  );
}
