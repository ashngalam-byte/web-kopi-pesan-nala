import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/lapor-hilang")({
  head: () => ({ meta: [{ title: "Lapor Barang Hilang" }] }),
  component: LaporHilang,
});

function LaporHilang() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#F0F3FA", fontFamily: "'Inter', sans-serif", paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ background: "#fff", padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, borderBottom: "1px solid #f0f0f0" }}>
        <button onClick={() => navigate({ to: "/beranda" })} style={{ background: "#F0F3FA", border: "none", borderRadius: 12, width: 36, height: 36, cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
        <p style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#1a1a2e" }}>Lapor barang hilang</p>
      </div>

      <div style={{ padding: "24px 20px 0" }}>
        <h2 style={{ margin: "0 0 4px", fontSize: "1.2rem", fontWeight: 800, color: "#1a1a2e" }}>Yuk, ceritakan barangmu.</h2>
        <p style={{ margin: "0 0 20px", fontSize: "0.78rem", color: "#888" }}>Lengkapi detail bertanda * agar mudah dicocokan</p>

        {/* Foto preview */}
        <div style={{ background: "#fff", borderRadius: 14, padding: "14px", display: "flex", alignItems: "center", gap: 14, marginBottom: 20, boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}>
          <div style={{ width: 60, height: 60, borderRadius: 10, overflow: "hidden", background: "#eee", flexShrink: 0 }}>
            <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80" alt="item" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: "0.88rem", color: "#1a1a2e" }}>Jam Tangan</p>
            <p style={{ margin: "0 0 6px", fontSize: "0.7rem", color: "#888" }}>1 dari 3 foto JPG atau PNG</p>
            <button style={{ background: "#EEF0FF", border: "1px solid #6C63FF", borderRadius: 20, padding: "3px 12px", fontSize: "0.68rem", color: "#6C63FF", cursor: "pointer", fontWeight: 600 }}>+ Tambah</button>
          </div>
        </div>

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={labelStyle}>Nama barang *</label>
            <input defaultValue="Jam Tangan Sulthan New 75" style={inputStyle} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={labelStyle}>Kategori *</label>
              <div style={{ ...inputStyle, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Jam Tangan</span><span style={{ color: "#888" }}>▾</span>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Tanggal hilang *</label>
              <input defaultValue="1 November 2026" style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Lokasi terakhir terlihat *</label>
            <input defaultValue="Stadion Manahan, Surakarta" style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Deskripsi barang *</label>
            <textarea defaultValue="Satu jam tangan karet biru merek Sulthan New 75. Terakhir terlihat di area tribun timur stadion." style={{ ...inputStyle, height: 90, resize: "none" } as React.CSSProperties} />
          </div>
        </div>

        {/* Privacy hint */}
        <div style={{ background: "#EEF0FF", borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20, cursor: "pointer" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: "1.2rem" }}>🛡️</span>
            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: "0.82rem", color: "#6C63FF" }}>Ciri rahasia? Simpan untuk verifikasi</p>
              <p style={{ margin: 0, fontSize: "0.7rem", color: "#888" }}>Jangan tulis alamat atau detail unik di laporan</p>
            </div>
          </div>
          <span style={{ color: "#6C63FF" }}>›</span>
        </div>
      </div>

      {/* Submit */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "16px 20px", background: "#F0F3FA" }}>
        <button onClick={() => navigate({ to: "/laporan-saya" })} style={{
          width: "100%", background: "#6C63FF", color: "#fff", border: "none",
          borderRadius: 14, padding: "16px", fontSize: "0.95rem", fontWeight: 700,
          cursor: "pointer", fontFamily: "'Inter', sans-serif"
        }}>
          Terbitkan laporan hilang
        </button>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#1a1a2e", marginBottom: 6
};
const inputStyle: React.CSSProperties = {
  width: "100%", background: "#fff", border: "1px solid #E8EAF0",
  borderRadius: 12, padding: "13px 14px", fontSize: "0.85rem",
  color: "#1a1a2e", outline: "none", fontFamily: "'Inter', sans-serif",
  boxSizing: "border-box"
};
