import type { CSSProperties } from "react";
import { colors, font, radius } from "@/lib/design";

export type ChipItem = { id: string; label: string };

/** Baris chip kategori yang bisa digulir horizontal; chip aktif berwarna karamel. */
export function CategoryChips({
  items,
  value,
  onChange,
  style,
}: {
  items: ChipItem[];
  value: string;
  onChange: (id: string) => void;
  style?: CSSProperties | undefined;
}) {
  return (
    <div
      className="nala-chips"
      style={{
        display: "flex",
        gap: 10,
        overflowX: "auto",
        padding: "6px 20px",
        ...style,
      }}
    >
      {items.map((chip) => {
        const active = chip.id === value;
        return (
          <button
            key={chip.id}
            type="button"
            onClick={() => onChange(chip.id)}
            aria-pressed={active}
            style={{
              flexShrink: 0,
              padding: "11px 20px",
              borderRadius: radius.chip,
              border: "none",
              background: active ? colors.caramel : colors.creamSoft,
              color: active ? "#FFFFFF" : colors.ink,
              fontFamily: font.sans,
              fontWeight: 600,
              fontSize: "0.8rem",
              cursor: "pointer",
              transition: "background .15s",
            }}
          >
            {chip.label}
          </button>
        );
      })}
    </div>
  );
}
