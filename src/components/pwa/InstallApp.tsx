import { useState } from "react";
import { useInstallPrompt } from "./useInstallPrompt";

const GREEN = "#0E3A23";
const CREAM = "#E6D9CC";
const SANS = "'Montserrat', sans-serif";

function DownloadIcon({ color = "#fff", size = 18 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3v12m0 0l4.5-4.5M12 15l-4.5-4.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Lembar panduan install untuk iOS / browser yang tidak punya prompt otomatis. */
function InstallSheet({
  open,
  ios,
  canPrompt,
  busy,
  onInstall,
  onClose,
}: {
  open: boolean;
  ios: boolean;
  canPrompt: boolean;
  busy: boolean;
  onInstall: () => void;
  onClose: () => void;
}) {
  if (!open) return null;

  const steps = ios
    ? [
        "Buka NALA di Safari, lalu ketuk ikon Bagikan (kotak dengan panah ke atas).",
        'Gulir dan pilih "Tambah ke Layar Utama".',
        'Ketuk "Tambah" di pojok kanan atas.',
      ]
    : [
        "Ketuk menu ⋮ di browser (Chrome / Edge / Samsung Internet).",
        'Pilih "Instal aplikasi" atau "Tambahkan ke layar utama".',
        'Ketuk "Instal" untuk konfirmasi.',
      ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cara memasang aplikasi NALA"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(10, 25, 20, 0.55)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        fontFamily: SANS,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 430,
          background: "#fff",
          borderRadius: "24px 24px 0 0",
          padding: "10px 24px calc(28px + env(safe-area-inset-bottom))",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: 44,
            height: 4,
            borderRadius: 999,
            background: "#E2DED8",
            margin: "0 auto 20px",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
          <img
            src="/icons/icon-192.png"
            alt=""
            width={52}
            height={52}
            style={{ borderRadius: 12, display: "block" }}
          />
          <div>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: GREEN }}>
              Pasang NALA di HP
            </h2>
            <p style={{ margin: "2px 0 0", fontSize: 12, color: "#777" }}>
              Ikon di layar utama, langsung buka seperti aplikasi.
            </p>
          </div>
        </div>

        {canPrompt ? (
          <button
            type="button"
            onClick={onInstall}
            disabled={busy}
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: 14,
              background: GREEN,
              color: "#fff",
              fontSize: 15,
              fontWeight: 700,
              fontFamily: SANS,
              cursor: busy ? "wait" : "pointer",
              opacity: busy ? 0.7 : 1,
              marginBottom: 14,
            }}
          >
            {busy ? "Membuka dialog…" : "Pasang Sekarang"}
          </button>
        ) : (
          <ol
            style={{
              margin: "0 0 14px",
              paddingLeft: 22,
              display: "grid",
              gap: 10,
              listStyleType: "decimal",
              listStylePosition: "outside",
            }}
          >
            {steps.map((step) => (
              <li key={step} style={{ fontSize: 13, lineHeight: 1.55, color: "#444" }}>
                {step}
              </li>
            ))}
          </ol>
        )}

        <p style={{ margin: "0 0 18px", fontSize: 11.5, lineHeight: 1.5, color: "#8a8a8a" }}>
          Setelah terpasang, NALA muncul di layar utama dan bisa dibuka tanpa browser.
        </p>

        <button
          type="button"
          onClick={onClose}
          style={{
            width: "100%",
            padding: "13px",
            border: `1px solid ${CREAM}`,
            borderRadius: 14,
            background: "#fff",
            color: GREEN,
            fontSize: 14,
            fontWeight: 700,
            fontFamily: SANS,
            cursor: "pointer",
          }}
        >
          Nanti Saja
        </button>
      </div>
    </div>
  );
}

/** Banner install di halaman Home (muncul hanya bila aplikasi belum terpasang). */
export function InstallBanner() {
  const { eligible, canPrompt, ios, install, dismiss } = useInstallPrompt();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  if (!eligible) return null;

  async function startInstall() {
    if (!canPrompt) {
      setOpen(true);
      return;
    }
    setBusy(true);
    const outcome = await install();
    setBusy(false);
    if (outcome === "accepted") setOpen(false);
  }

  return (
    <>
      <div
        style={{
          margin: "12px 16px 0",
          padding: "12px 14px",
          borderRadius: 16,
          background: GREEN,
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontFamily: SANS,
          boxShadow: "0 6px 18px -8px rgba(14, 58, 35, 0.6)",
        }}
      >
        <img
          src="/icons/icon-192.png"
          alt=""
          width={40}
          height={40}
          style={{ borderRadius: 10, display: "block", flexShrink: 0 }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 12.5, fontWeight: 800, color: "#fff" }}>
            Pasang NALA di HP
          </p>
          <p
            style={{
              margin: "1px 0 0",
              fontSize: 10.5,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.4,
            }}
          >
            Buka lebih cepat dari layar utama.
          </p>
        </div>
        <button
          type="button"
          onClick={startInstall}
          style={{
            border: "none",
            borderRadius: 9,
            background: CREAM,
            color: GREEN,
            fontSize: 11.5,
            fontWeight: 800,
            fontFamily: SANS,
            padding: "8px 12px",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          {canPrompt ? "Pasang" : "Cara"}
        </button>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Tutup banner pasang aplikasi"
          style={{
            border: "none",
            background: "none",
            color: "rgba(255,255,255,0.7)",
            fontSize: 18,
            lineHeight: 1,
            padding: "2px 0 2px 2px",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          ×
        </button>
      </div>

      <InstallSheet
        open={open}
        ios={ios}
        canPrompt={canPrompt}
        busy={busy}
        onInstall={startInstall}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

/** Link kecil "Pasang aplikasi" untuk layar login. */
export function InstallLink() {
  const { eligible, canPrompt, ios, install } = useInstallPrompt();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  if (!eligible) return null;

  async function handleClick() {
    if (!canPrompt) {
      setOpen(true);
      return;
    }
    setBusy(true);
    await install();
    setBusy(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        style={{
          marginTop: 20,
          alignSelf: "center",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "none",
          border: "none",
          color: GREEN,
          fontSize: 12.5,
          fontWeight: 600,
          fontFamily: SANS,
          cursor: busy ? "wait" : "pointer",
          textDecoration: "underline",
          textUnderlineOffset: 3,
          padding: 4,
        }}
      >
        <DownloadIcon color={GREEN} size={15} />
        {ios ? "Cara pasang di iPhone" : "Pasang aplikasi di HP"}
      </button>

      <InstallSheet
        open={open}
        ios={ios}
        canPrompt={canPrompt}
        busy={busy}
        onInstall={handleClick}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
