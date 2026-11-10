import { colors, font } from "@/lib/design";

/**
 * Logo NALA Coffee Roastory.
 * - `stacked`: file logo asli utuh (splash, login, register).
 * - `row`: komposisi horizontal untuk header app — ikon biji kopi dipotong
 *   dari bagian atas file logo asli, dilengkapi wordmark NALA.
 */
export function NalaLogo({
  variant = "stacked",
  size = 140,
}: {
  variant?: "stacked" | "row";
  size?: number;
}) {
  if (variant === "row") {
    const bean = Math.round(size * 0.52);
    return (
      <div style={{ display: "flex", alignItems: "center", gap: Math.max(8, size * 0.1) }}>
        <img
          src="/nala-logo.png"
          alt=""
          aria-hidden="true"
          style={{
            width: bean,
            height: bean,
            objectFit: "cover",
            objectPosition: "50% 0%",
            flexShrink: 0,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span
            style={{
              fontFamily: font.display,
              fontWeight: 700,
              fontSize: Math.round(size * 0.34),
              letterSpacing: "0.08em",
              color: colors.green,
            }}
          >
            NALA
          </span>
          <span
            style={{
              fontFamily: font.sans,
              fontWeight: 600,
              fontSize: Math.max(7, Math.round(size * 0.085)),
              letterSpacing: "0.32em",
              color: colors.green,
              marginTop: 3,
              whiteSpace: "nowrap",
            }}
          >
            COFFEE ROASTORY
          </span>
        </div>
      </div>
    );
  }
  return (
    <img
      src="/nala-logo.png"
      alt="NALA Coffee Roastory"
      style={{ width: size, objectFit: "contain" }}
    />
  );
}
