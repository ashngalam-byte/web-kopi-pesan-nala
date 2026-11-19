import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { NalaLogo } from "@/components/NalaLogo";

export const Route = createFileRoute("/")({
  component: SplashScreen,
});

function SplashScreen() {
  const navigate = useNavigate();

  // Auto-redirect ke /login setelah 2.5 detik
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate({ to: "/login" });
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#E6D9CC",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <NalaLogo size={200} />
    </div>
  );
}
