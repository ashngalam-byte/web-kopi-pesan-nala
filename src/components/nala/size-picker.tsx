import type { CSSProperties } from "react";
import { colors, font, radius } from "@/lib/design";

/** Tombol pil ukuran: kompak (huruf polos) untuk kartu menu, pil penuh untuk detail produk. */
export function SizePicker({
  sizes,
  value,
  onChange,
  compact = false,
  style,
}: {
  sizes: Array<"S" | "M" | "L">;
  value: "S" | "M" | "L" | null;
  onChange: (size: "S" | "M" | "L") => void;
  compact?: boolean | undefined;
  style?: CSSProperties | undefined;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: compact ? 12 : 8,
        flex: compact ? undefined : 1,
        ...style,
      }}
    >
      {sizes.map((s) => {
        const active = s === value;
        if (compact) {
          return (
            <button
              key={s}
              type="button"
              onClick={() => onChange(s)}
              aria-pressed={active}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                fontFamily: font.sans,
                fontSize: "0.62rem",
                fontWeight: active ? 800 : 500,
                color: active ? colors.green : colors.ink,
              }}
            >
              {s}
            </button>
          );
        }
        return (
          <button
            key={s}
            type="button"
            onClick={() => onChange(s)}
            aria-pressed={active}
            style={{
              flex: 1,
              padding: "10px 0",
              borderRadius: radius.pill,
              border: "none",
              cursor: "pointer",
              background: active ? colors.green : "transparent",
              color: active ? "#FFFFFF" : colors.ink,
              fontFamily: font.sans,
              fontWeight: 700,
              fontSize: "0.85rem",
            }}
          >
            {s}
          </button>
        );
      })}
    </div>
  );
}
