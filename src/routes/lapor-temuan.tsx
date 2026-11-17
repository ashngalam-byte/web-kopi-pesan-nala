import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/lapor-temuan")({
  head: () => ({ meta: [{ title: "Lapor Barang Temuan" }] }),
  component: LaporTemuan,
});

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#1a1a2e", marginBottom: 6
};
const inputStyle: React.CSSProperties = {
  width: "100%", background: "#fff", border: "1px solid #E8EAF0",
  borderRadius: 12, padding: "13px 14px", fontSize: "0.85rem",
  color: "#1a1a2e", outline: "none", fontFamily: "'Inter', sans-serif",
  boxSizing: "border-box"
};

function LaporTemuan() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#F0F3FA", fontFamily: "'Inter', sans-serif", paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ background: "#fff", padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, borderBottom: "1px solid #f0f0f0" }}>
        <button onClick={() => navigate({ to: "/" })} style={{ background: "#F0F3FA", border: "none", borderRadius: 12, width: 36, height: 36, cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
        <p style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#1a1a2e" }}>Lapor barang temuan</p>
      </div>

      <div style={{ padding: "24px 20px 0" }}>
        <h2 style={{ margin: "0 0 4px", fontSize: "1.2rem", fontWeight: 800, color: "#1a1a2e" }}>Terima Kasih sudah peduli.</h2>
        <p style={{ margin: "0 0 20px", fontSize: "0.78rem", color: "#888" }}>Lengkapi detail bertanda * agar mudah dicocokan</p>

        {/* Foto preview */}
        <div style={{ background: "#fff", borderRadius: 14, padding: "14px", display: "flex", alignItems: "center", gap: 14, marginBottom: 20, boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}>
          <div style={{ width: 60, height: 60, borderRadius: 10, overflow: "hidden", background: "#eee", flexShrink: 0 }}>
            <img src="https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=200&q=80" alt="item" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: "0.88rem", color: "#1a1a2e" }}>Apple IPone Duo</p>
            <p style={{ margin: "0 0 6px", fontSize: "0.7rem", color: "#888" }}>1 dari 3 foto · JPG atau PNG</p>
            <button style={{ background: "#E6F9F5", border: "1px solid #00B4A0", borderRadius: 20, padding: "3px 12px", fontSize: "0.68rem", color: "#00B4A0", cursor: "pointer", fontWeight: 600 }}>+ Tambah</button>
          </div>
        </div>

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={labelStyle}>Nama barang *</label>
            <input defaultValue="IPone Duo" style={inputStyle} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={labelStyle}>Kategori *</label>
              <div style={{ ...inputStyle, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Ipone Apple</span><span style={{ color: "#888" }}>▾</span>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Tanggal hilang *</label>
              <input defaultValue="2 November 2026" style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Lokasi terakhir terlihat *</label>
            <input defaultValue="Stadion Manahan, Surakarta" style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Deskripsi barang *</label>
            <textarea defaultValue={"Satu unit ipone duo warna white.\nTerakhir terlihat di area tribun timur stadion."} style={{ ...inputStyle, height: 90, resize: "none" } as React.CSSProperties} />
          </div>
        </div>

        {/* Privacy hint */}
        <div style={{ background: "#E6FAF7", borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20, cursor: "pointer", border: "1px solid #00C9B1" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: "1.2rem" }}>🛡️</span>
            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: "0.82rem", color: "#00917A" }}>Lindungi data pribadi pemilik.</p>
              <p style={{ margin: 0, fontSize: "0.7rem", color: "#888" }}>Jangan unggah nomor identitas atau isi layar.</p>
            </div>
          </div>
          <span style={{ color: "#00917A" }}>›</span>
        </div>
      </div>

      {/* Submit */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "16px 20px", background: "#F0F3FA" }}>
        <button onClick={() => navigate({ to: "/laporan-saya" })} style={{
          width: "100%", background: "#0096A0", color: "#fff", border: "none",
          borderRadius: 14, padding: "16px", fontSize: "0.95rem", fontWeight: 700,
          cursor: "pointer", fontFamily: "'Inter', sans-serif"
        }}>
          Terbitkan laporan temuan
        </button>
      </div>
    </div>
  );
}
