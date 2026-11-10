import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, MapPin } from "lucide-react";
import { PrimaryButton, Screen } from "@/components/nala";
import { colors, font } from "@/lib/design";

export const Route = createFileRoute("/outlet")({
  head: () => ({
    meta: [
      { title: "Pilih Outlet — Nala Coffee Roastery" },
      { name: "description", content: "Pilih outlet Nala Coffee Roastery." },
    ],
  }),
  loader: () => null,
  component: OutletPage,
});

/* ══════════════════════════════════════════
   LAYAR 19 — PILIH OUTLET
   (desain: baris 3, kolom 2)
══════════════════════════════════════════ */
function OutletPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"pickup" | "delivery">("pickup");

  return (
    <Screen>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 20px 24px" }}>
        {/* Header Outlet */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "18px 0 16px",
            position: "relative",
          }}
        >
          <button
            type="button"
            aria-label="Kembali ke Detail Produk"
            onClick={() =>
              void navigate({ to: "/product/$id", params: { id: "nala-coffee-milk" } })
            }
            style={{
              position: "absolute",
              left: 0,
              background: "none",
              border: "none",
              padding: 4,
              cursor: "pointer",
              display: "flex",
              color: colors.ink,
            }}
          >
            <ArrowLeft size={22} />
          </button>
          <h1
            style={{
              margin: 0,
              fontFamily: font.display,
              fontWeight: 700,
              fontSize: "1.45rem",
              color: colors.ink,
            }}
          >
            Pilih Outlet
          </h1>
        </div>


        {/* Toggle Pick Up / Delivery */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
          {(["pickup", "delivery"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              style={{
                padding: "13px 0",
                borderRadius: 999,
                border: mode === m ? "none" : `1px solid ${colors.line}`,
                background: mode === m ? colors.green : colors.paper,
                color: mode === m ? "#fff" : colors.ink,
                fontFamily: font.sans,
                fontWeight: 700,
                fontSize: "0.9rem",
                cursor: "pointer",
                boxShadow:
                  mode === m ? "0 4px 12px rgba(8,54,40,0.25)" : "0 2px 6px rgba(8,54,40,0.05)",
                transition: "all .2s ease",
              }}
            >
              {m === "pickup" ? "Pick Up" : "Delivery"}
            </button>
          ))}
        </div>

        {/* Peta Lokasi Outlet (OpenStreetMap) */}
        <div
          style={{
            borderRadius: 16,
            overflow: "hidden",
            border: `1px solid ${colors.line}`,
            height: 240,
            background: colors.creamSoft,
            boxShadow: "0 2px 8px rgba(8,54,40,0.06)",
          }}
        >
          <iframe
            title="Peta lokasi Nala Coffee Roastery"
            src="https://www.openstreetmap.org/export/embed.html?bbox=112.6226%2C-7.9766%2C112.6426%2C-7.9566&layer=mapnik&marker=-7.9666%2C112.6326"
            style={{ width: "100%", height: "100%", border: "none" }}
            loading="lazy"
          />
        </div>

        {/* Kartu Outlet Terpilih Sesuai Desain */}
        <div
          style={{
            display: "flex",
            gap: 14,
            marginTop: 18,
            alignItems: "center",
            padding: "14px",
            background: colors.paper,
            borderRadius: 16,
            border: `1px solid ${colors.line}`,
            boxShadow: "0 2px 8px rgba(8,54,40,0.05)",
          }}
        >
          <img
            src="/nala-store.jpg"
            alt="Outlet Nala Coffee Roastery"
            style={{
              width: 88,
              height: 88,
              borderRadius: 12,
              objectFit: "cover",
              flexShrink: 0,
              background: colors.creamSoft,
            }}
          />
          <div style={{ minWidth: 0, flex: 1 }}>
            <p
              style={{
                margin: 0,
                fontFamily: font.display,
                fontWeight: 700,
                fontSize: "1.08rem",
                color: colors.ink,
              }}
            >
              Nala Coffee Roastery
            </p>
            <p
              style={{
                margin: "5px 0 0",
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontFamily: font.sans,
                fontSize: "0.8rem",
                color: colors.muted,
              }}
            >
              <MapPin size={14} color={colors.green} />
              Jl. Surabaya No.12
            </p>
            <p
              style={{
                margin: "5px 0 0",
                fontFamily: font.sans,
                fontWeight: 700,
                fontSize: "0.8rem",
                color: colors.green,
              }}
            >
              1.2 Km • Buka 07:00 - 22:00
            </p>
          </div>
        </div>

        {mode === "delivery" && (
          <p
            style={{
              margin: "14px 0 0",
              fontFamily: font.sans,
              fontSize: "0.78rem",
              color: colors.gold,
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Pengiriman langsung ke alamat Anda (ongkir Rp 5.000 saat checkout).
          </p>
        )}

        <div style={{ marginTop: "auto", paddingTop: 24 }}>
          <PrimaryButton onClick={() => void navigate({ to: "/cart" })}>
            Pilih Outlet
          </PrimaryButton>
        </div>
      </div>
    </Screen>
  );
}
