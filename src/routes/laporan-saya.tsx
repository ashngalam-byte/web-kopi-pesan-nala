import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/laporan-saya")({
  head: () => ({ meta: [{ title: "Laporan Saya" }] }),
  component: LaporanSaya,
});

function LaporanSaya() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#F0F3FA", fontFamily: "'Inter', sans-serif", paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ background: "#fff", padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, borderBottom: "1px solid #f0f0f0" }}>
        <button onClick={() => navigate({ to: "/" })} style={{ background: "#F0F3FA", border: "none", borderRadius: 12, width: 36, height: 36, cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
        <p style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#1a1a2e" }}>Laporan saya</p>
      </div>

      <div style={{ padding: "32px 20px 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Success icon */}
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#4CD97B", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
          <span style={{ color: "#fff", fontSize: "2rem" }}>✓</span>
        </div>
        <h2 style={{ margin: "0 0 6px", fontSize: "1.2rem", fontWeight: 800, color: "#1a1a2e" }}>Laporanmu sudah terbit!</h2>
        <p style={{ margin: "0 0 24px", fontSize: "0.78rem", color: "#888", textAlign: "center" }}>
          Semoga barangmu segera kembali<br />Saya bantu cari temukan yang mirip.
        </p>

        {/* Item card */}
        <div style={{ width: "100%", background: "#fff", borderRadius: 16, padding: "14px", display: "flex", alignItems: "center", gap: 14, marginBottom: 14, boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}>
          <div style={{ width: 70, height: 70, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
            <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80" alt="item" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ flex: 1 }}>
            <span style={{ background: "#EEF0FF", color: "#6C63FF", fontSize: "0.65rem", fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>Masih dicari</span>
            <p style={{ margin: "6px 0 2px", fontWeight: 700, fontSize: "0.9rem", color: "#1a1a2e" }}>Jam Tangan Sulthan New 75</p>
            <p style={{ margin: "0 0 2px", fontSize: "0.68rem", color: "#888" }}>Stadion Manahan · 1 Nov 2026</p>
            <p style={{ margin: 0, fontSize: "0.65rem", color: "#aaa" }}>ID Laporan: HLG-1611-028</p>
          </div>
        </div>

        {/* Match notification */}
        <div style={{ width: "100%", background: "#EEF0FF", borderRadius: 16, padding: "16px", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: "1.2rem", color: "#6C63FF" }}>🔍</span>
            <p style={{ margin: 0, fontWeight: 700, fontSize: "0.9rem", color: "#1a1a2e" }}>Ada 3 kemungkinan cocok</p>
          </div>
          <p style={{ margin: 0, fontSize: "0.75rem", color: "#666" }}>Berdasarkan kategori, lokasi, dan waktu.<br />Periksa detail untuk memastikan barangmu.</p>
        </div>

        {/* Auto update */}
        <div style={{ width: "100%", background: "#fff", borderRadius: 16, padding: "14px 16px", display: "flex", alignItems: "flex-start", gap: 12, boxShadow: "0 1px 6px rgba(0,0,0,0.05)", marginBottom: 8 }}>
          <span style={{ fontSize: "1.1rem", marginTop: 2 }}>🔔</span>
          <div>
            <p style={{ margin: "0 0 3px", fontWeight: 700, fontSize: "0.82rem", color: "#1a1a2e" }}>Pembaruan otomatis aktif</p>
            <p style={{ margin: 0, fontSize: "0.72rem", color: "#888" }}>kamu akan diberi tahu saat ada temuan serupa.</p>
          </div>
        </div>

        <p style={{ fontSize: "0.72rem", color: "#aaa", marginTop: 8, marginBottom: 24 }}>Laporan dapat diubah lewat menu Laporan.</p>
      </div>

      {/* CTA */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "16px 20px", background: "#F0F3FA" }}>
        <button onClick={() => navigate({ to: "/cari" })} style={{
          width: "100%", background: "#6C63FF", color: "#fff", border: "none",
          borderRadius: 14, padding: "16px", fontSize: "0.95rem", fontWeight: 700,
          cursor: "pointer", fontFamily: "'Inter', sans-serif"
        }}>
          Lihat kemungkinan cocok
        </button>
      </div>
    </div>
  );
}
