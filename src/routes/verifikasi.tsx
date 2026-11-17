import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/verifikasi")({
  head: () => ({ meta: [{ title: "Verifikasi Kepemilikan" }] }),
  component: Verifikasi,
});

function Verifikasi() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#F0F3FA", fontFamily: "'Inter', sans-serif", paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ background: "#fff", padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, borderBottom: "1px solid #f0f0f0" }}>
        <button onClick={() => navigate({ to: "/detail" })} style={{ background: "#F0F3FA", border: "none", borderRadius: 12, width: 36, height: 36, cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
        <p style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#1a1a2e" }}>Verifikasi kepemilikan</p>
      </div>

      <div style={{ padding: "24px 20px 0" }}>
        <h2 style={{ margin: "0 0 4px", fontSize: "1.2rem", fontWeight: 800, color: "#1a1a2e" }}>Pastikan ini barangmu.</h2>
        <p style={{ margin: "0 0 20px", fontSize: "0.78rem", color: "#888" }}>Jawabanmu hanya dilihat oleh petugas penyimpan</p>

        {/* Item */}
        <div style={{ background: "#fff", borderRadius: 14, padding: "14px", display: "flex", alignItems: "center", gap: 14, marginBottom: 24, boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}>
          <div style={{ width: 60, height: 60, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
            <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80" alt="Jam Tangan" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: "0.9rem", color: "#1a1a2e" }}>Jam Tangan</p>
            <p style={{ margin: 0, fontSize: "0.72rem", color: "#888" }}>Stadion Manahan HLG-1611-028</p>
          </div>
        </div>

        {/* Ciri khusus */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#1a1a2e", marginBottom: 8 }}>
            Apa ciri khusus yang belum disebutkan? *
          </label>
          <textarea
            defaultValue="Ada tanda cat biru kecil pada salah karet jam tersebut."
            style={{ width: "100%", background: "#fff", border: "1px solid #E8EAF0", borderRadius: 12, padding: "13px 14px", fontSize: "0.85rem", color: "#1a1a2e", outline: "none", fontFamily: "'Inter', sans-serif", boxSizing: "border-box", height: 90, resize: "none" } as React.CSSProperties}
          />
        </div>

        {/* Privacy warning */}
        <p style={{ margin: "0 0 20px", fontSize: "0.75rem", color: "#888", display: "flex", alignItems: "center", gap: 6 }}>
          <span>🔒</span> Jangan bagikan kata sandi atau nomor identitas
        </p>

        {/* Upload bukti */}
        <div style={{ background: "#fff", borderRadius: 14, padding: "16px", display: "flex", alignItems: "center", gap: 14, marginBottom: 16, boxShadow: "0 1px 6px rgba(0,0,0,0.05)", cursor: "pointer" }}>
          <div style={{ width: 44, height: 44, background: "#F0F3FA", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: "1.3rem" }}>📷</span>
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: "0.85rem", color: "#1a1a2e" }}>Tambahkan bukti (opsional)</p>
            <p style={{ margin: 0, fontSize: "0.72rem", color: "#888" }}>Misalnya foto lama barang - Maxs. 5 MB</p>
          </div>
        </div>

        {/* Steps */}
        <div style={{ background: "#EEF0FF", borderRadius: 14, padding: "16px", marginBottom: 16 }}>
          <p style={{ margin: "0 0 10px", fontWeight: 700, fontSize: "0.82rem", color: "#1a1a2e" }}>Setelah dikirim, apa selanjutnya?</p>
          {[
            "Petugas memeriksa ciri khusus barangmu.",
            "Hasil verifikasi masukke menu laporan",
            "Jika cocok, atur pengambilan di pos keamanan",
          ].map((step, i) => (
            <p key={i} style={{ margin: "0 0 6px", fontSize: "0.78rem", color: "#555" }}>
              {i + 1}. {step}
            </p>
          ))}
        </div>

        {/* Checkbox */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
          <div style={{ width: 20, height: 20, background: "#6C63FF", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
            <span style={{ color: "#fff", fontSize: "0.75rem" }}>✓</span>
          </div>
          <p style={{ margin: 0, fontSize: "0.75rem", color: "#555", lineHeight: 1.5 }}>
            Saya pemilik barang dan bersedia menunjukan bukti saat pengambilan di tempat aman.
          </p>
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
