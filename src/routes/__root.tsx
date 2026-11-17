import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F0F3FA", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "4rem", fontWeight: 800, color: "#1a1a2e" }}>404</h1>
        <p style={{ color: "#888", marginBottom: 16 }}>Halaman tidak ditemukan</p>
        <Link to="/" style={{ background: "#6C63FF", color: "#fff", padding: "10px 24px", borderRadius: 12, textDecoration: "none", fontWeight: 600 }}>Ke Beranda</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F0F3FA", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ textAlign: "center", padding: "0 24px" }}>
        <p style={{ fontWeight: 700, color: "#1a1a2e", marginBottom: 8 }}>Halaman tidak dapat dimuat</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button onClick={() => { router.invalidate(); reset(); }}
            style={{ background: "#6C63FF", color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", cursor: "pointer" }}>
            Coba lagi
          </button>
          <a href="/" style={{ background: "#F0F3FA", color: "#1a1a2e", border: "1px solid #ddd", borderRadius: 10, padding: "10px 20px", textDecoration: "none" }}>
            Beranda
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <head>
        <HeadContent />
      </head>
      <body style={{ margin: 0, background: "#F0F3FA" }}>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
