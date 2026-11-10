import { useState } from "react";
import { useRouterState, useNavigate } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Grid,
  X,
  Smartphone,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { colors, font } from "@/lib/design";
import { FLOW_SCREENS } from "@/lib/flow";

export function FlowNavigator() {
  const routerState = useRouterState();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const pathname = routerState.location.pathname;
  const search = routerState.location.search as Record<string, unknown>;

  // Tentukan step aktif saat ini
  let currentStep = 1;

  if (pathname === "/") {
    currentStep = 1;
  } else if (pathname === "/login") {
    currentStep = 2;
  } else if (pathname === "/register") {
    currentStep = 3;
  } else if (pathname === "/verify-phone") {
    currentStep = 4;
  } else if (pathname === "/verify-otp") {
    currentStep = 5;
  } else if (pathname === "/verified") {
    currentStep = 6;
  } else if (pathname === "/onboarding") {
    const stepNum = Number(search?.step) || 1;
    if (stepNum === 2) currentStep = 8;
    else if (stepNum === 3) currentStep = 9;
    else currentStep = 7;
  } else if (pathname === "/home") {
    currentStep = 10;
  } else if (pathname.startsWith("/menu/")) {
    const cat = pathname.split("/menu/")[1];
    if (cat === "coffee") currentStep = 11;
    else if (cat === "non-coffee") currentStep = 12;
    else if (cat === "food") currentStep = 13;
    else if (cat === "snack") currentStep = 14;
    else if (cat === "signature") currentStep = 15;
    else if (cat === "manual-brew") currentStep = 16;
    else if (cat === "beans") currentStep = 17;
    else currentStep = 11;
  } else if (pathname.startsWith("/product/")) {
    currentStep = 18;
  } else if (pathname === "/outlet") {
    currentStep = 19;
  } else if (pathname === "/cart") {
    currentStep = 20;
  } else if (pathname === "/checkout") {
    currentStep = 21;
  } else if (pathname === "/payment-success") {
    currentStep = 22;
  } else if (pathname === "/thank-you") {
    currentStep = 23;
  }

  const activeScreen = FLOW_SCREENS.find((s) => s.step === currentStep) ?? FLOW_SCREENS[0]!;

  function goToStep(targetStep: number) {
    const screen = FLOW_SCREENS.find((s) => s.step === targetStep);
    if (!screen) return;
    setModalOpen(false);

    if (screen.id === "onboarding-1") {
      void navigate({ to: "/onboarding", search: { step: 1 } });
    } else if (screen.id === "onboarding-2") {
      void navigate({ to: "/onboarding", search: { step: 2 } });
    } else if (screen.id === "onboarding-3") {
      void navigate({ to: "/onboarding", search: { step: 3 } });
    } else if (screen.to === "/menu/$category") {
      const cat = screen.category ?? "coffee";
      void navigate({ to: "/menu/$category", params: { category: cat } });
    } else if (screen.to === "/product/$id") {
      void navigate({ to: "/product/$id", params: { id: "nala-coffee-milk" } });
    } else if (screen.to === "/outlet") {
      void navigate({ to: "/outlet" });
    } else if (screen.to === "/cart") {
      void navigate({ to: "/cart" });
    } else if (screen.to === "/checkout") {
      void navigate({ to: "/checkout" });
    } else if (screen.to === "/payment-success") {
      void navigate({ to: "/payment-success", search: { order: "ANG0123456" } });
    } else if (screen.to === "/thank-you") {
      void navigate({ to: "/thank-you" });
    } else if (screen.to === "/login") {
      void navigate({ to: "/login" });
    } else if (screen.to === "/register") {
      void navigate({ to: "/register" });
    } else if (screen.to === "/verify-phone") {
      void navigate({ to: "/verify-phone" });
    } else if (screen.to === "/verify-otp") {
      void navigate({ to: "/verify-otp" });
    } else if (screen.to === "/verified") {
      void navigate({ to: "/verified" });
    } else if (screen.to === "/home") {
      void navigate({ to: "/home" });
    } else {
      void navigate({ to: "/" });
    }
  }

  return (
    <>
      {/* Floating Navigator Bar (Tetap di bawah / samping layar) */}
      <div
        style={{
          position: "fixed",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "rgba(8, 54, 40, 0.95)",
          backdropFilter: "blur(12px)",
          color: "#fff",
          padding: "6px 10px",
          borderRadius: 999,
          boxShadow: "0 10px 30px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.15)",
          fontFamily: font.sans,
          fontSize: "0.8rem",
          maxWidth: "calc(100vw - 24px)",
        }}
      >
        {/* Tombol Sebelumnya */}
        <button
          type="button"
          onClick={() => goToStep(currentStep - 1)}
          disabled={currentStep <= 1}
          aria-label="Layar sebelumnya"
          style={{
            background: currentStep <= 1 ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.2)",
            border: "none",
            color: currentStep <= 1 ? "rgba(255,255,255,0.4)" : "#fff",
            borderRadius: 999,
            padding: "6px 10px",
            display: "flex",
            alignItems: "center",
            gap: 2,
            cursor: currentStep <= 1 ? "not-allowed" : "pointer",
            fontSize: "0.75rem",
            fontWeight: 600,
          }}
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Info Layar Saat Ini & Tombol Buka Peta Alur */}
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            padding: "4px 8px",
            display: "flex",
            alignItems: "center",
            gap: 6,
            cursor: "pointer",
            fontWeight: 700,
            fontSize: "0.82rem",
            textAlign: "center",
          }}
        >
          <span
            style={{
              background: colors.caramel,
              color: "#fff",
              padding: "2px 8px",
              borderRadius: 999,
              fontSize: "0.72rem",
              fontWeight: 800,
            }}
          >
            {currentStep}/23
          </span>
          <span
            style={{
              maxWidth: 160,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {activeScreen.title.replace(/^\d+\.\s*/, "")}
          </span>
          <Grid size={15} style={{ opacity: 0.8 }} />
        </button>

        {/* Tombol Selanjutnya */}
        <button
          type="button"
          onClick={() => goToStep(currentStep + 1)}
          disabled={currentStep >= 23}
          aria-label="Layar selanjutnya"
          style={{
            background: currentStep >= 23 ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.2)",
            border: "none",
            color: currentStep >= 23 ? "rgba(255,255,255,0.4)" : "#fff",
            borderRadius: 999,
            padding: "6px 10px",
            display: "flex",
            alignItems: "center",
            gap: 2,
            cursor: currentStep >= 23 ? "not-allowed" : "pointer",
            fontSize: "0.75rem",
            fontWeight: 600,
          }}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Modal / Dialog Peta 23 Layar Desain Aplikasi */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(6px)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
          onClick={() => setModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#FAF7F2",
              borderRadius: 24,
              maxWidth: 780,
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
              border: `1px solid ${colors.line}`,
              display: "flex",
              flexDirection: "column",
              fontFamily: font.sans,
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "20px 24px",
                borderBottom: `1px solid ${colors.line}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: colors.green,
                color: "#fff",
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Smartphone size={20} color={colors.caramel} />
                  <h2
                    style={{
                      margin: 0,
                      fontFamily: font.display,
                      fontSize: "1.35rem",
                      fontWeight: 700,
                    }}
                  >
                    Alur Lengkap Aplikasi (23 Layar HP)
                  </h2>
                </div>
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: "0.78rem",
                    opacity: 0.9,
                    color: colors.cream,
                  }}
                >
                  Urut dari atas-kiri sampai bawah-kanan sesuai gambar desain
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "none",
                  borderRadius: 999,
                  width: 34,
                  height: 34,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#fff",
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div
              style={{
                padding: "20px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              {/* BARIS 1 */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 10,
                  }}
                >
                  <span
                    style={{
                      background: colors.green,
                      color: "#fff",
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      padding: "2px 8px",
                      borderRadius: 6,
                    }}
                  >
                    BARIS 1
                  </span>
                  <span
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: colors.ink,
                    }}
                  >
                    Onboarding & Autentikasi (Layar 1 – 9)
                  </span>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
                    gap: 8,
                  }}
                >
                  {FLOW_SCREENS.filter((s) => s.row === 1).map((s) => {
                    const isActive = s.step === currentStep;
                    return (
                      <button
                        key={s.step}
                        type="button"
                        onClick={() => goToStep(s.step)}
                        style={{
                          textAlign: "left",
                          padding: "10px 12px",
                          borderRadius: 12,
                          border: isActive
                            ? `2px solid ${colors.green}`
                            : `1px solid ${colors.line}`,
                          background: isActive ? `${colors.green}12` : "#fff",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                          transition: "all .15s",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.82rem",
                              fontWeight: 700,
                              color: isActive ? colors.green : colors.ink,
                            }}
                          >
                            {s.title}
                          </span>
                          {isActive && (
                            <span
                              style={{
                                width: 8,
                                height: 8,
                                borderRadius: 999,
                                background: colors.green,
                              }}
                            />
                          )}
                        </div>
                        <span style={{ fontSize: "0.7rem", color: colors.muted }}>
                          {s.subtitle}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* BARIS 2 */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 10,
                  }}
                >
                  <span
                    style={{
                      background: colors.caramel,
                      color: "#fff",
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      padding: "2px 8px",
                      borderRadius: 6,
                    }}
                  >
                    BARIS 2
                  </span>
                  <span
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: colors.ink,
                    }}
                  >
                    Beranda & 7 Menu Kategori (Layar 10 – 17)
                  </span>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
                    gap: 8,
                  }}
                >
                  {FLOW_SCREENS.filter((s) => s.row === 2).map((s) => {
                    const isActive = s.step === currentStep;
                    return (
                      <button
                        key={s.step}
                        type="button"
                        onClick={() => goToStep(s.step)}
                        style={{
                          textAlign: "left",
                          padding: "10px 12px",
                          borderRadius: 12,
                          border: isActive
                            ? `2px solid ${colors.caramel}`
                            : `1px solid ${colors.line}`,
                          background: isActive ? `${colors.caramel}15` : "#fff",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                          transition: "all .15s",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.82rem",
                              fontWeight: 700,
                              color: isActive ? colors.caramel : colors.ink,
                            }}
                          >
                            {s.title}
                          </span>
                          {isActive && (
                            <span
                              style={{
                                width: 8,
                                height: 8,
                                borderRadius: 999,
                                background: colors.caramel,
                              }}
                            />
                          )}
                        </div>
                        <span style={{ fontSize: "0.7rem", color: colors.muted }}>
                          {s.subtitle}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* BARIS 3 */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 10,
                  }}
                >
                  <span
                    style={{
                      background: colors.gold,
                      color: "#fff",
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      padding: "2px 8px",
                      borderRadius: 6,
                    }}
                  >
                    BARIS 3
                  </span>
                  <span
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: colors.ink,
                    }}
                  >
                    Pemesanan, Outlet, Keranjang & Pembayaran (Layar 18 – 23)
                  </span>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
                    gap: 8,
                  }}
                >
                  {FLOW_SCREENS.filter((s) => s.row === 3).map((s) => {
                    const isActive = s.step === currentStep;
                    return (
                      <button
                        key={s.step}
                        type="button"
                        onClick={() => goToStep(s.step)}
                        style={{
                          textAlign: "left",
                          padding: "10px 12px",
                          borderRadius: 12,
                          border: isActive
                            ? `2px solid ${colors.green}`
                            : `1px solid ${colors.line}`,
                          background: isActive ? `${colors.green}12` : "#fff",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                          transition: "all .15s",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.82rem",
                              fontWeight: 700,
                              color: isActive ? colors.green : colors.ink,
                            }}
                          >
                            {s.title}
                          </span>
                          {isActive && (
                            <span
                              style={{
                                width: 8,
                                height: 8,
                                borderRadius: 999,
                                background: colors.green,
                              }}
                            />
                          )}
                        </div>
                        <span style={{ fontSize: "0.7rem", color: colors.muted }}>
                          {s.subtitle}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: "14px 24px",
                borderTop: `1px solid ${colors.line}`,
                background: "#F2EBE1",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottomLeftRadius: 24,
                borderBottomRightRadius: 24,
              }}
            >
              <button
                type="button"
                onClick={() => goToStep(1)}
                style={{
                  background: "none",
                  border: `1px solid ${colors.line}`,
                  color: colors.ink,
                  borderRadius: 8,
                  padding: "8px 14px",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  cursor: "pointer",
                }}
              >
                <RotateCcw size={14} />
                Mulai Ulang dari Layar 1
              </button>

              <button
                type="button"
                onClick={() => goToStep(Math.min(23, currentStep + 1))}
                style={{
                  background: colors.green,
                  border: "none",
                  color: "#fff",
                  borderRadius: 8,
                  padding: "8px 16px",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  cursor: "pointer",
                }}
              >
                Lanjut ke Layar {Math.min(23, currentStep + 1)}
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
