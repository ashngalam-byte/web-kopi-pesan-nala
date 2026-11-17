import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Beranda — TemuBal" }] }),
  component: Beranda,
});

const recentItems = [
  { id: 1, name: "Jam Tangan", location: "Stadion Manahan", time: "1 jam lalu", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80" },
  { id: 2, name: "iPhone Duo", location: "Stadion Manahan", time: "1 jam lalu", img: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=200&q=80" },
  { id: 3, name: "Topi Gucci", location: "Stadion Manahan", time: "1 jam lalu", img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=200&q=80" },
  { id: 4, name: "Dompet Kulit", location: "Stadion Manahan", time: "1 jam lalu", img: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=200&q=80" },
];

function Beranda() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#F0F3FA", fontFamily: "'Inter', sans-serif", paddingBottom: 80 }}>

      {/* Header */}
      <div style={{ background: "#fff", padding: "20px 20px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", overflow: "hidden", background: "#ddd" }}>
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "#1a1a2e" }}>Halo, Nara!</p>
              <p style={{ margin: 0, fontSize: "0.75rem", color: "#666", display: "flex", alignItems: "center", gap: 4 }}>
                📍 Surakarta, ID ▾
              </p>
            </div>
          </div>
          <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.3rem", position: "relative" }}>
            🔔<span style={{ position: "absolute", top: -4, right: -4, width: 8, height: 8, background: "red", borderRadius: "50%", display: "block" }} />
          </button>
        </div>

        {/* Search */}
        <div style={{ display: "flex", alignItems: "center", background: "#F0F3FA", borderRadius: 12, padding: "10px 14px", gap: 8 }}>
          <span style={{ color: "#888", fontSize: "1rem" }}>🔍</span>
          <input placeholder="Cari barang hilang atau temukan..." style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: "0.85rem", color: "#333" }} />
          <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem" }}>⚙️</button>
        </div>
      </div>

      <div style={{ padding: "20px 20px 0" }}>
        <p style={{ margin: "0 0 16px", fontSize: "1rem", fontWeight: 700, color: "#1a1a2e" }}>Ada yang bisa kami bantu?</p>

        {/* 3 Action Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
          <button onClick={() => navigate({ to: "/lapor-hilang" })} style={{
            background: "linear-gradient(135deg, #6C63FF, #8B85FF)",
            border: "none", borderRadius: 16, padding: "16px 12px",
            cursor: "pointer", textAlign: "left", color: "#fff"
          }}>
            <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>🔍</div>
            <p style={{ margin: "0 0 4px", fontSize: "0.75rem", fontWeight: 700 }}>Lapor Hilang</p>
            <p style={{ margin: 0, fontSize: "0.62rem", opacity: 0.85 }}>Kehilangan barang? Buat Laporan di sini</p>
          </button>

          <button onClick={() => navigate({ to: "/lapor-temuan" })} style={{
            background: "linear-gradient(135deg, #00B4D8, #0096C7)",
            border: "none", borderRadius: 16, padding: "16px 12px",
            cursor: "pointer", textAlign: "left", color: "#fff"
          }}>
            <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>📦</div>
            <p style={{ margin: "0 0 4px", fontSize: "0.75rem", fontWeight: 700 }}>Lapor Temuan</p>
            <p style={{ margin: 0, fontSize: "0.62rem", opacity: 0.85 }}>Menemukan barang? Laporan di sini</p>
          </button>

          <button onClick={() => navigate({ to: "/cari" })} style={{
            background: "linear-gradient(135deg, #1D3461, #264E8A)",
            border: "none", borderRadius: 16, padding: "16px 12px",
            cursor: "pointer", textAlign: "left", color: "#fff"
          }}>
            <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>📋</div>
            <p style={{ margin: "0 0 4px", fontSize: "0.75rem", fontWeight: 700 }}>Cari / cocok</p>
            <p style={{ margin: 0, fontSize: "0.62rem", opacity: 0.85 }}>Cari barang hilang? Cek kecocokan disini</p>
          </button>
        </div>

        {/* Match notification */}
        <div onClick={() => navigate({ to: "/cari" })} style={{
          background: "#EEF0FF", borderRadius: 14, padding: "14px 16px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          cursor: "pointer", marginBottom: 24, border: "1px solid #D8DCFF"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: "1.2rem" }}>🛡️</span>
            <div>
              <p style={{ margin: 0, fontSize: "0.82rem", fontWeight: 700, color: "#6C63FF" }}>Barangmu mungkin ditemukan</p>
              <p style={{ margin: 0, fontSize: "0.72rem", color: "#666" }}>Ada 3 temuan mirip laporanmu</p>
            </div>
          </div>
          <span style={{ color: "#6C63FF", fontSize: "1rem" }}>›</span>
        </div>

        {/* Recently found */}
        <p style={{ margin: "0 0 14px", fontSize: "1rem", fontWeight: 700, color: "#1a1a2e" }}>Baru Ditemukan</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {recentItems.map(item => (
            <div key={item.id} onClick={() => navigate({ to: "/detail" })}
              style={{ background: "#fff", borderRadius: 14, overflow: "hidden", cursor: "pointer", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
              <img src={item.img} alt={item.name} style={{ width: "100%", height: 110, objectFit: "cover", display: "block" }} />
              <div style={{ padding: "10px 10px 8px" }}>
                <p style={{ margin: "0 0 3px", fontSize: "0.8rem", fontWeight: 700, color: "#1a1a2e" }}>{item.name}</p>
                <p style={{ margin: "0 0 3px", fontSize: "0.68rem", color: "#666" }}>📍 {item.location}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ margin: 0, fontSize: "0.65rem", color: "#aaa" }}>{item.time}</p>
                  <button style={{ background: "#F0F3FA", border: "none", borderRadius: 6, padding: "3px 8px", fontSize: "0.6rem", cursor: "pointer", color: "#6C63FF", fontWeight: 600 }}>Lihat Detail</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <BottomNav active="beranda" />
    </div>
  );
}

export function BottomNav({ active }: { active: string }) {
  const navigate = useNavigate();
  const tabs = [
    { key: "beranda", label: "Beranda", icon: "🏠", to: "/" },
    { key: "cari", label: "Cari", icon: "🔍", to: "/cari" },
    { key: "chat", label: "Chat", icon: "💬", to: "/" },
    { key: "profil", label: "Profil", icon: "👤", to: "/" },
  ];
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      background: "#fff", borderTop: "1px solid #eee",
      display: "flex", justifyContent: "space-around",
      padding: "10px 0 16px", zIndex: 100,
    }}>
      {tabs.map(t => (
        <button key={t.key} onClick={() => navigate({ to: t.to as "/" })}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <span style={{ fontSize: "1.3rem" }}>{t.icon}</span>
          <span style={{ fontSize: "0.65rem", color: active === t.key ? "#6C63FF" : "#aaa", fontWeight: active === t.key ? 700 : 400 }}>{t.label}</span>
        </button>
      ))}
    </div>
  );
}
