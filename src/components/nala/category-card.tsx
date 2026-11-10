import type { CSSProperties } from "react";
import { colors, font, radius } from "@/lib/design";

/** Kartu kategori di Home "Explore Our Menu": foto bulat + label di bawah. */
export function CategoryCard({
  label,
  image,
  onClick,
  style,
}: {
  label: string;
  image: string;
  onClick: () => void;
  style?: CSSProperties | undefined;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        ...style,
      }}
    >
      <img
        src={image}
        alt={label}
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          objectFit: "cover",
          borderRadius: radius.photo,
          display: "block",
          background: colors.creamSoft,
        }}
      />
      <span
        style={{
          fontFamily: font.display,
          fontWeight: 700,
          fontSize: "0.72rem",
          color: colors.green,
          background: colors.creamSoft,
          borderRadius: radius.chip,
          padding: "5px 4px 6px",
          marginTop: -8,
          marginInline: 4,
          position: "relative",
        }}
      >
        {label}
      </span>
    </button>
  );
}
