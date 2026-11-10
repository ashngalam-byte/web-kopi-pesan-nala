import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Bell, BookOpen, CreditCard, MapPin, TicketPercent, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import {
  BottomTabBar,
  CategoryCard,
  NalaLogo,
  PrimaryButton,
  Screen,
  SectionHeading,
} from "@/components/nala";
import { colors, font, radius } from "@/lib/design";
import { getCurrentUser } from "@/lib/auth.functions";
import { CATEGORIES } from "@/data/products";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Beranda — Nala Coffee Roastery" },
      { name: "description", content: "Pesan kopi favoritmu dari Nala Coffee Roastery." },
    ],
  }),
  loader: async () => {
    try {
      const user = await getCurrentUser();
      return user ?? { id: "guest", name: "Sahabat Nala", email: "user@nalacoffee.com" };
    } catch {
      return { id: "guest", name: "Sahabat Nala", email: "user@nalacoffee.com" };
    }
  },
  component: HomePage,
});

const EXPLORE_ROW_1 = ["coffee", "non-coffee", "food", "snack"] as const;
const EXPLORE_ROW_2 = ["signature", "manual-brew", "beans"] as const;

/* ══════════════════════════════════════════
   LAYAR 10 — HOME (desain: baris 2, kolom 1)
══════════════════════════════════════════ */
function HomePage() {
  const navigate = useNavigate();
  const user = Route.useLoaderData();

  return (
    <Screen>
      <div style={{ flex: 1, paddingBottom: 90 }}>
        {/* Header: logo + lonceng */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 20px 14px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <NalaLogo variant="row" size={44} />
          </div>
          <button
            type="button"
            aria-label="Notifikasi"
            onClick={() => toast.info("Belum ada notifikasi baru hari ini.")}
            style={{
              background: colors.creamSoft,
              border: "none",
              borderRadius: 999,
              padding: 8,
              cursor: "pointer",
              display: "flex",
              color: colors.green,
            }}
          >
            <Bell size={20} />
          </button>
        </header>

        {/* Hero: Good Coffee, Good Mood. */}
        <div style={{ padding: "4px 20px 0" }}>
          <div style={{ position: "relative", borderRadius: radius.card, overflow: "hidden" }}>
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2087?w=900&q=80"
              alt="Kopi Nala Coffee Roastery"
              style={{ width: "100%", height: 210, objectFit: "cover", display: "block" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, rgba(8,54,40,0.7) 0%, rgba(8,54,40,0.1) 75%)",
              }}
            />
            <div style={{ position: "absolute", left: 18, top: 22, right: 18 }}>
              <p
                style={{
                  margin: 0,
                  fontFamily: font.sans,
                  fontWeight: 800,
                  fontSize: "1.55rem",
                  lineHeight: 1.25,
                  color: "#fff",
                  textShadow: "0 2px 12px rgba(0,0,0,0.35)",
                }}
              >
                Good Coffee,
                <br />
                Good Mood.
              </p>
              <p
                style={{
                  margin: "6px 0 0",
                  fontFamily: font.sans,
                  fontSize: "0.75rem",
                  color: colors.cream,
                  fontWeight: 600,
                  textShadow: "0 1px 4px rgba(0,0,0,0.4)",
                }}
              >
                Nala Coffee Roastery • Specialty Beans
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                void navigate({ to: "/menu/$category", params: { category: "coffee" } })
              }
              style={{
                position: "absolute",
                left: 18,
                bottom: 18,
                background: "#fff",
                border: "none",
                borderRadius: 999,
                padding: "11px 20px",
                fontFamily: font.sans,
                fontWeight: 700,
                fontSize: "0.8rem",
                color: colors.ink,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
            >
              Order Now →
            </button>
          </div>
        </div>

        {/* Quick Menu Icons */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 10,
            padding: "18px 20px 6px",
          }}
        >
          {[
            {
              label: "Menu",
              icon: BookOpen,
              action: () =>
                void navigate({ to: "/menu/$category", params: { category: "coffee" } }),
            },
            { label: "Outlet", icon: MapPin, action: () => void navigate({ to: "/outlet" }) },
            { label: "Keranjang", icon: ShoppingBag, action: () => void navigate({ to: "/cart" }) },
            {
              label: "Detail Kopi",
              icon: TicketPercent,
              action: () =>
                void navigate({
                  to: "/product/$id",
                  params: { id: "nala-coffee-milk" },
                }),
            },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={item.action}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 7,
              }}
            >
              <span
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  maxWidth: 68,
                  borderRadius: 16,
                  background: colors.creamSoft,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: colors.green,
                }}
              >
                <item.icon size={26} strokeWidth={1.8} />
              </span>
              <span
                style={{
                  fontFamily: font.sans,
                  fontWeight: 600,
                  fontSize: "0.68rem",
                  color: colors.ink,
                }}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Explore Our Menu — Baris 1: Coffee, Non-Coffee, Food, Snack */}
        <div style={{ marginTop: 14 }}>
          <SectionHeading
            title="Explore Our Menu"
            subtitle="Pilih kategori menu favorit dari Nala Coffee Roastery."
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 10,
              padding: "12px 20px 4px",
            }}
          >
            {EXPLORE_ROW_1.map((id) => {
              const cat = CATEGORIES.find((c) => c.id === id);
              if (!cat) return null;
              return (
                <CategoryCard
                  key={cat.id}
                  label={cat.label}
                  image={cat.image}
                  onClick={() =>
                    void navigate({ to: "/menu/$category", params: { category: cat.id } })
                  }
                />
              );
            })}
          </div>
        </div>

        {/* Explore Our Menu — Baris 2: Signature, Manual Brew, Beans */}
        <div style={{ marginTop: 18 }}>
          <SectionHeading
            title="Specialty & Beans"
            subtitle="Racikan khas barista dan biji kopi pilihan nusantara."
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 10,
              padding: "12px 20px 4px",
            }}
          >
            {EXPLORE_ROW_2.map((id) => {
              const cat = CATEGORIES.find((c) => c.id === id);
              if (!cat) return null;
              return (
                <CategoryCard
                  key={cat.id}
                  label={cat.label}
                  image={cat.image}
                  onClick={() =>
                    void navigate({ to: "/menu/$category", params: { category: cat.id } })
                  }
                />
              );
            })}
          </div>
        </div>

        {/* Tombol Lihat Menu Kopi */}
        <div style={{ padding: "22px 20px 0" }}>
          <PrimaryButton
            withArrow
            onClick={() => void navigate({ to: "/menu/$category", params: { category: "coffee" } })}
          >
            Lihat Semua Menu
          </PrimaryButton>
        </div>
      </div>

      <BottomTabBar
        active="beranda"
        onSelect={(id) => {
          if (id === "beranda") return;
          if (id === "pesanan") void navigate({ to: "/cart" });
          else if (id === "promo") void navigate({ to: "/outlet" });
          else if (id === "akun") void navigate({ to: "/login" });
        }}
      />
    </Screen>
  );
}
