import type { ReactNode } from "react";

/**
 * Full-screen wallpaper for register and login screens.
 * Uses bungkusan beans real.jpeg — foto packaging fisik tanpa teks dominan,
 * cocok jadi background landscape tanpa elemen penting yang terpotong.
 */
export function Wallpaper({ children }: { children: ReactNode }) {
  return (
    <main
      className="relative min-h-screen overflow-hidden px-4 py-10"
      style={{ background: "#083628" }}
    >
      {/* Background foto — eksterior toko Nala Coffee Roastory, landscape, cocok wallpaper */}
      <img
        src="/nala-exterior.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "center center" }}
      />

      {/* Overlay hijau gelap brand — reduksi foto agar form tetap terbaca */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, rgba(8,54,40,0.82) 0%, rgba(8,54,40,0.65) 50%, rgba(8,54,40,0.78) 100%)" }}
      />

      {/* Vignette tepi */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ boxShadow: "inset 0 0 180px 60px rgba(8,54,40,0.5)" }}
      />

      {/* Form card */}
      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md flex-col justify-center">
        <div
          className="rounded-2xl p-8 shadow-2xl backdrop-blur-md"
          style={{
            background: "rgba(255,255,255,0.95)",
            border: "1px solid rgba(178,153,115,0.3)",
          }}
        >
          {children}
        </div>

        {/* Brand tagline di bawah card */}
        <p
          className="mt-6 text-center"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "1.1rem",
            color: "rgba(178,153,115,0.9)",
          }}
        >
          Good Coffee, Better Days.
        </p>
      </div>
    </main>
  );
}
