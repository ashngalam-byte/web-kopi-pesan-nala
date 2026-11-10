import type { CSSProperties } from "react";
import { colors, font } from "@/lib/design";

/** Judul seksi ala desain: slab serif hijau + subtitle gold. */
export function SectionHeading({
  title,
  subtitle,
  style,
}: {
  title: string;
  subtitle?: string | undefined;
  style?: CSSProperties | undefined;
}) {
  return (
    <div style={{ padding: "0 20px", ...style }}>
      <h2
        style={{
          margin: 0,
          fontFamily: font.display,
          fontWeight: 700,
          fontSize: "1rem",
          color: colors.green,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            margin: "3px 0 0",
            fontFamily: font.sans,
            fontWeight: 600,
            fontSize: "0.72rem",
            color: colors.gold,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
