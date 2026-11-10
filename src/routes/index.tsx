import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { NalaLogo, Screen } from "@/components/nala";
import { colors, font } from "@/lib/design";
import { getCurrentUser } from "@/lib/auth.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nala Coffee Roastory" },
      { name: "description", content: "Nala Coffee Roastory — Good Coffee, Better Days." },
    ],
  }),
  loader: async () => ({ user: await getCurrentUser() }),
  component: SplashPage,
});

/* ══════════════════════════════════════════
   LAYAR 1 — SPLASH (desain: kiri atas)
   Latar krem penuh, logo NALA di tengah,
   lanjot ke login setelah 2,5 detik.
══════════════════════════════════════════ */
function SplashPage() {
  const navigate = useNavigate();
  const user = Route.useLoaderData().user;

  useEffect(() => {
    const target = user ? "/home" : "/login";
    const t = setTimeout(() => navigate({ to: target, replace: true }), 2500);
    return () => clearTimeout(t);
  }, [navigate, user]);

  return (
    <Screen bg={colors.cream}>
      <div
        onClick={() => navigate({ to: user ? "/home" : "/login", replace: true })}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          padding: 24,
        }}
      >
        <NalaLogo size={150} />
        <p
          style={{
            marginTop: 28,
            fontFamily: font.sans,
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            color: colors.green,
            fontWeight: 600,
          }}
        >
          GOOD COFFEE, BETTER DAYS
        </p>
      </div>

      {/* Link ke papan 23 layar desain */}
      <div
        style={{
          padding: "0 24px 20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link
          to="/showcase"
          style={{
            fontFamily: font.sans,
            fontSize: "0.72rem",
            fontWeight: 700,
            color: colors.green,
            opacity: 0.6,
            textDecoration: "none",
            letterSpacing: "0.05em",
          }}
        >
          📱 Lihat 23 Desain Layar
        </Link>
      </div>
    </Screen>
  );
}
