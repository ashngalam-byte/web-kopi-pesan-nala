import type { ReactNode } from "react";
import wallpaper from "@/assets/arabica-wallpaper.jpg";

/**
 * Full-screen coffee wallpaper used behind the register and login screens.
 * The cream gradient keeps the form panel readable while the beans stay visible.
 */
export function Wallpaper({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-4 py-10">
      <img
        src={wallpaper}
        alt=""
        aria-hidden="true"
        width={1920}
        height={1088}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/25 to-background/45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 shadow-[inset_0_0_200px_70px_oklch(0.22_0.03_60/0.30)]"
      />
      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md flex-col justify-center">
        <div className="rounded-2xl border border-border/70 bg-card/85 p-8 shadow-2xl backdrop-blur-lg">
          {children}
        </div>
      </div>
    </main>
  );
}
