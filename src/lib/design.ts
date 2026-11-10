import type { CSSProperties } from "react";

/*
 * Design system NALA COFFEE ROASTORY.
 * Token diambil langsung dari desain Figma "Section 1" (warna disampel
 * dari file desain asli) agar implementasi kode mengikuti desain 1:1.
 */

/** Palet warna brand. */
export const colors = {
  /** Hijau tua brand — header, tombol utama, heading. */
  green: "#083628",
  /** Hover / pressed untuk elemen hijau. */
  greenDeep: "#062A1F",
  /** Krem splash screen & tile kategori. */
  cream: "#E8D8C9",
  /** Krem lembut — chip nonaktif, stepper, latar foto produk. */
  creamSoft: "#EFE5D7",
  /** Karamel — chip kategori aktif. */
  caramel: "#CF8E52",
  /** Aksen gold — subtitle, link, teks deskripsi produk. */
  gold: "#C99C5E",
  /** Latar di luar frame mobile (canvas desain). */
  canvas: "#E4D5C6",
  paper: "#FFFFFF",
  ink: "#1A1A1A",
  muted: "#6F6F6F",
  faint: "#A3A3A3",
  line: "#E9E3DA",
  danger: "#E53E3E",
  star: "#F2B01E",
} as const;

/** Tipografi: slab serif untuk display, Montserrat untuk UI. */
export const font = {
  display: "'Bree Serif', Georgia, serif",
  sans: "'Montserrat', sans-serif",
} as const;

export const radius = {
  card: 16,
  input: 8,
  button: 8,
  chip: 8,
  photo: 10,
  pill: 999,
} as const;

/** Lebar maksimum frame mobile sesuai desain (px). */
export const SCREEN_MAX_WIDTH = 430;

/** Format rupiah gaya desain: "Rp13.000". `withSpace` untuk gaya "Rp 13.000" (keranjang). */
export function formatRp(value: number, withSpace = false): string {
  return `${withSpace ? "Rp " : "Rp"}${value.toLocaleString("id-ID")}`;
}

/** Angka desimal gaya Indonesia: 4.8 -> "4,8". */
export function formatDecimal(value: number): string {
  return value.toFixed(1).replace(".", ",");
}

/** Gaya input form dasar sesuai desain login/register. */
export const inputStyle: CSSProperties = {
  width: "100%",
  border: `1px solid ${colors.line}`,
  background: colors.paper,
  borderRadius: radius.input,
  padding: "17px 16px",
  fontSize: "0.9rem",
  color: colors.ink,
  fontFamily: font.sans,
  outline: "none",
  boxShadow: "0 2px 6px rgba(8, 54, 40, 0.04)",
};
