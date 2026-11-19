/**
 * NalaLogo — Logo NALA Coffee Roastory yang bisa di-reuse di seluruh halaman.
 * Menggunakan file nala-logo.png dari /public.
 *
 * Props:
 *   size   — ukuran lebar logo (default: 160px)
 *   color  — "dark" (logo gelap, untuk bg terang) | "light" (untuk bg gelap)
 *             saat ini logo PNG sudah berwarna gelap; gunakan filter CSS untuk invert.
 */

interface NalaLogoProps {
  size?: number;
  className?: string;
}

export function NalaLogo({ size = 160, className = "" }: NalaLogoProps) {
  return (
    <img
      src="/nala-logo.png"
      alt="NALA Coffee Roastory"
      width={size}
      style={{ display: "block" }}
      className={className}
      draggable={false}
    />
  );
}
