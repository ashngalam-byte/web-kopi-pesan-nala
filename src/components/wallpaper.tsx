import type { ReactNode } from "react";

/**
 * Full-screen wallpaper for register and login screens.
 * Layout split: foto portrait Artboard 6 ditampilkan dua kali di kiri & kanan
 * sehingga foto tampil utuh tanpa terpotong, mengisi layar landscape.
 */
export function Wallpaper({ children }: { children: ReactNode }) {
  return (
    <main
      className="relative min-h-screen overflow-hidden px-4 py-10"
      style={{ background: "#083628" }}
    >
      {/* Dua foto portrait berdampingan — masing-masing tampil penuh */}
      <div className="pointer-events-none absolute inset-0 flex">
        {/* Kiri */}
        <div className="flex-1 overflow-hidden" style={{ opacity: 0.45 }}>
          <img
            src="/Artboard 6.png"
            alt=""
            aria-hidden="true"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "left center",
            }}
          />
        </div>
        {/* Kanan — mirror/repeat */}
        <div className="flex-1 overflow-hidden" style={{ opacity: 0.45 }}>
          <img
            src="/Artboard 6.png"
            alt=""
            aria-hidden="true"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "right center",
            }}
          />
        </div>
      </div>

      {/* Overlay gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(8,54,40,0.6) 0%, rgba(8,54,40,0.35) 40%, rgba(8,54,40,0.35) 60%, rgba(8,54,40,0.6) 100%)",
        }}
      />

      {/* Form card tengah */}
      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md flex-col justify-center">
        <div
          className="rounded-2xl p-8 shadow-2xl backdrop-blur-md"
          style={{
            background: "rgba(255,255,255,0.96)",
            border: "1px solid rgba(178,153,115,0.3)",
          }}
        >
          {children}
        </div>
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
