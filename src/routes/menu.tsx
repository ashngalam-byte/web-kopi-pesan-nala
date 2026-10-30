import { createFileRoute, redirect, useRouter, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { getCurrentUser, logoutUser } from "@/lib/auth.functions";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Nala Coffee Roastery" },
      { name: "description", content: "Daftar menu & specialty coffee Nala Coffee Roastery." },
    ],
  }),
  loader: async () => {
    const user = await getCurrentUser();
    if (!user) throw redirect({ to: "/login", replace: true });
    return user;
  },
  component: MenuPage,
});

/* ─────────────────────────────────────── data ─────────────── */

const espressoItems = [
  { name: "Espresso", note: "Bold & intense", price: "28.000", img: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&q=80" },
  { name: "Americano", note: "Espresso + hot water", price: "32.000", img: "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=400&q=80" },
  { name: "Cafe Latte", note: "Espresso + steamed milk", price: "38.000", img: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&q=80" },
  { name: "Cappuccino", note: "Equal parts espresso, milk & foam", price: "38.000", img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80" },
  { name: "Flat White", note: "Double ristretto + velvety milk", price: "42.000", img: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=400&q=80" },
  { name: "Macchiato", note: "Espresso with a touch of foam", price: "35.000", img: "https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=400&q=80" },
];

const manualBrewItems = [
  {
    origin: "Gayo, Aceh", process: "Washed",
    notes: ["Chocolatey", "Caramel", "Brown Sugar"], price: "55.000",
    img: "/bungkusan beans real.jpeg",
  },
  {
    origin: "Toraja, Sulawesi", process: "Natural",
    notes: ["Fruity", "Dark Cherry", "Earthy"], price: "60.000",
    img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=85",
  },
  {
    origin: "Flores, NTT", process: "Honey",
    notes: ["Floral", "Apricot", "Jasmine"], price: "58.000",
    img: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=600&q=85",
  },
  {
    origin: "Kintamani, Bali", process: "Washed",
    notes: ["Citrus", "Vanilla", "Mild"], price: "55.000",
    img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&q=85",
  },
];

const nonCoffeeItems = [
  { name: "Matcha Latte", desc: "Ceremonial grade matcha, oat milk", price: "42.000", img: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&q=80" },
  { name: "Artisan Chocolate", desc: "Dark cacao blend, creamy finish", price: "40.000", img: "https://images.unsplash.com/photo-1517578239113-b03992dcdd25?w=400&q=80" },
  { name: "Iced Artisan Tea", desc: "Cold-brew jasmine & hibiscus blend", price: "35.000", img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80" },
  { name: "Berry Mocktail", desc: "Mixed berries, soda, mint", price: "38.000", img: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=400&q=80" },
  { name: "Yuzu Lemonade", desc: "Fresh yuzu, honey, sparkling water", price: "40.000", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80" },
  { name: "Taro Latte", desc: "Taro paste, steamed milk, vanilla", price: "42.000", img: "https://images.unsplash.com/photo-1598908314732-07113901949e?w=400&q=80" },
];

const pastryItems = [
  { name: "Butter Croissant", desc: "Flaky, buttery, baked fresh daily", price: "32.000", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80" },
  { name: "Cinnamon Roll", desc: "Soft dough, cinnamon sugar, cream cheese glaze", price: "38.000", img: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400&q=80" },
  { name: "Fudgy Brownies", desc: "Dense, rich dark chocolate", price: "28.000", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80" },
  { name: "Banana Loaf", desc: "Moist, lightly spiced, walnut topping", price: "30.000", img: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&q=80" },
];

const pairings = [
  { coffee: "Espresso / Americano", food: "Butter Croissant", price: "52.000", save: "Hemat Rp 8.000" },
  { coffee: "Cafe Latte / Cappuccino", food: "Cinnamon Roll", price: "68.000", save: "Hemat Rp 8.000" },
  { coffee: "Manual Brew", food: "Fudgy Brownies", price: "78.000", save: "Hemat Rp 5.000" },
];

const SLIDES = [
  { id: "cover", label: "Beranda" },
  { id: "espresso", label: "Espresso" },
  { id: "manual", label: "Manual Brew" },
  { id: "noncoffee", label: "Non-Coffee" },
  { id: "pastry", label: "Pastry" },
];

/* ──────────────────────────── shared tokens ────────────────── */
const BG = "#F5F0E8";       // krem terang seperti brand guide
const GREEN = "#083628";     // hijau tua brand
const GOLD = "#B29973";      // tan/gold brand
const WHITE = "#FFFFFF";

/* ──────────────────────────── page ────────────────────────── */

function MenuPage() {
  const user = Route.useLoaderData();
  const router = useRouter();
  const navigate = useNavigate();
  const logout = useServerFn(logoutUser);
  const { queryClient } = Route.useRouteContext();
  const [active, setActive] = useState(0);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await queryClient.cancelQueries();
      queryClient.clear();
      await logout();
      await router.invalidate();
      await navigate({ to: "/login", replace: true });
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <div style={{ background: BG, minHeight: "100vh", fontFamily: "'Montserrat', sans-serif", color: GREEN }}>

      {/* ── Navbar ── */}
      <nav style={{ background: GREEN, borderBottom: `2px solid ${GOLD}` }}
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-3">

        {/* Logo wordmark */}
        <div className="flex flex-col leading-none">
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.6rem", color: WHITE, letterSpacing: "0.15em", lineHeight: 1 }}>
            NALA
          </span>
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.45rem", color: GOLD, letterSpacing: "0.35em", fontWeight: 600 }}>
            COFFEE ROASTORY
          </span>
        </div>

        {/* Tabs */}
        <ul className="flex gap-1">
          {SLIDES.map((s, i) => (
            <li key={s.id}>
              <button
                onClick={() => setActive(i)}
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  padding: "5px 12px",
                  borderRadius: 999,
                  background: active === i ? GOLD : "transparent",
                  color: active === i ? GREEN : GOLD,
                  border: active === i ? "none" : `1px solid ${GOLD}30`,
                  cursor: "pointer",
                  transition: "all .15s",
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>

        {/* User + logout */}
        <div className="flex items-center gap-3">
          <span style={{ fontSize: "0.7rem", color: GOLD }}>{user.name}</span>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            style={{
              display: "flex", alignItems: "center", gap: 5,
              background: "transparent", border: `1px solid ${GOLD}50`,
              color: GOLD, borderRadius: 999, padding: "5px 12px",
              fontSize: "0.65rem", cursor: "pointer",
            }}
          >
            <LogOut size={12} />
            <span className="hidden sm:inline">{loggingOut ? "..." : "Keluar"}</span>
          </button>
        </div>
      </nav>

      {/* ── Slides ── */}
      {active === 0 && <SlideCover />}
      {active === 1 && <SlideEspresso />}
      {active === 2 && <SlideManualBrew />}
      {active === 3 && <SlideNonCoffee />}
      {active === 4 && <SlidePastry />}

      {/* ── Navigation bottom ── */}
      <div className="fixed bottom-5 left-0 right-0 z-50 flex justify-center items-center gap-4">
        <button
          onClick={() => setActive(p => (p === 0 ? SLIDES.length - 1 : p - 1))}
          aria-label="Sebelumnya"
          style={{ width: 40, height: 40, borderRadius: "50%", background: GREEN, border: `1px solid ${GOLD}`, color: GOLD, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex gap-2 items-center">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} aria-label={`Slide ${i + 1}`}
              style={{ height: 7, width: i === active ? 24 : 7, borderRadius: 999, background: i === active ? GOLD : `${GREEN}40`, border: "none", cursor: "pointer", transition: "all .2s" }} />
          ))}
        </div>
        <button
          onClick={() => setActive(p => (p === SLIDES.length - 1 ? 0 : p + 1))}
          aria-label="Berikutnya"
          style={{ width: 40, height: 40, borderRadius: "50%", background: GREEN, border: `1px solid ${GOLD}`, color: GOLD, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   SLIDE 1 — COVER
   Layout: full-screen split — kiri teks brand, kanan foto produk packaging
────────────────────────────────────────────────────────────── */
function SlideCover() {
  return (
    <section style={{ minHeight: "calc(100vh - 57px)", display: "flex", flexDirection: "column" }}>
      {/* Hero split */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr" }} className="max-lg:grid-cols-1">

        {/* Left — brand identity panel */}
        <div style={{ background: GREEN, display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 48px 80px" }}>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.65rem", letterSpacing: "0.4em", color: GOLD, textTransform: "uppercase", marginBottom: 24 }}>
            Est. 2024 · Specialty Coffee
          </p>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(5rem, 12vw, 9rem)", lineHeight: 0.9, color: WHITE, letterSpacing: "0.05em" }}>
              NALA
            </div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(0.7rem, 1.5vw, 1rem)", letterSpacing: "0.5em", color: GOLD, fontWeight: 600, marginTop: 4 }}>
              COFFEE ROASTORY
            </div>
          </div>
          <div style={{ height: 1, width: 64, background: GOLD, margin: "24px 0" }} />
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.85rem", color: `${WHITE}99`, lineHeight: 1.7, maxWidth: 360 }}>
            Specialty coffee dari biji pilihan Indonesia,<br />
            di-roast dengan penuh perhatian untuk setiap cangkir.
          </p>
          {/* tagline script */}
          <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.6rem", color: GOLD, marginTop: 28 }}>
            Good Coffee, Better Days.
          </p>
          {/* feature list */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 32 }}>
            {["100% Arabica", "Single Origin", "Artisanal Roast", "Manual Brew"].map(tag => (
              <span key={tag} style={{ border: `1px solid ${GOLD}60`, borderRadius: 999, padding: "4px 14px", fontSize: "0.65rem", color: GOLD, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right — foto Artboard 4, tampil penuh tanpa crop */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <img
            src="/Artboard 4.png"
            alt="Nala Coffee product branding"
            style={{ width: "100%", display: "block", objectFit: "contain" }}
          />
        </div>
      </div>

      {/* Bottom info bar */}
      <div style={{ background: GOLD, padding: "12px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        {["Daftar Menu", "Espresso & Classic", "Manual Brew", "Non-Coffee", "Pastry & Snacks"].map((item, i) => (
          <span key={item} style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "0.65rem", color: GREEN, letterSpacing: "0.15em", textTransform: "uppercase" }}>
            {i > 0 && <span style={{ marginRight: 12, opacity: 0.4 }}>—</span>}{item}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   SLIDE 2 — ESPRESSO
   Layout: kiri header brand + menu list, kanan foto portrait barista
────────────────────────────────────────────────────────────── */
function SlideEspresso() {
  return (
    <section style={{ minHeight: "calc(100vh - 57px)", display: "grid", gridTemplateColumns: "1fr 320px", paddingBottom: 80 }} className="max-lg:flex max-lg:flex-col">

      {/* Left — header + menu */}
      <div style={{ padding: "48px 48px 0" }}>
        {/* Header brand */}
        <div style={{ background: GREEN, borderRadius: 12, padding: "28px 32px", marginBottom: 28, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -40, bottom: -40, width: 180, height: 180, borderRadius: "50%", border: `1px solid ${GOLD}25` }} />
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.6rem", letterSpacing: "0.4em", color: GOLD, textTransform: "uppercase", marginBottom: 8 }}>— SLIDE 02</p>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.6rem", color: WHITE, lineHeight: 0.9, letterSpacing: "0.06em" }}>
            ESPRESSO &amp;<br />CLASSIC COFFEE
          </div>
          <div style={{ height: 2, background: GOLD, width: 48, margin: "12px 0" }} />
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.72rem", color: `${WHITE}80` }}>
            Dibuat dari biji pilihan, di-roast sempurna untuk setiap cangkir.
          </p>
          <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.1rem", color: GOLD, marginTop: 8 }}>Handcrafted with love</p>
        </div>

        {/* Menu grid dengan foto — card layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {espressoItems.map((item, i) => (
            <div key={item.name} style={{
              background: WHITE,
              border: `1px solid ${GREEN}15`,
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(8,54,40,0.06)",
            }}>
              {/* Foto — aspectRatio agar tidak terpotong */}
              <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
                <img src={item.img} alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              {/* Info */}
              <div style={{ padding: "10px 12px 12px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 2 }}>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "0.5rem", color: GOLD, letterSpacing: "0.1em" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.05rem", letterSpacing: "0.08em", color: GREEN, lineHeight: 1, margin: 0 }}>
                    {item.name.toUpperCase()}
                  </p>
                </div>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.6rem", color: `${GREEN}55`, margin: "3px 0 6px" }}>
                  {item.note}
                </p>
                <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem", color: GREEN, margin: 0 }}>
                  Rp {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.62rem", color: `${GREEN}45`, marginTop: 16, fontStyle: "italic" }}>
          * Hot &amp; iced available · Oat milk +Rp 5.000
        </p>
      </div>

      {/* Right — foto barista portrait, tampil penuh */}
      <div style={{ padding: "48px 48px 0 0", display: "flex", flexDirection: "column", gap: 14 }} className="max-lg:px-8">
        <div style={{ borderRadius: 12, overflow: "hidden" }}>
          <img
            src="/telegram-cloud-photo-size-5-6183883515124977803-y.jpg"
            alt="Barista Nala Coffee"
            style={{ width: "100%", display: "block" }}
          />
        </div>
        <div style={{ background: GREEN, borderRadius: 12, padding: "16px 20px" }}>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem", color: WHITE, letterSpacing: "0.1em" }}>NALA COFFEE ROASTORY</p>
          <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: "0.95rem", color: GOLD, marginTop: 3 }}>Good Coffee, Better Days.</p>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   SLIDE 3 — MANUAL BREW
   Layout: header desain brand (tanpa foto landscape),
   lalu dua kolom: kiri origin cards, kanan foto portrait produk
────────────────────────────────────────────────────────────── */
function SlideManualBrew() {
  return (
    <section style={{ minHeight: "calc(100vh - 57px)", paddingBottom: 80 }}>

      {/* Header — desain brand, bukan foto landscape */}
      <div style={{ background: GREEN, padding: "40px 48px 32px", position: "relative", overflow: "hidden" }}>
        {/* decorative circles */}
        <div style={{ position: "absolute", right: -60, top: -60, width: 280, height: 280, borderRadius: "50%", border: `1px solid ${GOLD}30` }} />
        <div style={{ position: "absolute", right: 20, top: 20, width: 180, height: 180, borderRadius: "50%", border: `1px solid ${GOLD}20` }} />

        <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.6rem", letterSpacing: "0.4em", color: GOLD, textTransform: "uppercase", marginBottom: 12 }}>
          — SLIDE 03
        </p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.8rem,6vw,5rem)", color: WHITE, lineHeight: 0.9, letterSpacing: "0.06em" }}>
              MANUAL BREW<br />&amp; SPECIALTY BEANS
            </div>
            <div style={{ height: 2, background: GOLD, width: 64, margin: "16px 0 12px" }} />
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.78rem", color: `${WHITE}80`, maxWidth: 480 }}>
              Biji kopi single-origin lokal, diseduh dengan metode V60 atau Chemex.
            </p>
          </div>
          {/* Brew method tags */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["V60 Pour-Over", "Chemex", "AeroPress", "French Press"].map(m => (
              <span key={m} style={{ border: `1px solid ${GOLD}70`, borderRadius: 999, padding: "5px 14px", fontSize: "0.62rem", color: GOLD, fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}>{m}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Content: 2 kolom */}
      <div style={{ padding: "32px 48px 0", display: "grid", gridTemplateColumns: "1fr 300px", gap: 24, alignItems: "start" }} className="max-lg:flex max-lg:flex-col">

        {/* Kiri — origin cards */}
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {manualBrewItems.map((bean, i) => (
              <div key={bean.origin} style={{
                background: i % 2 === 0 ? GREEN : WHITE,
                border: `1px solid ${i % 2 === 0 ? GOLD + "30" : GREEN + "15"}`,
                borderRadius: 12,
                overflow: "hidden",
              }}>
                {/* Foto beans — contain agar tidak terpotong */}
                <div style={{ aspectRatio: "4/3", overflow: "hidden", background: "#1a0f08" }}>
                  <img src={bean.img} alt={bean.origin}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
                </div>
                <div style={{ padding: "12px 14px 10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                    <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem", color: i % 2 === 0 ? WHITE : GREEN, letterSpacing: "0.08em", lineHeight: 1, margin: 0 }}>
                      {bean.origin.toUpperCase()}
                    </p>
                    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.9rem", color: i % 2 === 0 ? GOLD : GREEN, flexShrink: 0, marginLeft: 6 }}>
                      Rp {bean.price}
                    </span>
                  </div>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.55rem", color: i % 2 === 0 ? `${GOLD}cc` : `${GREEN}60`, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
                    {bean.process}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {bean.notes.map(note => (
                      <span key={note} style={{
                        background: i % 2 === 0 ? `${GOLD}20` : `${GREEN}10`,
                        borderRadius: 999, padding: "2px 8px",
                        fontSize: "0.55rem",
                        color: i % 2 === 0 ? GOLD : GREEN,
                        fontFamily: "'Montserrat', sans-serif", fontWeight: 600
                      }}>
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Take-home promo banner */}
          <div style={{ marginTop: 16, background: GREEN, borderRadius: 12, padding: "18px 24px", display: "flex", alignItems: "center", gap: 16, border: `1px solid ${GOLD}30` }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.3rem", color: WHITE, letterSpacing: "0.1em" }}>TAKE-HOME BEANS</p>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.68rem", color: GOLD, marginTop: 3 }}>Di-roast segar setiap minggu · 100% Arabica · Aceh Gayo</p>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.7rem", color: GOLD }}>Rp 95.000</p>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.58rem", color: `${WHITE}70` }}>per 100g</p>
            </div>
          </div>
        </div>

        {/* Kanan — foto portrait yang relevan */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Foto packaging beans asli — tampil penuh */}
          <div style={{ borderRadius: 12, overflow: "hidden", border: `2px solid ${GREEN}20` }}>
            <img
              src="/bungkusan beans real.jpeg"
              alt="Nala Coffee Beans packaging"
              style={{ width: "100%", display: "block" }}
            />
          </div>
          {/* Infografis Arabica — relevan karena berisi info beans */}
          <div style={{ borderRadius: 12, overflow: "hidden", border: `2px solid ${GREEN}15` }}>
            <img
              src="/Artboard 3.png"
              alt="What Makes Arabica Special - Nala Coffee"
              style={{ width: "100%", display: "block" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   SLIDE 4 — NON-COFFEE
   Layout: header brand + 2 kolom (menu kiri, foto portrait kanan)
   Foto: Artboard 4 = "Good Coffee Better Days" promo, background krem
────────────────────────────────────────────────────────────── */
function SlideNonCoffee() {
  return (
    <section style={{ minHeight: "calc(100vh - 57px)", display: "grid", gridTemplateColumns: "1fr 300px", paddingBottom: 80 }} className="max-lg:flex max-lg:flex-col">

      {/* Left — header brand + grid menu */}
      <div style={{ padding: "48px 48px 0" }}>
        <div style={{ background: GREEN, borderRadius: 12, padding: "28px 32px", marginBottom: 28, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: -30, top: -30, width: 140, height: 140, borderRadius: "50%", border: `1px solid ${GOLD}20` }} />
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.6rem", letterSpacing: "0.4em", color: GOLD, textTransform: "uppercase", marginBottom: 8 }}>— SLIDE 04</p>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.6rem", color: WHITE, lineHeight: 0.9, letterSpacing: "0.06em" }}>
            NON-COFFEE<br />&amp; SIGNATURES
          </div>
          <div style={{ height: 2, background: GOLD, width: 48, margin: "12px 0" }} />
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.72rem", color: `${WHITE}80` }}>
            Crafted with love — no caffeine needed.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {nonCoffeeItems.map((item, i) => (
            <div key={item.name} style={{
              background: i % 3 === 0 ? GREEN : WHITE,
              border: `1px solid ${i % 3 === 0 ? GOLD + "30" : GREEN + "12"}`,
              borderRadius: 10, overflow: "hidden",
            }}>
              {/* Foto — aspectRatio agar tidak terpotong */}
              <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
                <img src={item.img} alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ padding: "10px 14px 12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                  <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem", letterSpacing: "0.06em", color: i % 3 === 0 ? WHITE : GREEN, lineHeight: 1, margin: 0 }}>
                    {item.name.toUpperCase()}
                  </p>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.85rem", color: i % 3 === 0 ? GOLD : GREEN, flexShrink: 0, marginLeft: 6 }}>
                    Rp {item.price}
                  </span>
                </div>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.6rem", color: i % 3 === 0 ? `${GOLD}cc` : `${GREEN}55`, lineHeight: 1.4, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.62rem", color: `${GREEN}45`, marginTop: 16, fontStyle: "italic" }}>
          * Hot &amp; iced available · Gula dapat disesuaikan
        </p>
      </div>

      {/* Right — Artboard 4 tampil penuh */}
      <div style={{ padding: "48px 48px 0 0", display: "flex", flexDirection: "column", gap: 14 }} className="max-lg:px-8">
        <div style={{ borderRadius: 12, overflow: "hidden" }}>
          <img
            src="/Artboard 4.png"
            alt="Nala Coffee Good Coffee Better Days"
            style={{ width: "100%", display: "block" }}
          />
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   SLIDE 5 — PASTRY
   Layout: header desain brand (hijau), lalu 2 kolom:
   kiri grid pastry + paket hemat, kanan Artboard 6 portrait (foto kafe + makanan)
────────────────────────────────────────────────────────────── */
function SlidePastry() {
  return (
    <section style={{ minHeight: "calc(100vh - 57px)", paddingBottom: 80 }}>

      {/* Header — desain brand */}
      <div style={{ background: GREEN, padding: "36px 48px 28px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -60, top: -60, width: 280, height: 280, borderRadius: "50%", border: `1px solid ${GOLD}25` }} />
        <div style={{ position: "absolute", right: 40, bottom: -20, width: 160, height: 160, borderRadius: "50%", border: `1px solid ${GOLD}15` }} />
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "0.6rem", letterSpacing: "0.4em", color: GOLD, textTransform: "uppercase", marginBottom: 10 }}>— SLIDE 05</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem,5vw,4rem)", color: WHITE, lineHeight: 0.9, letterSpacing: "0.06em" }}>
              PASTRY &amp; SNACKS
            </div>
            <div style={{ height: 2, background: GOLD, width: 56, margin: "12px 0 10px" }} />
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.72rem", color: `${WHITE}80` }}>
              Dipanggang segar setiap pagi — sempurna bersama kopi favoritmu.
            </p>
          </div>
          <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.4rem", color: GOLD }}>Fresh baked every morning</p>
        </div>
      </div>

      {/* Content: 2 kolom */}
      <div style={{ padding: "28px 48px 0", display: "grid", gridTemplateColumns: "1fr 300px", gap: 24, alignItems: "start" }} className="max-lg:flex max-lg:flex-col">

        {/* Kiri — pastry grid + paket hemat */}
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            {pastryItems.map((item, i) => (
              <div key={item.name} style={{
                background: i % 2 === 0 ? GREEN : WHITE,
                border: `1px solid ${i % 2 === 0 ? GOLD + "30" : GREEN + "12"}`,
                borderRadius: 10, overflow: "hidden",
              }}>
                {/* Foto — aspectRatio agar tidak terpotong */}
                <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
                  <img src={item.img} alt={item.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ padding: "12px 14px" }}>
                  <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem", letterSpacing: "0.06em", color: i % 2 === 0 ? WHITE : GREEN, lineHeight: 1, marginBottom: 4 }}>
                    {item.name.toUpperCase()}
                  </p>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.6rem", color: i % 2 === 0 ? `${GOLD}cc` : `${GREEN}55`, lineHeight: 1.4, marginBottom: 8 }}>
                    {item.desc}
                  </p>
                  <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.95rem", color: i % 2 === 0 ? GOLD : GREEN }}>
                    Rp {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Paket Hemat */}
          <div style={{ marginTop: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ flex: 1, height: 1, background: `${GREEN}20` }} />
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.95rem", letterSpacing: "0.12em", color: GREEN, whiteSpace: "nowrap" }}>
                ✦ PAKET HEMAT KOPI &amp; PASTRY
              </span>
              <div style={{ flex: 1, height: 1, background: `${GREEN}20` }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {pairings.map(p => (
                <div key={p.coffee} style={{ background: GREEN, borderRadius: 10, padding: "16px", border: `1px solid ${GOLD}30` }}>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.5rem", color: `${GOLD}80`, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 2 }}>Kopi</p>
                  <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.85rem", color: WHITE, letterSpacing: "0.04em", lineHeight: 1.1 }}>{p.coffee.toUpperCase()}</p>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.5rem", color: `${GOLD}80`, letterSpacing: "0.15em", textTransform: "uppercase", margin: "8px 0 2px" }}>+ Makanan</p>
                  <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.85rem", color: WHITE, letterSpacing: "0.04em", lineHeight: 1.1 }}>{p.food.toUpperCase()}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.1rem", color: GOLD }}>Rp {p.price}</span>
                    <span style={{ background: `${GOLD}20`, borderRadius: 999, padding: "2px 7px", fontSize: "0.52rem", color: GOLD, fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}>{p.save}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kanan — Artboard 6 portrait: foto kafe dengan makanan & kopi di meja, tampil penuh */}
        <div style={{ borderRadius: 12, overflow: "hidden", border: `2px solid ${GREEN}15` }}>
          <img
            src="/Artboard 6.png"
            alt="Nala Coffee Café — Your Table Is Waiting"
            style={{ width: "100%", display: "block" }}
          />
          <div style={{ background: GREEN, padding: "14px 18px" }}>
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem", color: WHITE, letterSpacing: "0.1em" }}>YOUR TABLE IS WAITING</p>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.62rem", color: GOLD, marginTop: 2 }}>Nala Coffee Roastory · 10.00 – 22.00 WIB</p>
          </div>
        </div>
      </div>
    </section>
  );
}
