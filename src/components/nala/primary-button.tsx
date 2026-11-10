import { ArrowRight } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { colors, font, radius } from "@/lib/design";

/** Tombol utama hijau tua sesuai desain (Sign in / Add to Cart / Checkout). */
export function PrimaryButton({
  children,
  onClick,
  type = "button",
  disabled = false,
  withArrow = false,
  style,
}: {
  children: ReactNode;
  onClick?: (() => void) | undefined;
  type?: "button" | "submit";
  disabled?: boolean | undefined;
  withArrow?: boolean | undefined;
  style?: CSSProperties | undefined;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        background: colors.green,
        color: "#FFFFFF",
        border: "none",
        borderRadius: radius.button,
        padding: "15px 20px",
        fontFamily: font.display,
        fontSize: "1rem",
        letterSpacing: "0.02em",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.7 : 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        WebkitAppearance: "none",
        ...style,
      }}
    >
      {children}
      {withArrow && <ArrowRight size={18} />}
    </button>
  );
}
