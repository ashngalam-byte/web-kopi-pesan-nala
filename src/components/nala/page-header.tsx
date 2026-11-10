import { ArrowLeft } from "lucide-react";
import type { CSSProperties } from "react";
import { colors, font } from "@/lib/design";

/** Header halaman: tombol kembali opsional + judul (rata kiri atau tengah). */
export function PageHeader({
  title,
  onBack,
  align = "left",
  style,
}: {
  title?: string | undefined;
  onBack?: (() => void) | undefined;
  align?: "left" | "center";
  style?: CSSProperties | undefined;
}) {
  const centered = align === "center";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "18px 20px 8px",
        position: "relative",
        minHeight: 44,
        ...style,
      }}
    >
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          aria-label="Kembali"
          style={{
            background: "none",
            border: "none",
            padding: 4,
            margin: centered ? 0 : "-4px 10px -4px -4px",
            cursor: "pointer",
            display: "flex",
            color: colors.ink,
            ...(centered ? { position: "absolute", left: 16, zIndex: 1 } : {}),
          }}
        >
          <ArrowLeft size={22} />
        </button>
      )}
      {title && (
        <h1
          style={{
            margin: 0,
            flex: 1,
            fontFamily: font.display,
            fontWeight: 700,
            fontSize: "1.3rem",
            color: colors.ink,
            textAlign: centered ? "center" : "left",
          }}
        >
          {title}
        </h1>
      )}
    </div>
  );
}
