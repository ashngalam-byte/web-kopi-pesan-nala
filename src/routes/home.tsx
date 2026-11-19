import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { CATEGORIES } from "@/data/products";
import { InstallBanner } from "@/components/pwa/InstallApp";

export const Route = createFileRoute("/home")({
  component: HomePage,
});

const PRIMARY = "#0E3A23";
const CREAM = "#E6D9CC";

/* ── Bottom Nav ──────────────────────────────────────── */
function BottomNav({ active }: { active: string }) {
  const navigate = useNavigate();
  const items = [
    {
      key: "home",
      label: "Beranda",
      to: "/home",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 12L12 3l9 9v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9z"
            fill={active === "home" ? PRIMARY : "#bbb"}
          />
        </svg>
      ),
    },
    {
      key: "order",
      label: "Pesanan",
      to: "/home",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="3" width="16" height="18" rx="2" stroke={active === "order" ? PRIMARY : "#bbb"} strokeWidth="2" fill="none" />
          <path d="M8 7h8M8 11h8M8 15h5" stroke={active === "order" ? PRIMARY : "#bbb"} strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      key: "promo",
      label: "Promo",
      to: "/promo",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 2H4a2 2 0 00-2 2v5l9 9 7-7-9-9zM6.5 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
            fill={active === "promo" ? PRIMARY : "#bbb"}
          />
        </svg>
      ),
    },
    {
      key: "account",
      label: "Akun",
      to: "/home",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" fill={active === "account" ? PRIMARY : "#bbb"} />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={active === "account" ? PRIMARY : "#bbb"} strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      ),
    },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: 430,
        background: "#fff",
        borderTop: "1px solid #eee",
        display: "flex",
        justifyContent: "space-around",
        padding: "10px 0 calc(14px + env(safe-area-inset-bottom))",
        zIndex: 100,
      }}
    >
      {items.map((item) => (
        <button
          key={item.key}
          onClick={() => {
            if (item.key !== "home") {
              toast("Segera hadir", {
                description: `${item.label} akan tersedia di versi berikutnya.`,
              });
              return;
            }
            navigate({ to: "/home" });
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0 8px",
          }}
        >
          {item.icon}
          <span
            style={{
              fontSize: 10,
              fontFamily: "'Montserrat', sans-serif",
              color: active === item.key ? PRIMARY : "#bbb",
              fontWeight: active === item.key ? 700 : 400,
            }}
          >
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
}

/* ── Home Page ───────────────────────────────────────── */
function HomePage() {
  const navigate = useNavigate();

  const section1Cats = [
    { id: "non-coffee", label: "Non-Coffee", image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&q=80" },
    { id: "coffee", label: "Coffee", image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80" },
    { id: "food", label: "Food", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80" },
    { id: "snack", label: "Snack", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80" },
  ];

  const section2Cats = [
    { id: "signature", label: "Signature", image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&q=80" },
    { id: "manual-brew", label: "Manual Brew", image: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=400&q=80" },
    { id: "beans", label: "Beans", image: "/bungkusan beans real.jpeg" },
  ];

  const quickMenuItems = [
    {
      key: "menu",
      label: "Menu",
      to: "/menu",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 6h18M3 12h18M3 18h18" stroke={PRIMARY} strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      key: "outlet",
      label: "Outlet",
      to: "/outlet",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" fill={PRIMARY} />
        </svg>
      ),
    },
    {
      key: "promo",
      label: "Promo",
      to: "/promo",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 2H4a2 2 0 00-2 2v5l9 9 7-7-9-9zM6.5 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" fill={PRIMARY} />
        </svg>
      ),
    },
    {
      key: "loyalty",
      label: "Loyalty",
      to: "/loyalty",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="6" width="20" height="12" rx="2" stroke={PRIMARY} strokeWidth="2" fill="none" />
          <circle cx="8" cy="12" r="2" fill={PRIMARY} />
          <path d="M12 10h6M12 14h4" stroke={PRIMARY} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className="nala-phone-frame"
      style={{
        width: "100%",
        maxWidth: 430,
        minHeight: "100vh",
        backgroundColor: "#faf8f5",
        fontFamily: "'Montserrat', sans-serif",
        paddingBottom: "calc(80px + env(safe-area-inset-bottom))",
        overflowX: "hidden",
      }}
    >
      {/* ── Header ────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "18px 20px 12px",
          backgroundColor: "#fff",
        }}
      >
        <img src="/nala-logo.png" alt="NALA" style={{ height: 40, objectFit: "contain" }} />
        <button
          style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
          aria-label="Notifikasi"
          onClick={() =>
            toast("Segera hadir", { description: "Notifikasi akan tersedia di versi berikutnya." })
          }
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V4a1 1 0 00-2 0v1.083A6 6 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              stroke={PRIMARY}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* ── Banner install PWA (hanya bila belum terpasang) ── */}
      <InstallBanner />

      {/* ── Banner ────────────────────────────────────── */}
      <div style={{ padding: "12px 16px 0" }}>
        <div
          style={{
            borderRadius: 20,
            background: "linear-gradient(135deg, #8B5E3C 0%, #6B4226 100%)",
            padding: "24px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            overflow: "hidden",
            position: "relative",
            minHeight: 140,
          }}
        >
          <div style={{ flex: 1, zIndex: 1 }}>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, margin: "0 0 2px", fontWeight: 500 }}>
              Good Coffee,
            </p>
            <h2
              style={{
                color: "#fff",
                fontSize: 26,
                fontWeight: 800,
                margin: "0 0 16px",
                lineHeight: 1.2,
              }}
            >
              Good Mood.
            </h2>
            <button
              onClick={() => navigate({ to: "/menu", search: { cat: "coffee" } })}
              style={{
                background: "#fff",
                color: "#6B4226",
                border: "none",
                borderRadius: 10,
                padding: "9px 18px",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Order Now →
            </button>
          </div>
          {/* Latte photo clipped on right */}
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              overflow: "hidden",
              flexShrink: 0,
              marginLeft: 12,
              border: "3px solid rgba(255,255,255,0.3)",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80"
              alt="Latte"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>

      {/* ── Quick Menu 4 ikon ─────────────────────────── */}
      <div style={{ padding: "20px 16px 4px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 10,
          }}
        >
          {quickMenuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                if (item.key === "promo" || item.key === "loyalty") {
                  toast("Segera hadir", {
                    description: `${item.label} akan tersedia di versi berikutnya.`,
                  });
                  return;
                }
                navigate({ to: item.to as "/" });
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  backgroundColor: CREAM,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#444" }}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Section: Explore Our Menu (4 kolom) ──────── */}
      <div style={{ padding: "20px 16px 4px" }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: PRIMARY, margin: "0 0 4px" }}>
          Explore Our Menu
        </h3>
        <p style={{ fontSize: 12, color: "#777", margin: "0 0 12px" }}>
          Temukan berbagai pilihan kopi dan minuman favoritmu.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {section1Cats.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate({ to: "/menu", search: { cat: cat.id } })}
              style={{
                position: "relative",
                borderRadius: 14,
                overflow: "hidden",
                aspectRatio: "1",
                border: "none",
                cursor: "pointer",
                padding: 0,
                background: "#ccc",
              }}
            >
              <img
                src={cat.image}
                alt={cat.label}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  bottom: 5,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  color: "#F5D060",
                  fontSize: 9,
                  fontWeight: 700,
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Section: Explore Our Menu (3 kolom) ──────── */}
      <div style={{ padding: "16px 16px 4px" }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: PRIMARY, margin: "0 0 4px" }}>
          Explore Our Menu
        </h3>
        <p style={{ fontSize: 12, color: "#777", margin: "0 0 12px" }}>
          Temukan berbagai pilihan kopi dan minuman favoritmu.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          {section2Cats.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate({ to: "/menu", search: { cat: cat.id } })}
              style={{
                position: "relative",
                borderRadius: 14,
                overflow: "hidden",
                aspectRatio: "1",
                border: "none",
                cursor: "pointer",
                padding: 0,
                background: "#ccc",
              }}
            >
              <img
                src={cat.image}
                alt={cat.label}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  bottom: 5,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  color: "#F5D060",
                  fontSize: 9,
                  fontWeight: 700,
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Bottom Nav ────────────────────────────────── */}
      <BottomNav active="home" />
    </div>
  );
}
