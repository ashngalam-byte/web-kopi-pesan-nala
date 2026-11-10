import { Star } from "lucide-react";
import type { CSSProperties } from "react";
import { colors, font, formatDecimal, formatRp, radius } from "@/lib/design";
import type { Product } from "@/lib/types";
import { QuantityStepper } from "./quantity-stepper";
import { SizePicker } from "./size-picker";

/**
 * Kartu produk sesuai desain menu kategori: foto di kiri, nama + deskripsi gold +
 * rating + pilihan ukuran di kanan, lalu harga dan pengatur jumlah.
 */
export function ProductCard({
  product,
  qty,
  onQtyChange,
  size = null,
  onSizeChange,
  onOpenDetail,
  style,
}: {
  product: Product;
  qty: number;
  onQtyChange: (qty: number) => void;
  size?: "S" | "M" | "L" | null | undefined;
  onSizeChange?: ((size: "S" | "M" | "L") => void) | undefined;
  onOpenDetail?: (() => void) | undefined;
  style?: CSSProperties | undefined;
}) {
  const sizes = product.sizes ?? [];
  return (
    <div
      style={{
        background: colors.paper,
        border: `1px solid ${colors.line}`,
        borderRadius: radius.card,
        padding: 12,
        boxShadow: "0 1px 4px rgba(8, 54, 40, 0.05)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        ...style,
      }}
    >
      <div>
        <div style={{ display: "flex", gap: 12 }}>
          <img
            src={product.image}
            alt={product.name}
            onClick={onOpenDetail}
            style={{
              width: 88,
              height: 88,
              borderRadius: radius.photo,
              objectFit: "cover",
              background: colors.creamSoft,
              flexShrink: 0,
              cursor: onOpenDetail ? "pointer" : "default",
            }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              onClick={onOpenDetail}
              style={{
                margin: 0,
                fontFamily: font.display,
                fontWeight: 700,
                fontSize: "0.95rem",
                color: colors.green,
                cursor: onOpenDetail ? "pointer" : "default",
              }}
            >
              {product.name}
            </p>
            <p
              style={{
                margin: "3px 0 0",
                fontFamily: font.sans,
                fontWeight: 600,
                fontSize: "0.6rem",
                lineHeight: 1.5,
                color: colors.gold,
              }}
            >
              {product.desc}
            </p>
            {typeof product.rating === "number" && (
              <p
                style={{
                  margin: "6px 0 0",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontFamily: font.sans,
                  fontWeight: 700,
                  fontSize: "0.62rem",
                  color: colors.ink,
                }}
              >
                <Star size={11} fill={colors.star} color={colors.star} />
                {formatDecimal(product.rating)}
                {product.reviews ? ` (${product.reviews.toLocaleString("id-ID")} ulasan)` : ""}
              </p>
            )}
            {sizes.length > 0 && (
              <div style={{ marginTop: 7, display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    fontFamily: font.sans,
                    fontWeight: 700,
                    fontSize: "0.62rem",
                    color: colors.ink,
                  }}
                >
                  Ukuran
                </span>
                <SizePicker
                  sizes={sizes}
                  value={size}
                  onChange={(s) => onSizeChange?.(s)}
                  compact
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <p
          style={{
            margin: "10px 0 8px",
            fontFamily: font.display,
            fontWeight: 700,
            fontSize: "1.1rem",
            color: colors.ink,
          }}
        >
          {formatRp(product.price)}*{product.unit ? ` / ${product.unit}` : ""}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily: font.sans,
              fontWeight: 700,
              fontSize: "0.68rem",
              color: colors.ink,
            }}
          >
            Jumlah
          </span>
          <QuantityStepper value={qty} onChange={onQtyChange} min={0} />
        </div>
      </div>
    </div>
  );
}
