import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Screen } from "@/components/nala";
import { colors, font, radius } from "@/lib/design";

export const Route = createFileRoute("/onboarding")({
  validateSearch: (search: Record<string, unknown>) => ({
    step: typeof search["step"] === "number" ? search["step"] : Number(search["step"]) || 1,
  }),
  head: () => ({
    meta: [
      { title: "Selamat Datang — Nala Coffee Roastery" },
      { name: "description", content: "Kenalan dengan Nala Coffee Roastery." },
    ],
  }),
  component: OnboardingPage,
});

/* ══════════════════════════════════════════
   LAYAR 7–9 — ONBOARDING 3 SLIDE
   (desain: baris 1, kolom 7–9)
   Layar 7 = Onboarding 1: Discover your perfect cup
   Layar 8 = Onboarding 2: Coffee, crafted for you
   Layar 9 = Onboarding 3: From Aceh Gayo to your cup
══════════════════════════════════════════ */
const SLIDES = [
  {
    step: 1,
    screenNumber: 7,
    title: "Discover your perfect cup",
    desc: "Explore specialty coffee, from rich espresso to smooth, handcrafted brews and single-origin coffee beans roasted daily.",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&q=80",
    badge: "Specialty Selection",
  },
  {
    step: 2,
    screenNumber: 8,
    title: "Coffee, crafted for you",
    desc: "Discover our signature drinks and classic favorites, expertly crafted with passion by experienced baristas for your unforgettable coffee moment.",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=900&q=80",
    badge: "Artisan Craftsmanship",
  },
  {
    step: 3,
    screenNumber: 9,
    title: "From Aceh Gayo to your cup",
    desc: "Carefully sourced beans directly from Indonesia's finest local farmers, freshly roasted in-house by Nala Coffee Roastery.",
    image: "/bungkusan beans real.jpeg",
    badge: "100% Single Origin Gayo",
  },
];

function OnboardingPage() {
  const navigate = useNavigate();
  const { step } = Route.useSearch();
  const activeStep = Math.min(3, Math.max(1, step || 1));
  const slideIndex = activeStep - 1;
  const slide = SLIDES[slideIndex] ?? SLIDES[0]!;
  const isLast = activeStep === 3;

  function handleNext() {
    if (isLast) {
      void navigate({ to: "/home", replace: true });
    } else {
      void navigate({ to: "/onboarding", search: { step: activeStep + 1 } });
    }
  }

  function handleSkip() {
    void navigate({ to: "/home", replace: true });
  }

  return (
    <Screen bg={colors.cream}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: "16px 24px 28px",
        }}
      >
        {/* Header Onboarding */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginBottom: 12,
          }}
        >
          <button
            type="button"
            onClick={handleSkip}
            style={{
              background: "none",
              border: "none",
              padding: "4px 8px",
              cursor: "pointer",
              fontFamily: font.sans,
              fontWeight: 700,
              fontSize: "0.82rem",
              color: colors.muted,
            }}
          >
            Lewati
          </button>
        </div>

        {/* Gambar Utama Onboarding */}
        <div
          style={{
            position: "relative",
            flex: 1,
            minHeight: 260,
            borderRadius: radius.card,
            overflow: "hidden",
            boxShadow: "0 8px 24px rgba(8, 54, 40, 0.08)",
            background: colors.paper,
          }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 12,
              left: 12,
              background: "rgba(8, 54, 40, 0.8)",
              color: "#fff",
              padding: "4px 12px",
              borderRadius: 999,
              fontSize: "0.7rem",
              fontWeight: 700,
              fontFamily: font.sans,
              backdropFilter: "blur(6px)",
            }}
          >
            {slide.badge}
          </div>
        </div>

        {/* Indikator Dots Pagination [ ● ○ ○ ] */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            marginTop: 20,
          }}
        >
          {SLIDES.map((s) => (
            <button
              key={s.step}
              type="button"
              aria-label={`Ke slide ${s.step}`}
              onClick={() => void navigate({ to: "/onboarding", search: { step: s.step } })}
              style={{
                width: s.step === activeStep ? 24 : 8,
                height: 8,
                borderRadius: 999,
                background: s.step === activeStep ? colors.green : "rgba(8, 54, 40, 0.2)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "all .25s ease",
              }}
            />
          ))}
        </div>

        {/* Judul & Deskripsi Slide */}
        <h1
          style={{
            margin: "18px 0 0",
            textAlign: "center",
            fontFamily: font.display,
            fontWeight: 700,
            fontSize: "1.45rem",
            color: colors.ink,
          }}
        >
          {slide.title}
        </h1>
        <p
          style={{
            margin: "10px 0 0",
            textAlign: "center",
            fontFamily: font.sans,
            fontSize: "0.82rem",
            lineHeight: 1.65,
            color: colors.muted,
          }}
        >
          {slide.desc}
        </p>

        {/* Tombol Aksi Bawah */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
            paddingTop: 24,
            gap: 12,
          }}
        >
          <button
            type="button"
            onClick={handleSkip}
            style={{
              background: "none",
              border: `1px solid ${colors.line}`,
              padding: "12px 18px",
              borderRadius: radius.button,
              cursor: "pointer",
              fontFamily: font.sans,
              fontWeight: 700,
              fontSize: "0.85rem",
              color: colors.ink,
            }}
          >
            Lewati
          </button>

          <button
            type="button"
            onClick={handleNext}
            style={{
              flex: 1,
              background: colors.green,
              color: "#fff",
              border: "none",
              borderRadius: radius.button,
              padding: "13px 24px",
              cursor: "pointer",
              fontFamily: font.sans,
              fontWeight: 700,
              fontSize: "0.95rem",
              boxShadow: "0 4px 14px rgba(8, 54, 40, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            {isLast ? "Mulai Sekarang" : "Lanjut"} →
          </button>
        </div>
      </div>
    </Screen>
  );
}
