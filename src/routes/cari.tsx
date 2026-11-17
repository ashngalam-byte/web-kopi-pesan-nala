import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BottomNav } from "./beranda";

export const Route = createFileRoute("/cari")({
  head: () => ({ meta: [{ title: "Cari & Cocokkan" }] }),
  component: Cari,
});

const results = [
  { id: 1, name: "Jam tangan New 73", location: "Stadion Manahan", detail: "Lokasi & Kategori sesuai", badge: "Sangat mirip", badgeColor: "#4CD97B", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80" },
  { id: 2, name: "Jam tangan New 74", location: "Area parkir Manahan", detail: "Kategori & waktu selesai", badge: "Mirip", badgeColor: "#B8B5FF", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80" },
  { id: 3, name: "Jam tangan New 75", location: "Halte Manahan", detail: "Kategori sesuai", badge: "Mirip", badgeColor: "#B8B5FF", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80" },
];

function Cari() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#F0F3FA", fontFamily: "'Inter', sans-serif", paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ background: "#fff", padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, borderBottom: "1px solid #f0f0f0" }}>
        <button onClick={() => navigate({ to: "/beranda" })} style={{ background: "#F0F3FA", border: "none", borderRadius: 12, width: 36, height: 36, cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
        <p style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#1a1a2e" }}>Cari & cocokkan</p>
      </div>

      <div style={{ padding: "16px 20px 0" }}>
        {/* Search bar */}
        <div style={{ display: "flex", alignItems: "center", background: "#fff", borderRadius: 12, padding: "11px 14px", gap: 8, marginBottom: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
          <span style={{ color: "#888" }}>🔍</span>
          <input defaultValue="Jam tangan" style={{ flex: 1, border: "none", outline: "none", fontSize: "0.88rem", color: "#1a1a2e", fontFamily: "'Inter', sans-serif" }} />
          <span style={{ color: "#888" }}>⚙️</span>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", background: "#fff", borderRadius: 12, padding: 4, marginBottom: 14, gap: 4 }}>
          <button style={{ flex: 1, background: "transparent", border: "none", borderRadius: 10, padding: "10px", fontSize: "0.8rem", color: "#888", cursor: "pointer" }}>Semua temuan</button>
          <button style={{ flex: 1, background: "#EEF0FF", border: "none", borderRadius: 10, padding: "10px", fontSize: "0.8rem", color: "#6C63FF", fontWeight: 700, cursor: "pointer" }}>Cocok untukmu (3)</button>
        </div>

        {/* Filter chips */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {["Kunci ▾", "Surakarta ▾", "Terbaru ▾"].map(f => (
            <button key={f} style={{ background: "#fff", border: "1px solid #E0E0E0", borderRadius: 20, padding: "6px 14px", fontSize: "0.75rem", cursor: "pointer", color: "#1a1a2e" }}>{f}</button>
          ))}
        </div>

        <h3 style={{ margin: "0 0 4px", fontSize: "1rem", fontWeight: 700, color: "#1a1a2e" }}>3 temuan mirip laporan</h3>
        <p style={{ margin: "0 0 16px", fontSize: "0.72rem", color: "#888" }}>Hasil Kemiripan, bukan jaminan kepemilikan.</p>

        {/* Results */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {results.map(item => (
            <div key={item.id} onClick={() => navigate({ to: "/detail" })} style={{
              background: "#fff", borderRadius: 16, padding: "14px",
              display: "flex", alignItems: "center", gap: 14,
              cursor: "pointer", boxShadow: "0 1px 6px rgba(0,0,0,0.05)"
            }}>
              <div style={{ width: 72, height: 72, borderRadius: 12, overflow: "hidden", flexShrink: 0 }}>
                <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ background: item.badgeColor, color: item.id === 1 ? "#fff" : "#6C63FF", fontSize: "0.65rem", fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>{item.badge}</span>
                <p style={{ margin: "6px 0 3px", fontWeight: 700, fontSize: "0.9rem", color: "#1a1a2e" }}>{item.name}</p>
                <p style={{ margin: "0 0 3px", fontSize: "0.72rem", color: "#666" }}>📍 {item.location}</p>
                <p style={{ margin: 0, fontSize: "0.68rem", color: "#6C63FF" }}>{item.detail}</p>
              </div>
              <span style={{ color: "#aaa", fontSize: "1.1rem" }}>›</span>
            </div>
          ))}
        </div>
      </div>

      <BottomNav active="cari" />
    </div>
  );
}
