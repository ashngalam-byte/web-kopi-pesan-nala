import type { CSSProperties } from "react";
import { colors, font } from "@/lib/design";

/** Pill kuantitas krem: tombol kurang, angka, tombol tambah. */
export function QuantityStepper({
  value,
  onChange,
  min = 0,
  max = 99,
  style,
}: {
  value: number;
  onChange: (qty: number) => void;
  min?: number | undefined;
  max?: number | undefined;
  style?: CSSProperties | undefined;
}) {
  const stepBtn: CSSProperties = {
    width: 26,
    height: 26,
    borderRadius: 999,
    border: "none",
    background: "transparent",
    color: colors.ink,
    fontSize: "1rem",
    lineHeight: 1,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  };
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: colors.creamSoft,
        borderRadius: 999,
        padding: 2,
        ...style,
      }}
    >
      <button
        type="button"
        aria-label="Kurangi"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        style={{ ...stepBtn, opacity: value <= min ? 0.35 : 1 }}
      >
        −
      </button>
      <span
        style={{
          minWidth: 36,
          textAlign: "center",
          fontFamily: font.sans,
          fontWeight: 700,
          fontSize: "0.82rem",
          color: colors.ink,
        }}
      >
        {value}
      </span>
      <button
        type="button"
        aria-label="Tambah"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        style={{ ...stepBtn, opacity: value >= max ? 0.35 : 1 }}
      >
        +
      </button>
    </div>
  );
}
