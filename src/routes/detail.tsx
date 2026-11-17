import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BottomNav } from "./index";

export const Route = createFileRoute("/detail")({
  head: () => ({ meta: [{ title: "Detail Temuan" }] }),
  component: Detail,
});

function Detail() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#F0F3FA", fontFamily: "'Inter', sans-serif", paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ background: "#fff", padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, borderBottom: "1px solid #f0f0f0" }}>
        <button onClick={() => navigate({ to: "/cari" })} style={{ background: "#F0F3FA", border: "none", borderRadius: 12, width: 36, height: 36, cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
        <p style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#1a1a2e" }}>Cari & cocokkan</p>
      </div>

      <div style={{ padding: "16px 20px 0" }}>
        {/* Foto item */}
        <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", marginBottom: 20 }}>
          <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=85" alt="Jam Tangan" style={{ width: "100%", height: 260, objectFit: "cover", display: "block" }} />
          <span style={{ position: "absolute", top: 12, left: 12, background: "#4CD97B", color: "#fff", fontSize: "0.72rem", fontWeight: 700, padding: "4px 12px", borderRadius: 20 }}>Ditemukan</span>
          <span style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: "0.68rem", padding: "3px 10px", borderRadius: 20 }}>1/1 foto</span>
        </div>

        <h3 style={{ margin: "0 0 10px", fontSize: "1rem", fontWeight: 700, color: "#1a1a2e" }}>3 temuan mirip laporan</h3>

        {/* Match badge */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <span style={{ background: "#EEF0FF", color: "#6C63FF", fontSize: "0.78rem", fontWeight: 700, padding: "6px 14px", borderRadius: 10 }}>Sangat mirip laporanmu</span>
          <span style={{ fontSize: "0.68rem", color: "#aaa" }}>ID Laporan: HLG-1611-028</span>
        </div>

        {/* Details */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "#1a1a2e", display: "flex", alignItems: "center", gap: 6 }}>
            <span>📍</span> <strong>Stadion Manahan, Surakarta</strong>
          </p>
          <p style={{ margin: 0, fontSize: "0.82rem", color: "#666", display: "flex", alignItems: "center", gap: 6 }}>
            <span>📅</span> Ditemukan 1 Nov 2026, pukul 08.20
          </p>
        </div>

        <h4 style={{ margin: "0 0 6px", fontSize: "0.88rem", fontWeight: 700, color: "#1a1a2e" }}>Tentang barang</h4>
        <p style={{ margin: "0 0 16px", fontSize: "0.8rem", color: "#555", lineHeight: 1.6 }}>
          Satu jam tangan karet biru merek Sulthan New 75. Terakhir terlihat di area tribun timur stadion.
        </p>

        {/* Security post */}
        <div style={{ background: "#E6FAF0", borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, marginBottom: 12, border: "1px solid #A8E6C8" }}>
          <div style={{ width: 40, height: 40, background: "#4CD97B", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ color: "#fff" }}>🛡️</span>
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: "0.82rem", color: "#1a1a2e" }}>Pos Keamanan Manahan</p>
            <p style={{ margin: 0, fontSize: "0.7rem", color: "#00917A" }}>Petugas terverifikasi</p>
          </div>
        </div>

        {/* Privacy */}
        <div style={{ background: "#EEF0FF", borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: "1.2rem" }}>🔒</span>
          <p style={{ margin: 0, fontSize: "0.75rem", color: "#6C63FF" }}>
            Buktikan kepemilikan sebelum mengambil. Detail rahasiamu tidak ditampilkan publik.
          </p>
        </div>
      </div>

      <BottomNav active="cari" />
    </div>
  );
}
