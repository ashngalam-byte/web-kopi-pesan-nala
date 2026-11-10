import { type CSSProperties, type ReactNode } from "react";
import { SCREEN_MAX_WIDTH, colors } from "@/lib/design";
import { FlowNavigator } from "./flow-navigator";

/**
 * Selubung halaman mobile sesuai desain mockup smartphone:
 * - Pada layar desktop: Tampil sebagai smartphone elegan dengan bezel, status bar (9:41, sinyal, baterai, dynamic island) dan home indicator.
 * - Pada perangkat mobile nyata: Tampil penuh 100% layar (responsif tanpa bezel ganda).
 * - Dilengkapi Navigator Alur 1-23 untuk menguji urutan dari awal sampai akhir.
 */
export function Screen({
  children,
  bg = colors.paper,
  style,
  hideStatusBar = false,
  hideHomeIndicator = false,
}: {
  children: ReactNode;
  bg?: string;
  style?: CSSProperties | undefined;
  hideStatusBar?: boolean;
  hideHomeIndicator?: boolean;
}) {
  // Cek apakah background termasuk kategori warna gelap
  const isDarkBg =
    bg === colors.green ||
    bg === colors.greenDeep ||
    bg === "#083628" ||
    bg === "#062A1F" ||
    bg === "#1A1A1A" ||
    bg === "#000000";

  const statusColor = isDarkBg ? "#FFFFFF" : colors.ink;

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: colors.canvas,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "0 0 72px 0",
        position: "relative",
      }}
    >
      {/* Wrapper Smartphone Device Mockup */}
      <div
        className="nala-phone-frame"
        style={{
          width: "100%",
          maxWidth: SCREEN_MAX_WIDTH,
          minHeight: "100dvh",
          background: bg,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 25px 60px -15px rgba(8, 54, 40, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.06)",
          transition: "box-shadow .2s ease",
          ...style,
        }}
      >
        {/* Status Bar Ala Mobile (9:41, Dynamic Island, Sinyal & Baterai) */}
        {!hideStatusBar && (
          <div
            style={{
              height: 44,
              padding: "0 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              zIndex: 30,
              flexShrink: 0,
              userSelect: "none",
              color: statusColor,
            }}
          >
            {/* Waktu 9:41 */}
            <span
              style={{
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: "0.88rem",
                letterSpacing: "-0.01em",
              }}
            >
              9:41
            </span>

            {/* Dynamic Island / Notch Speaker */}
            <div
              style={{
                width: 90,
                height: 20,
                background: isDarkBg ? "rgba(255,255,255,0.15)" : "#000000",
                borderRadius: 999,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: 8,
              }}
            >
              {/* Kamera depan kecil */}
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 999,
                  background: isDarkBg ? "rgba(255,255,255,0.3)" : "#1a1a1a",
                }}
              />
            </div>

            {/* Ikon Sinyal, WiFi, dan Baterai */}
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              {/* Sinyal Baris */}
              <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
                <rect x="0.5" y="7.5" width="2" height="3" rx="0.5" fill={statusColor} />
                <rect x="4" y="5.5" width="2" height="5" rx="0.5" fill={statusColor} />
                <rect x="7.5" y="3.5" width="2" height="7" rx="0.5" fill={statusColor} />
                <rect x="11" y="1" width="2" height="9.5" rx="0.5" fill={statusColor} />
              </svg>

              {/* Ikon Wifi */}
              <svg width="14" height="11" viewBox="0 0 14 11" fill={statusColor}>
                <path d="M7 9a1.2 1.2 0 100 2.4A1.2 1.2 0 007 9zm-3.8-2.6a5.5 5.5 0 017.6 0 .8.8 0 001.1-1.1 7.1 7.1 0 00-9.8 0 .8.8 0 101.1 1.1zm-2.4-2.4a8.9 8.9 0 0112.4 0 .8.8 0 101.1-1.1 10.5 10.5 0 00-14.6 0 .8.8 0 101.1 1.1z" />
              </svg>

              {/* Baterai */}
              <div
                style={{
                  width: 21,
                  height: 11,
                  border: `1.5px solid ${statusColor}`,
                  borderRadius: 3.5,
                  padding: 1.5,
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: statusColor,
                    borderRadius: 1.5,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    right: -3.5,
                    top: 2.5,
                    width: 2,
                    height: 4,
                    background: statusColor,
                    borderTopRightRadius: 1,
                    borderBottomRightRadius: 1,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Konten Halaman */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>{children}</div>

        {/* Home Indicator Bawah Ala iOS */}
        {!hideHomeIndicator && (
          <div
            style={{
              padding: "10px 0 8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              userSelect: "none",
            }}
          >
            <div
              style={{
                width: 134,
                height: 5,
                borderRadius: 999,
                background: isDarkBg ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)",
              }}
            />
          </div>
        )}
      </div>

      {/* Navigator Alur 1-23 untuk Pengujian Urutan Lengkap */}
      <FlowNavigator />
    </div>
  );
}
