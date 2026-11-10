import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Bell,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Eye,
  EyeOff,
  MapPin,
  MessageCircle,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Star,
  TicketPercent,
  Trash2,
  Wallet,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from "lucide-react";
import { NalaLogo, SocialLoginRow } from "@/components/nala";
import { colors, font, formatDecimal, formatRp, radius } from "@/lib/design";
import { CATEGORIES, PRODUCTS, productsByCategory } from "@/data/products";

export const Route = createFileRoute("/showcase")({
  head: () => ({
    meta: [
      { title: "Papan Desain 23 Layar HP — Nala Coffee Roastery" },
      {
        name: "description",
        content:
          "Tampilan lengkap 23 layar HP berurutan dari atas samping kiri ke bawah samping kanan sesuai gambar desain.",
      },
    ],
  }),
  loader: () => null,
  component: ShowcasePage,
});

/* ══════════════════════════════════════════════════════════════════
   FRAME HP MINIATUR MOCKUP UNTUK PAPAN DESAIN (CANVAS)
══════════════════════════════════════════════════════════════════ */
function PhoneCard({
  screenNumber,
  row,
  col,
  title,
  subtitle,
  bg = colors.paper,
  children,
  linkTo,
}: {
  screenNumber: number;
  row: number;
  col: number;
  title: string;
  subtitle: string;
  bg?: string;
  children: React.ReactNode;
  linkTo: string;
}) {
  const isDark = bg === colors.green || bg === "#083628";
  const statusColor = isDark ? "#fff" : colors.ink;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexShrink: 0,
        width: 320,
      }}
    >
      {/* Label Nomor & Judul Layar di atas HP */}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
          padding: "0 4px",
          fontFamily: font.sans,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              background: colors.green,
              color: "#fff",
              fontSize: "0.72rem",
              fontWeight: 800,
              padding: "2px 8px",
              borderRadius: 6,
            }}
          >
            #{screenNumber}
          </span>
          <span
            style={{
              fontSize: "0.82rem",
              fontWeight: 700,
              color: colors.ink,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: 190,
            }}
          >
            {title}
          </span>
        </div>
        <Link
          to={linkTo as never}
          style={{
            fontSize: "0.68rem",
            color: colors.gold,
            fontWeight: 700,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          Uji HP &gt;
        </Link>
      </div>

      {/* Frame Smartphone Realistis */}
      <div
        style={{
          width: 320,
          height: 640,
          background: bg,
          borderRadius: 36,
          border: "8px solid #1E2022",
          outline: "1px solid rgba(0,0,0,0.12)",
          boxShadow:
            "0 18px 40px -10px rgba(8, 54, 40, 0.28), 0 0 0 1px rgba(255,255,255,0.08) inset",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          userSelect: "none",
        }}
      >
        {/* Status Bar (9:41, Notch, Baterai) */}
        <div
          style={{
            height: 32,
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: statusColor,
            fontSize: "0.72rem",
            fontWeight: 600,
            fontFamily: "-apple-system, sans-serif",
            flexShrink: 0,
            zIndex: 10,
          }}
        >
          <span>9:41</span>
          <div
            style={{
              width: 66,
              height: 14,
              background: isDark ? "rgba(255,255,255,0.18)" : "#000",
              borderRadius: 999,
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: "0.65rem" }}>5G</span>
            <div
              style={{
                width: 16,
                height: 9,
                border: `1px solid ${statusColor}`,
                borderRadius: 2.5,
                padding: 1,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: statusColor,
                  borderRadius: 1,
                }}
              />
            </div>
          </div>
        </div>

        {/* Konten Layar HP (bisa digulir dalam frame miniatur) */}
        <div
          className="nala-chips"
          style={{
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </div>

        {/* Home Indicator Bawah */}
        <div
          style={{
            padding: "6px 0 6px",
            display: "flex",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 90,
              height: 4,
              borderRadius: 999,
              background: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   HALAMAN SHOWCASE PAPAN DESAIN 23 LAYAR (3 BARIS)
══════════════════════════════════════════════════════════════════ */
function ShowcasePage() {
  const navigate = useNavigate();
  const [zoom, setZoom] = useState(1);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#DED3C4",
        display: "flex",
        flexDirection: "column",
        fontFamily: font.sans,
      }}
    >
      {/* Top Banner Toolbar */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: colors.green,
          color: "#fff",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <NalaLogo size={36} />
          <div>
            <h1
              style={{
                margin: 0,
                fontFamily: font.display,
                fontSize: "1.35rem",
                fontWeight: 700,
                letterSpacing: "0.02em",
              }}
            >
              Papan Desain 23 Layar HP — Nala Coffee Roastery
            </h1>
            <p
              style={{
                margin: "2px 0 0",
                fontSize: "0.75rem",
                color: colors.cream,
              }}
            >
              Urut dari atas samping kiri sampai ke bawah gambar samping kanan (3 Baris: Onboarding,
              Menu, Checkout)
            </p>
          </div>
        </div>

        {/* Kontrol Navigasi & Zoom */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Zoom Buttons */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              background: "rgba(255,255,255,0.15)",
              padding: "4px 8px",
              borderRadius: 8,
            }}
          >
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.6, z - 0.1))}
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                padding: 4,
                display: "flex",
              }}
              title="Perkecil"
            >
              <ZoomOut size={16} />
            </button>
            <span
              style={{ fontSize: "0.75rem", fontWeight: 700, minWidth: 42, textAlign: "center" }}
            >
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(1.3, z + 0.1))}
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                padding: 4,
                display: "flex",
              }}
              title="Perbesar"
            >
              <ZoomIn size={16} />
            </button>
            <button
              type="button"
              onClick={() => setZoom(1)}
              style={{
                background: "none",
                border: "none",
                color: colors.cream,
                cursor: "pointer",
                fontSize: "0.7rem",
                fontWeight: 700,
                padding: "2px 4px",
              }}
            >
              100%
            </button>
          </div>

          {/* Tombol Buka Mode Uji 1 HP */}
          <Link
            to="/login"
            style={{
              background: colors.caramel,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "8px 14px",
              fontSize: "0.8rem",
              fontWeight: 700,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span>📱 Buka Mode Simulasi HP</span>
          </Link>
        </div>
      </header>

      {/* Konten Papan Desain (Kanvas 3 Baris) */}
      <main
        style={{
          flex: 1,
          padding: "32px 24px 64px",
          display: "flex",
          flexDirection: "column",
          gap: 40,
          transform: `scale(${zoom})`,
          transformOrigin: "top center",
          transition: "transform .15s ease-out",
        }}
      >
        {/* ══════════════════════════════════════════════════════════
            BARIS 1: ONBOARDING & AUTENTIKASI (9 LAYAR HP)
        ══════════════════════════════════════════════════════════ */}
        <section>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
              padding: "0 8px",
            }}
          >
            <span
              style={{
                background: colors.green,
                color: "#fff",
                fontSize: "0.8rem",
                fontWeight: 800,
                padding: "4px 12px",
                borderRadius: 8,
              }}
            >
              BARIS 1 (ATAS)
            </span>
            <h2
              style={{
                margin: 0,
                fontFamily: font.display,
                fontSize: "1.4rem",
                color: colors.ink,
              }}
            >
              Onboarding & Autentikasi Pengguna (Layar 1 sampai 9)
            </h2>
            <span style={{ fontSize: "0.8rem", color: colors.muted }}>
              • Gulir horizontal untuk melihat seluruh 9 HP
            </span>
          </div>

          <div
            className="nala-chips"
            style={{
              display: "flex",
              gap: 20,
              overflowX: "auto",
              paddingBottom: 16,
            }}
          >
            {/* HP 1: Splash Screen */}
            <PhoneCard
              screenNumber={1}
              row={1}
              col={1}
              title="Splash Screen"
              subtitle="Layar Pembuka"
              bg={colors.cream}
              linkTo="/"
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 20,
                  textAlign: "center",
                }}
              >
                <NalaLogo size={110} />
                <p
                  style={{
                    marginTop: 24,
                    fontFamily: font.sans,
                    fontSize: "0.68rem",
                    letterSpacing: "0.28em",
                    color: colors.green,
                    fontWeight: 700,
                  }}
                >
                  GOOD COFFEE, BETTER DAYS
                </p>
              </div>
            </PhoneCard>

            {/* HP 2: Login */}
            <PhoneCard
              screenNumber={2}
              row={1}
              col={2}
              title="Log in to your Account"
              subtitle="Layar Masuk"
              linkTo="/login"
            >
              <div
                style={{ padding: "16px 18px", display: "flex", flexDirection: "column", flex: 1 }}
              >
                <div style={{ display: "flex", justifyContent: "center", paddingBottom: 12 }}>
                  <NalaLogo size={70} />
                </div>
                <h3
                  style={{
                    margin: "0 0 12px",
                    fontFamily: font.display,
                    fontSize: "1.05rem",
                    color: colors.ink,
                    textAlign: "center",
                  }}
                >
                  Log in to your Account
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <input
                    type="text"
                    value="user@nalacoffee.com"
                    readOnly
                    style={{
                      padding: "10px 12px",
                      borderRadius: 8,
                      border: `1px solid ${colors.line}`,
                      fontSize: "0.78rem",
                    }}
                  />
                  <div style={{ position: "relative" }}>
                    <input
                      type="password"
                      value="password123"
                      readOnly
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: 8,
                        border: `1px solid ${colors.line}`,
                        fontSize: "0.78rem",
                      }}
                    />
                    <Eye
                      size={14}
                      style={{ position: "absolute", right: 10, top: 12, opacity: 0.5 }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.68rem",
                      color: colors.muted,
                    }}
                  >
                    <span>✓ Remember me</span>
                    <span style={{ color: colors.gold }}>Forgot Password?</span>
                  </div>
                  <button
                    type="button"
                    style={{
                      background: colors.green,
                      color: "#fff",
                      border: "none",
                      padding: "10px",
                      borderRadius: 8,
                      fontWeight: 700,
                      fontSize: "0.82rem",
                    }}
                  >
                    Masuk
                  </button>
                </div>
                <div style={{ marginTop: 12 }}>
                  <SocialLoginRow />
                </div>
                <p
                  style={{
                    marginTop: "auto",
                    textAlign: "center",
                    fontSize: "0.7rem",
                    color: colors.muted,
                  }}
                >
                  Don't have an account?{" "}
                  <span style={{ color: colors.caramel, fontWeight: 700 }}>Sign Up</span>
                </p>
              </div>
            </PhoneCard>

            {/* HP 3: Registrasi */}
            <PhoneCard
              screenNumber={3}
              row={1}
              col={3}
              title="Registrasi Akun Baru"
              subtitle="Layar Daftar"
              linkTo="/register"
            >
              <div
                style={{ padding: "14px 18px", display: "flex", flexDirection: "column", flex: 1 }}
              >
                <div style={{ display: "flex", justifyContent: "center", paddingBottom: 8 }}>
                  <NalaLogo size={65} />
                </div>
                <h3
                  style={{
                    margin: "0 0 10px",
                    fontFamily: font.display,
                    fontSize: "1.05rem",
                    color: colors.ink,
                    textAlign: "center",
                  }}
                >
                  Registrasi Akun Baru
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <input
                    type="text"
                    value="Sahabat Nala"
                    readOnly
                    placeholder="Nama Lengkap"
                    style={{
                      padding: "8px 12px",
                      borderRadius: 8,
                      border: `1px solid ${colors.line}`,
                      fontSize: "0.75rem",
                    }}
                  />
                  <input
                    type="text"
                    value="user@nalacoffee.com"
                    readOnly
                    placeholder="Email"
                    style={{
                      padding: "8px 12px",
                      borderRadius: 8,
                      border: `1px solid ${colors.line}`,
                      fontSize: "0.75rem",
                    }}
                  />
                  <input
                    type="password"
                    value="••••••••"
                    readOnly
                    placeholder="Kata Sandi"
                    style={{
                      padding: "8px 12px",
                      borderRadius: 8,
                      border: `1px solid ${colors.line}`,
                      fontSize: "0.75rem",
                    }}
                  />
                  <input
                    type="password"
                    value="••••••••"
                    readOnly
                    placeholder="Konfirmasi Sandi"
                    style={{
                      padding: "8px 12px",
                      borderRadius: 8,
                      border: `1px solid ${colors.line}`,
                      fontSize: "0.75rem",
                    }}
                  />
                  <button
                    type="button"
                    style={{
                      background: colors.green,
                      color: "#fff",
                      border: "none",
                      padding: "9px",
                      borderRadius: 8,
                      fontWeight: 700,
                      fontSize: "0.82rem",
                    }}
                  >
                    Daftar
                  </button>
                </div>
                <div style={{ marginTop: 8 }}>
                  <SocialLoginRow />
                </div>
              </div>
            </PhoneCard>

            {/* HP 4: Verifikasi Telepon */}
            <PhoneCard
              screenNumber={4}
              row={1}
              col={4}
              title="Verifikasi Telepon"
              subtitle="Input Nomor HP"
              linkTo="/verify-phone"
            >
              <div
                style={{
                  padding: "20px 18px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 1,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: 20,
                    background: colors.creamSoft,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    margin: "18px 0 16px",
                  }}
                >
                  <MessageCircle size={38} color={colors.green} />
                  <div
                    style={{
                      position: "absolute",
                      right: -4,
                      bottom: -4,
                      width: 28,
                      height: 28,
                      borderRadius: 999,
                      background: colors.green,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px solid #fff",
                    }}
                  >
                    <ShieldCheck size={14} color="#fff" />
                  </div>
                </div>
                <h3 style={{ margin: "0 0 6px", fontFamily: font.display, fontSize: "1.1rem" }}>
                  Verifikasi Nomor Telepon
                </h3>
                <p
                  style={{
                    margin: "0 0 20px",
                    fontSize: "0.72rem",
                    color: colors.muted,
                    lineHeight: 1.4,
                  }}
                >
                  Masukkan nomor telepon Anda untuk verifikasi akun
                </p>
                <div style={{ display: "flex", gap: 6, width: "100%", marginBottom: 16 }}>
                  <div
                    style={{
                      padding: "10px",
                      borderRadius: 8,
                      border: `1px solid ${colors.line}`,
                      background: colors.paper,
                      fontSize: "0.78rem",
                      fontWeight: 700,
                    }}
                  >
                    🇮🇩 +62
                  </div>
                  <input
                    type="text"
                    value="812 3456 7890"
                    readOnly
                    style={{
                      flex: 1,
                      padding: "10px",
                      borderRadius: 8,
                      border: `1px solid ${colors.line}`,
                      fontSize: "0.78rem",
                    }}
                  />
                </div>
                <button
                  type="button"
                  style={{
                    width: "100%",
                    background: colors.green,
                    color: "#fff",
                    border: "none",
                    padding: "11px",
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: "0.85rem",
                  }}
                >
                  Kirim Kode OTP
                </button>
              </div>
            </PhoneCard>

            {/* HP 5: Masukkan OTP */}
            <PhoneCard
              screenNumber={5}
              row={1}
              col={5}
              title="Masukkan Kode OTP"
              subtitle="6 Digit OTP: 1 3 2 5 4 8"
              linkTo="/verify-otp"
            >
              <div
                style={{
                  padding: "24px 18px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 1,
                  textAlign: "center",
                }}
              >
                <div style={{ height: 20 }} />
                <h3 style={{ margin: "0 0 8px", fontFamily: font.display, fontSize: "1.15rem" }}>
                  Masukkan Kode OTP
                </h3>
                <p style={{ margin: "0 0 22px", fontSize: "0.72rem", color: colors.muted }}>
                  Kode sudah dikirim ke{" "}
                  <strong style={{ color: colors.ink }}>+62 812 3456 7890</strong>
                </p>

                {/* 6 Digit Boxes sesuai gambar desain: 1 3 2 5 4 8 */}
                <div
                  style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 16 }}
                >
                  {["1", "3", "2", "5", "4", "8"].map((num, i) => (
                    <div
                      key={i}
                      style={{
                        width: 38,
                        height: 44,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: colors.paper,
                        border: `1.5px solid ${colors.line}`,
                        borderRadius: 8,
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: colors.ink,
                      }}
                    >
                      {num}
                    </div>
                  ))}
                </div>

                <p style={{ fontSize: "0.7rem", color: colors.muted, margin: "0 0 24px" }}>
                  Kirim Ulang dalam 00:30
                </p>

                <button
                  type="button"
                  style={{
                    width: "100%",
                    background: colors.green,
                    color: "#fff",
                    border: "none",
                    padding: "11px",
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    marginTop: "auto",
                  }}
                >
                  Verifikasi
                </button>
              </div>
            </PhoneCard>

            {/* HP 6: Akun Terverifikasi */}
            <PhoneCard
              screenNumber={6}
              row={1}
              col={6}
              title="Akun Berhasil Diverifikasi!"
              subtitle="Verifikasi Sukses"
              linkTo="/verified"
            >
              <div
                style={{
                  padding: "36px 20px 20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 1,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 999,
                    background: "#4CAF50",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 24px rgba(76, 175, 80, 0.35)",
                    marginBottom: 20,
                  }}
                >
                  <Check size={52} color="#fff" strokeWidth={3.5} />
                </div>
                <h3
                  style={{
                    margin: "0 0 10px",
                    fontFamily: font.display,
                    fontSize: "1.2rem",
                    lineHeight: 1.3,
                  }}
                >
                  Akun Anda
                  <br />
                  Berhasil Diverifikasi!
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.75rem",
                    color: colors.ink,
                    lineHeight: 1.5,
                    fontWeight: 600,
                  }}
                >
                  Sekarang Anda dapat menikmati pengalaman terbaik di Nala Coffee Roastery
                </p>
                <button
                  type="button"
                  style={{
                    width: "100%",
                    background: colors.green,
                    color: "#fff",
                    border: "none",
                    padding: "11px",
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    marginTop: "auto",
                  }}
                >
                  Lanjut
                </button>
              </div>
            </PhoneCard>

            {/* HP 7: Onboarding 1 */}
            <PhoneCard
              screenNumber={7}
              row={1}
              col={7}
              title="Onboarding 1"
              subtitle="Discover your perfect cup"
              bg={colors.cream}
              linkTo="/onboarding?step=1"
            >
              <div
                style={{
                  padding: "12px 14px 16px",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80"
                  alt="Onboarding 1"
                  style={{ width: "100%", height: 260, objectFit: "cover", borderRadius: 16 }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 6,
                    margin: "14px 0 8px",
                  }}
                >
                  <span
                    style={{ width: 16, height: 6, borderRadius: 999, background: colors.green }}
                  />
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 999,
                      background: "rgba(8,54,40,0.25)",
                    }}
                  />
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 999,
                      background: "rgba(8,54,40,0.25)",
                    }}
                  />
                </div>
                <h4
                  style={{
                    margin: "0 0 4px",
                    fontFamily: font.display,
                    fontSize: "1.05rem",
                    textAlign: "center",
                  }}
                >
                  Discover your perfect cup
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.68rem",
                    color: colors.muted,
                    textAlign: "center",
                    lineHeight: 1.4,
                  }}
                >
                  Explore specialty coffee, from rich espresso to smooth brews and beans.
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "auto",
                    paddingTop: 10,
                  }}
                >
                  <span style={{ fontSize: "0.75rem", color: colors.muted, fontWeight: 700 }}>
                    Skip
                  </span>
                  <button
                    type="button"
                    style={{
                      background: colors.green,
                      color: "#fff",
                      border: "none",
                      padding: "6px 16px",
                      borderRadius: 8,
                      fontSize: "0.78rem",
                      fontWeight: 700,
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </PhoneCard>

            {/* HP 8: Onboarding 2 */}
            <PhoneCard
              screenNumber={8}
              row={1}
              col={8}
              title="Onboarding 2"
              subtitle="Coffee, crafted for you"
              bg={colors.cream}
              linkTo="/onboarding?step=2"
            >
              <div
                style={{
                  padding: "12px 14px 16px",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80"
                  alt="Onboarding 2"
                  style={{ width: "100%", height: 260, objectFit: "cover", borderRadius: 16 }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 6,
                    margin: "14px 0 8px",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 999,
                      background: "rgba(8,54,40,0.25)",
                    }}
                  />
                  <span
                    style={{ width: 16, height: 6, borderRadius: 999, background: colors.green }}
                  />
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 999,
                      background: "rgba(8,54,40,0.25)",
                    }}
                  />
                </div>
                <h4
                  style={{
                    margin: "0 0 4px",
                    fontFamily: font.display,
                    fontSize: "1.05rem",
                    textAlign: "center",
                  }}
                >
                  Coffee, crafted for you
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.68rem",
                    color: colors.muted,
                    textAlign: "center",
                    lineHeight: 1.4,
                  }}
                >
                  Disajikan dengan penuh ketelitian oleh barista berpengalaman.
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "auto",
                    paddingTop: 10,
                  }}
                >
                  <span style={{ fontSize: "0.75rem", color: colors.muted, fontWeight: 700 }}>
                    Skip
                  </span>
                  <button
                    type="button"
                    style={{
                      background: colors.green,
                      color: "#fff",
                      border: "none",
                      padding: "6px 16px",
                      borderRadius: 8,
                      fontSize: "0.78rem",
                      fontWeight: 700,
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </PhoneCard>

            {/* HP 9: Onboarding 3 */}
            <PhoneCard
              screenNumber={9}
              row={1}
              col={9}
              title="Onboarding 3"
              subtitle="From Aceh Gayo to your cup"
              bg={colors.cream}
              linkTo="/onboarding?step=3"
            >
              <div
                style={{
                  padding: "12px 14px 16px",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <img
                  src="/bungkusan beans real.jpeg"
                  alt="Onboarding 3 Beans"
                  style={{ width: "100%", height: 260, objectFit: "cover", borderRadius: 16 }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 6,
                    margin: "14px 0 8px",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 999,
                      background: "rgba(8,54,40,0.25)",
                    }}
                  />
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 999,
                      background: "rgba(8,54,40,0.25)",
                    }}
                  />
                  <span
                    style={{ width: 16, height: 6, borderRadius: 999, background: colors.green }}
                  />
                </div>
                <h4
                  style={{
                    margin: "0 0 4px",
                    fontFamily: font.display,
                    fontSize: "1.05rem",
                    textAlign: "center",
                  }}
                >
                  From Aceh Gayo to your cup
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.68rem",
                    color: colors.muted,
                    textAlign: "center",
                    lineHeight: 1.4,
                  }}
                >
                  Biji kopi single-origin pilihan langsung dari petani lokal terbaik Indonesia.
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "auto",
                    paddingTop: 10,
                  }}
                >
                  <span style={{ fontSize: "0.75rem", color: colors.muted, fontWeight: 700 }}>
                    Skip
                  </span>
                  <button
                    type="button"
                    style={{
                      background: colors.green,
                      color: "#fff",
                      border: "none",
                      padding: "6px 16px",
                      borderRadius: 8,
                      fontSize: "0.78rem",
                      fontWeight: 700,
                    }}
                  >
                    Mulai
                  </button>
                </div>
              </div>
            </PhoneCard>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            BARIS 2: BERANDA & 7 KATEGORI MENU (8 LAYAR HP)
        ══════════════════════════════════════════════════════════ */}
        <section>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
              padding: "0 8px",
            }}
          >
            <span
              style={{
                background: colors.caramel,
                color: "#fff",
                fontSize: "0.8rem",
                fontWeight: 800,
                padding: "4px 12px",
                borderRadius: 8,
              }}
            >
              BARIS 2 (TENGAH)
            </span>
            <h2
              style={{
                margin: 0,
                fontFamily: font.display,
                fontSize: "1.4rem",
                color: colors.ink,
              }}
            >
              Beranda & 7 Menu Kategori (Layar 10 sampai 17)
            </h2>
            <span style={{ fontSize: "0.8rem", color: colors.muted }}>
              • Gulir horizontal untuk melihat seluruh 8 HP
            </span>
          </div>

          <div
            className="nala-chips"
            style={{
              display: "flex",
              gap: 20,
              overflowX: "auto",
              paddingBottom: 16,
            }}
          >
            {/* HP 10: Home Screen */}
            <PhoneCard
              screenNumber={10}
              row={2}
              col={1}
              title="Beranda / Home"
              subtitle="Good Coffee, Good Mood"
              linkTo="/home"
            >
              <div
                style={{ padding: "10px 14px", flex: 1, display: "flex", flexDirection: "column" }}
              >
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <NalaLogo variant="row" size={32} />
                  <Bell size={16} />
                </div>
                {/* Hero Banner */}
                <div
                  style={{
                    position: "relative",
                    borderRadius: 12,
                    overflow: "hidden",
                    height: 110,
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2087?w=600&q=80"
                    alt="Hero"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(90deg, rgba(8,54,40,0.7) 0%, rgba(8,54,40,0.1) 80%)",
                      padding: 10,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ color: "#fff", fontWeight: 800, fontSize: "0.9rem" }}>
                      Good Coffee,
                      <br />
                      Good Mood.
                    </span>
                  </div>
                </div>

                {/* Categories Grid */}
                <p style={{ margin: "10px 0 6px", fontWeight: 700, fontSize: "0.75rem" }}>
                  Explore Our Menu
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
                  {CATEGORIES.slice(0, 4).map((c) => (
                    <div
                      key={c.id}
                      style={{
                        background: colors.creamSoft,
                        borderRadius: 8,
                        padding: 6,
                        textAlign: "center",
                        fontSize: "0.62rem",
                        fontWeight: 700,
                      }}
                    >
                      <img
                        src={c.image}
                        alt={c.label}
                        style={{
                          width: "100%",
                          height: 36,
                          objectFit: "cover",
                          borderRadius: 6,
                          marginBottom: 3,
                        }}
                      />
                      <span>{c.label}</span>
                    </div>
                  ))}
                </div>

                {/* Tab bar mini */}
                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: 8,
                    borderTop: `1px solid ${colors.line}`,
                    display: "flex",
                    justifyContent: "space-around",
                    fontSize: "0.6rem",
                    color: colors.green,
                    fontWeight: 700,
                  }}
                >
                  <span>🏠 Beranda</span>
                  <span style={{ color: colors.muted }}>📜 Menu</span>
                  <span style={{ color: colors.muted }}>🛍️ Keranjang</span>
                  <span style={{ color: colors.muted }}>👤 Profil</span>
                </div>
              </div>
            </PhoneCard>

            {/* HP 11 - 17: 7 Kategori Menu */}
            {[
              { num: 11, cat: "coffee", title: "Coffee Menu" },
              { num: 12, cat: "non-coffee", title: "Drink Non-Coffee Menu" },
              { num: 13, cat: "food", title: "Food Menu" },
              { num: 14, cat: "snack", title: "Snack Menu" },
              { num: 15, cat: "signature", title: "Signature Coffee Menu", isSpecial: true },
              { num: 16, cat: "manual-brew", title: "Manual Brew Menu" },
              { num: 17, cat: "beans", title: "Beans Coffee Menu" },
            ].map((menuItem) => {
              const catData = CATEGORIES.find((c) => c.id === menuItem.cat)!;
              const items = productsByCategory(menuItem.cat as any).slice(0, 4);
              const cardBg = menuItem.isSpecial ? "#EFE7DC" : colors.paper;

              return (
                <PhoneCard
                  key={menuItem.num}
                  screenNumber={menuItem.num}
                  row={2}
                  col={menuItem.num - 9}
                  title={menuItem.title}
                  subtitle={catData?.subtitle ?? "Menu Kategori"}
                  bg={cardBg}
                  linkTo={`/menu/${menuItem.cat}`}
                >
                  <div
                    style={{
                      padding: "8px 12px 12px",
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                      <ArrowLeft size={14} />
                      <span
                        style={{ fontFamily: font.display, fontSize: "0.95rem", fontWeight: 700 }}
                      >
                        {menuItem.title}
                      </span>
                    </div>

                    {/* Category Chip Bar */}
                    <div style={{ display: "flex", gap: 4, overflowX: "hidden", marginBottom: 8 }}>
                      {CATEGORIES.slice(0, 3).map((c) => (
                        <span
                          key={c.id}
                          style={{
                            padding: "3px 8px",
                            borderRadius: 6,
                            background: c.id === menuItem.cat ? colors.caramel : colors.creamSoft,
                            color: c.id === menuItem.cat ? "#fff" : colors.ink,
                            fontSize: "0.62rem",
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {c.label}
                        </span>
                      ))}
                    </div>

                    {/* 2-Column Product Grid */}
                    <div
                      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, flex: 1 }}
                    >
                      {items.map((prod) => (
                        <div
                          key={prod.id}
                          style={{
                            background: colors.paper,
                            borderRadius: 8,
                            padding: 6,
                            border: `1px solid ${colors.line}`,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                        >
                          <img
                            src={prod.image}
                            alt={prod.name}
                            style={{
                              width: "100%",
                              height: 55,
                              objectFit: "cover",
                              borderRadius: 6,
                            }}
                          />
                          <p
                            style={{
                              margin: "4px 0 2px",
                              fontWeight: 700,
                              fontSize: "0.7rem",
                              color: colors.green,
                            }}
                          >
                            {prod.name}
                          </p>
                          <p
                            style={{
                              margin: "0 0 4px",
                              fontSize: "0.68rem",
                              fontWeight: 700,
                              color: colors.ink,
                            }}
                          >
                            {formatRp(prod.price)}*
                          </p>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <span style={{ fontSize: "0.58rem", color: colors.muted }}>
                              Ukuran M
                            </span>
                            <span
                              style={{
                                width: 16,
                                height: 16,
                                borderRadius: 4,
                                background: colors.green,
                                color: "#fff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "0.7rem",
                              }}
                            >
                              +
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      style={{
                        marginTop: 8,
                        background: colors.green,
                        color: "#fff",
                        border: "none",
                        padding: "8px",
                        borderRadius: 8,
                        fontWeight: 700,
                        fontSize: "0.78rem",
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </PhoneCard>
              );
            })}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            BARIS 3: DETAIL PRODUK, OUTLET & PEMBAYARAN (6 LAYAR HP)
        ══════════════════════════════════════════════════════════ */}
        <section>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
              padding: "0 8px",
            }}
          >
            <span
              style={{
                background: colors.gold,
                color: "#fff",
                fontSize: "0.8rem",
                fontWeight: 800,
                padding: "4px 12px",
                borderRadius: 8,
              }}
            >
              BARIS 3 (BAWAH)
            </span>
            <h2
              style={{
                margin: 0,
                fontFamily: font.display,
                fontSize: "1.4rem",
                color: colors.ink,
              }}
            >
              Pemesanan, Outlet & Pembayaran (Layar 18 sampai 23)
            </h2>
            <span style={{ fontSize: "0.8rem", color: colors.muted }}>
              • Gulir horizontal untuk melihat seluruh 6 HP
            </span>
          </div>

          <div
            className="nala-chips"
            style={{
              display: "flex",
              gap: 20,
              overflowX: "auto",
              paddingBottom: 16,
            }}
          >
            {/* HP 18: Detail Produk */}
            <PhoneCard
              screenNumber={18}
              row={3}
              col={1}
              title="Detail Produk"
              subtitle="Nala Coffee Milk"
              linkTo="/product/nala-coffee-milk"
            >
              <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <img
                  src="https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&q=80"
                  alt="Nala Coffee Milk"
                  style={{ width: "100%", height: 180, objectFit: "cover" }}
                />
                <div
                  style={{
                    padding: "12px 14px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: font.display,
                      fontSize: "1.2rem",
                      color: colors.green,
                    }}
                  >
                    Nala Coffee Milk
                  </h3>
                  <p style={{ margin: "4px 0", fontSize: "1.05rem", fontWeight: 700 }}>
                    Rp 13.000*
                  </p>
                  <p style={{ margin: "0 0 6px", fontSize: "0.72rem", color: colors.muted }}>
                    ⭐ 4.8 (1.200 ulasan)
                  </p>
                  <p
                    style={{
                      margin: "0 0 10px",
                      fontSize: "0.68rem",
                      color: colors.muted,
                      lineHeight: 1.4,
                    }}
                  >
                    Perpaduan kopi pilihan dan susu creamy dengan gula aren organik khas Nala.
                  </p>
                  <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                    {["S", "M", "L"].map((sz) => (
                      <span
                        key={sz}
                        style={{
                          padding: "4px 10px",
                          borderRadius: 6,
                          background: sz === "M" ? colors.green : colors.creamSoft,
                          color: sz === "M" ? "#fff" : colors.ink,
                          fontSize: "0.72rem",
                          fontWeight: 700,
                        }}
                      >
                        {sz}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    style={{
                      marginTop: "auto",
                      background: colors.green,
                      color: "#fff",
                      border: "none",
                      padding: "10px",
                      borderRadius: 8,
                      fontWeight: 700,
                      fontSize: "0.82rem",
                    }}
                  >
                    Pilih Outlet
                  </button>
                </div>
              </div>
            </PhoneCard>

            {/* HP 19: Pilih Outlet */}
            <PhoneCard
              screenNumber={19}
              row={3}
              col={2}
              title="Pilih Outlet"
              subtitle="Map & Outlet"
              linkTo="/outlet"
            >
              <div
                style={{ padding: "10px 14px", flex: 1, display: "flex", flexDirection: "column" }}
              >
                <h4
                  style={{
                    margin: "0 0 8px",
                    fontFamily: font.display,
                    fontSize: "1.05rem",
                    textAlign: "center",
                  }}
                >
                  Pilih Outlet
                </h4>
                <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                  <button
                    type="button"
                    style={{
                      flex: 1,
                      padding: "6px",
                      background: colors.green,
                      color: "#fff",
                      border: "none",
                      borderRadius: 999,
                      fontSize: "0.72rem",
                      fontWeight: 700,
                    }}
                  >
                    Pick Up
                  </button>
                  <button
                    type="button"
                    style={{
                      flex: 1,
                      padding: "6px",
                      background: colors.paper,
                      border: `1px solid ${colors.line}`,
                      borderRadius: 999,
                      fontSize: "0.72rem",
                      fontWeight: 700,
                    }}
                  >
                    Delivery
                  </button>
                </div>
                {/* Map Preview */}
                <div
                  style={{
                    height: 160,
                    borderRadius: 10,
                    overflow: "hidden",
                    border: `1px solid ${colors.line}`,
                    marginBottom: 10,
                  }}
                >
                  <iframe
                    title="Peta"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=112.6226%2C-7.9766%2C112.6426%2C-7.9566&layer=mapnik&marker=-7.9666%2C112.6326"
                    style={{ width: "100%", height: "100%", border: "none" }}
                  />
                </div>
                {/* Outlet Card */}
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    padding: 8,
                    borderRadius: 10,
                    background: colors.creamSoft,
                    alignItems: "center",
                  }}
                >
                  <img
                    src="/nala-store.jpg"
                    alt="Store"
                    style={{ width: 50, height: 50, borderRadius: 8, objectFit: "cover" }}
                  />
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: "0.8rem" }}>
                      Nala Coffee Roastery
                    </p>
                    <p style={{ margin: "2px 0 0", fontSize: "0.68rem", color: colors.muted }}>
                      Jl. Surabaya No.12
                    </p>
                    <p
                      style={{
                        margin: "2px 0 0",
                        fontSize: "0.68rem",
                        color: colors.green,
                        fontWeight: 700,
                      }}
                    >
                      1.2 Km
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  style={{
                    marginTop: "auto",
                    background: colors.green,
                    color: "#fff",
                    border: "none",
                    padding: "10px",
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: "0.82rem",
                  }}
                >
                  Pilih Outlet
                </button>
              </div>
            </PhoneCard>

            {/* HP 20: Keranjang */}
            <PhoneCard
              screenNumber={20}
              row={3}
              col={3}
              title="Keranjang"
              subtitle="Pesanan Anda"
              linkTo="/cart"
            >
              <div
                style={{ padding: "12px 14px", flex: 1, display: "flex", flexDirection: "column" }}
              >
                <h4
                  style={{
                    margin: "0 0 10px",
                    fontFamily: font.display,
                    fontSize: "1.1rem",
                    textAlign: "center",
                  }}
                >
                  Keranjang
                </h4>
                {/* Item card */}
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    padding: "8px 0",
                    borderBottom: `1px solid ${colors.line}`,
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&q=80"
                    alt="Nala Milk"
                    style={{ width: 56, height: 56, borderRadius: 8, objectFit: "cover" }}
                  />
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: 700,
                        fontSize: "0.82rem",
                        color: colors.green,
                      }}
                    >
                      Nala Coffee Milk
                    </p>
                    <p style={{ margin: "2px 0 0", fontSize: "0.68rem", color: colors.muted }}>
                      Size: M
                    </p>
                    <p style={{ margin: "4px 0 0", fontWeight: 700, fontSize: "0.82rem" }}>
                      Rp 13.000*
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700 }}>1x</span>
                    <Trash2 size={14} color={colors.danger} />
                  </div>
                </div>

                {/* Subtotal & Total */}
                <div
                  style={{
                    marginTop: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    fontSize: "0.72rem",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Subtotal</span>
                    <span style={{ fontWeight: 700 }}>Rp 13.000</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Biaya Layanan</span>
                    <span style={{ fontWeight: 700 }}>Rp 2.000</span>
                  </div>
                  <div style={{ height: 1, background: colors.line, margin: "4px 0" }} />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.9rem",
                      fontWeight: 800,
                      color: colors.green,
                    }}
                  >
                    <span>Total</span>
                    <span>Rp 15.000</span>
                  </div>
                </div>

                <button
                  type="button"
                  style={{
                    marginTop: 12,
                    background: colors.green,
                    color: "#fff",
                    border: "none",
                    padding: "10px",
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: "0.82rem",
                  }}
                >
                  Checkout →
                </button>
              </div>
            </PhoneCard>

            {/* HP 21: Checkout */}
            <PhoneCard
              screenNumber={21}
              row={3}
              col={4}
              title="Checkout"
              subtitle="Alamat & Pembayaran"
              linkTo="/checkout"
            >
              <div
                style={{
                  padding: "10px 14px",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  fontSize: "0.7rem",
                }}
              >
                <h4
                  style={{
                    margin: "0 0 8px",
                    fontFamily: font.display,
                    fontSize: "1.05rem",
                    textAlign: "center",
                  }}
                >
                  Checkout
                </h4>
                {/* Alamat */}
                <p style={{ margin: "0 0 3px", fontWeight: 700 }}>Alamat Pengiriman</p>
                <div
                  style={{
                    padding: 6,
                    borderRadius: 6,
                    background: colors.creamSoft,
                    marginBottom: 6,
                  }}
                >
                  📍 Jl. Surabaya No.12 (Outlet Pick Up)
                </div>

                {/* Metode Pengiriman */}
                <p style={{ margin: "4px 0 3px", fontWeight: 700 }}>Metode Pengiriman</p>
                <div
                  style={{
                    padding: 6,
                    borderRadius: 6,
                    border: `1px solid ${colors.green}`,
                    marginBottom: 6,
                  }}
                >
                  ✓ Pick Up di Outlet (Gratis)
                </div>

                {/* Metode Pembayaran */}
                <p style={{ margin: "4px 0 3px", fontWeight: 700 }}>Metode Pembayaran</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 8 }}>
                  <div
                    style={{
                      padding: 5,
                      borderRadius: 6,
                      background: `${colors.green}15`,
                      fontWeight: 700,
                    }}
                  >
                    ✓ QRIS (GoPay, OVO, Dana)
                  </div>
                  <div style={{ padding: 5, borderRadius: 6, border: `1px solid ${colors.line}` }}>
                    Transfer Bank / VA
                  </div>
                </div>

                {/* Ringkasan */}
                <div
                  style={{
                    marginTop: "auto",
                    borderTop: `1px solid ${colors.line}`,
                    paddingTop: 6,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Total Pembayaran</span>
                    <span style={{ fontWeight: 800, fontSize: "0.85rem", color: colors.green }}>
                      Rp 15.000
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  style={{
                    marginTop: 8,
                    background: colors.green,
                    color: "#fff",
                    border: "none",
                    padding: "9px",
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: "0.8rem",
                  }}
                >
                  Bayar Sekarang
                </button>
              </div>
            </PhoneCard>

            {/* HP 22: Pembayaran Berhasil */}
            <PhoneCard
              screenNumber={22}
              row={3}
              col={5}
              title="Pembayaran Berhasil!"
              subtitle="Order #ANG0123456"
              linkTo="/payment-success"
            >
              <div
                style={{
                  padding: "16px 14px 10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 1,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 65,
                    height: 65,
                    borderRadius: 999,
                    background: "#4CAF50",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 6px 18px rgba(76, 175, 80, 0.35)",
                    marginBottom: 10,
                  }}
                >
                  <Check size={38} color="#fff" strokeWidth={3.5} />
                </div>
                <h4 style={{ margin: "0 0 2px", fontFamily: font.display, fontSize: "1.1rem" }}>
                  Pembayaran Berhasil!
                </h4>
                <p style={{ margin: "0 0 4px", fontSize: "0.75rem", fontWeight: 700 }}>
                  Payment Successful!
                </p>
                <p style={{ margin: "0 0 8px", fontSize: "0.68rem", color: colors.muted }}>
                  Pesanan Anda sedang diproses
                </p>

                <p style={{ margin: "6px 0 0", fontSize: "0.68rem", color: colors.muted }}>
                  Nomor Pesanan
                </p>
                <p
                  style={{
                    margin: "2px 0 10px",
                    fontSize: "1.1rem",
                    fontWeight: 800,
                    color: colors.green,
                  }}
                >
                  #ANG0123456
                </p>

                <button
                  type="button"
                  style={{
                    width: "100%",
                    background: colors.green,
                    color: "#fff",
                    border: "none",
                    padding: "9px",
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    marginBottom: 10,
                  }}
                >
                  Lacak Pesanan (Track Order)
                </button>

                <img
                  src="https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&q=80"
                  alt="Coffee"
                  style={{
                    width: "100%",
                    height: 110,
                    objectFit: "cover",
                    borderRadius: 8,
                    marginTop: "auto",
                  }}
                />
              </div>
            </PhoneCard>

            {/* HP 23: Terima Kasih */}
            <PhoneCard
              screenNumber={23}
              row={3}
              col={6}
              title="Terima Kasih!"
              subtitle="Layar Terakhir"
              bg={colors.green}
              linkTo="/thank-you"
            >
              <div
                style={{
                  padding: "16px 14px 12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 1,
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                <NalaLogo size={42} style={{ filter: "brightness(0) invert(1)" }} />
                <h4 style={{ margin: "10px 0 2px", fontFamily: font.display, fontSize: "1.2rem" }}>
                  Terima Kasih!
                </h4>
                <p
                  style={{
                    margin: "0 0 8px",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: colors.cream,
                  }}
                >
                  Thank You!
                </p>
                <p style={{ margin: "0 0 4px", fontSize: "0.72rem", lineHeight: 1.4 }}>
                  Sampai jumpa di pesanan berikutnya!
                  <br />
                  <span style={{ opacity: 0.8 }}>See you on your next order!</span>
                </p>

                <div
                  style={{
                    height: 1,
                    background: "rgba(255,255,255,0.2)",
                    width: "80%",
                    margin: "10px 0",
                  }}
                />

                <p
                  style={{
                    margin: 0,
                    fontWeight: 800,
                    fontSize: "0.72rem",
                    letterSpacing: "0.08em",
                  }}
                >
                  NALA COFFEE ROASTERY
                </p>

                <img
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2087?w=600&q=80"
                  alt="Latte"
                  style={{
                    width: "100%",
                    height: 120,
                    objectFit: "cover",
                    borderRadius: 8,
                    margin: "10px 0",
                  }}
                />

                <button
                  type="button"
                  style={{
                    width: "100%",
                    background: colors.caramel,
                    color: "#fff",
                    border: "none",
                    padding: "9px",
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    marginTop: "auto",
                  }}
                >
                  Kembali ke Beranda
                </button>
              </div>
            </PhoneCard>
          </div>
        </section>
      </main>
    </div>
  );
}
