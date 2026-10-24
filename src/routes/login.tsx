import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { Eye, EyeOff, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Wallpaper } from "@/components/wallpaper";
import { getCurrentUser, loginUser, logoutUser } from "@/lib/auth.functions";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Masuk Akun" },
      { name: "description", content: "Masuk ke akun Anda dengan email dan password." },
      { property: "og:title", content: "Masuk Akun" },
      { property: "og:description", content: "Masuk ke akun Anda dengan email dan password." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  loader: () => getCurrentUser(),
  component: Login,
});

function Login() {
  const user = Route.useLoaderData();
  const navigate = useNavigate();
  const router = useRouter();
  const { queryClient } = Route.useRouteContext();
  const login = useServerFn(loginUser);
  const logout = useServerFn(logoutUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await login({ data: { email, password } });
      if (!result.ok) setError(result.error);
      else {
        setPassword("");
        await router.invalidate();
        await navigate({ to: "/menu", replace: true });
      }
    } catch {
      setError("Login belum dapat diproses. Coba lagi sebentar.");
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    setLoading(true);
    setError(null);
    try {
      await queryClient.cancelQueries();
      queryClient.clear();
      await logout();
      await router.invalidate();
      await navigate({ to: "/login", replace: true });
    } catch {
      setError("Gagal keluar. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Wallpaper>
      <p className="font-heading text-xs font-semibold uppercase tracking-[0.4em] text-primary">Selamat datang kembali</p>
      <h1 className="mt-2 break-words font-display text-5xl font-bold text-foreground" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.06em" }}>
        {user ? `HALO, ${user.name.toUpperCase()}.` : "MASUK AKUN."}
      </h1>

      {user ? (
        <div className="mt-8 space-y-5">
          <p className="break-all text-muted-foreground">{user.email}</p>
          <p className="text-foreground">Anda berhasil masuk.</p>
          <Button className="h-12 w-full" disabled={loading} onClick={signOut}>
            <LogOut />
            {loading ? "Keluar..." : "Keluar"}
          </Button>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-8 space-y-5">
          <label className="block">
            <span className="text-sm text-muted-foreground">Email</span>
            <input
              type="email"
              autoComplete="email"
              required
              maxLength={255}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border-b-2 border-input bg-transparent py-2 text-lg text-foreground outline-none focus:border-primary"
            />
          </label>
          <label className="block">
            <span className="text-sm text-muted-foreground">Password</span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                maxLength={128}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full border-b-2 border-input bg-transparent py-2 pr-12 text-lg text-foreground outline-none focus:border-primary"
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="absolute right-0 top-2"
                title={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>
          </label>
          <Button type="submit" disabled={loading} className="h-12 w-full">
            {loading ? "Memasuki..." : "Masuk"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Belum punya akun?{" "}
            <Button asChild variant="link" className="h-auto p-0">
              <Link to="/">Daftar</Link>
            </Button>
          </p>
        </form>
      )}

      {error && (
        <p role="alert" className="mt-4 text-sm text-destructive">
          {error}
        </p>
      )}
    </Wallpaper>
  );
}
