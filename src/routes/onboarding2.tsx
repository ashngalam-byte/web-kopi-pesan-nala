import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/onboarding2')({
  component: OnboardingPage2,
})

function OnboardingPage2() {
  const navigate = useNavigate()

  return (
    <div
      className="nala-phone-frame"
      style={{
        maxWidth: 430,
        minHeight: '100vh',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Montserrat, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Back Arrow */}
      <button
        onClick={() => navigate({ to: '/onboarding' })}
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.8)',
        }}
        aria-label="Back"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12.5 15L7.5 10L12.5 5" stroke="#0E3A23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Top Card */}
      <div
        style={{
          backgroundColor: '#E6D9CC',
          borderRadius: '0 0 32px 32px',
          padding: '56px 24px 28px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* NALA Logo */}
        <img
          src="/nala-logo.png"
          alt="NALA"
          style={{ width: 80, objectFit: 'contain', marginBottom: 16 }}
        />

        {/* 4 icons row */}
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 16 }}>
          {/* Mountain */}
          <span style={{ fontSize: 28 }}>⛰️</span>

          {/* Coffee bean SVG */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <ellipse cx="14" cy="14" rx="10" ry="13" fill="#4A3728" />
            <path d="M14 2 Q10 14 14 26" stroke="#E6D9CC" strokeWidth="1.5" strokeLinecap="round" />
          </svg>

          {/* Fire */}
          <span style={{ fontSize: 28 }}>🔥</span>

          {/* Coffee cup */}
          <span style={{ fontSize: 28 }}>☕</span>
        </div>

        {/* Barista image */}
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <img
            src="https://images.unsplash.com/photo-1521302200778-33e0d58224f24?w=400&q=80"
            alt="Barista"
            onError={(e) => {
              const target = e.currentTarget
              target.style.display = 'none'
              // Fallback barista SVG container
              const fallback = target.nextElementSibling as HTMLElement
              if (fallback) fallback.style.display = 'flex'
            }}
            style={{
              width: 160,
              height: 160,
              objectFit: 'cover',
              borderRadius: '50%',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            }}
          />
          {/* Fallback barista illustration */}
          <div
            style={{
              display: 'none',
              width: 160,
              height: 160,
              borderRadius: '50%',
              backgroundColor: '#C5A882',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            }}
          >
            <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
              {/* Head */}
              <circle cx="45" cy="28" r="16" fill="#F5CBA7" />
              {/* Hair */}
              <ellipse cx="45" cy="15" rx="16" ry="8" fill="#4A3728" />
              {/* Body / apron */}
              <rect x="25" y="52" width="40" height="30" rx="8" fill="#0E3A23" />
              {/* Collar */}
              <rect x="37" y="52" width="16" height="8" rx="2" fill="#fff" />
              {/* Arms */}
              <rect x="10" y="52" width="16" height="8" rx="4" fill="#F5CBA7" />
              <rect x="64" y="52" width="16" height="8" rx="4" fill="#F5CBA7" />
              {/* Cup in hand */}
              <rect x="62" y="56" width="10" height="8" rx="3" fill="#E6D9CC" />
            </svg>
          </div>
        </div>

        {/* Dekorasi dahan kopi */}
        <div style={{ position: 'absolute', left: -20, bottom: 10, opacity: 0.6 }}>
          <span style={{ fontSize: 48 }}>🌿</span>
        </div>
        <div style={{ position: 'absolute', right: -20, bottom: 10, opacity: 0.6, transform: 'scaleX(-1)' }}>
          <span style={{ fontSize: 48 }}>🌿</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 24px 0' }}>
        {/* Label */}
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: '#8B6347',
            textTransform: 'uppercase',
            marginBottom: 8,
            textAlign: 'center',
          }}
        >
          FIND YOUR COFFEE MOOD
        </p>

        {/* Title */}
        <h1
          style={{
            fontSize: 26,
            fontWeight: 800,
            color: '#0E3A23',
            textAlign: 'center',
            margin: '0 0 16px',
            lineHeight: 1.25,
          }}
        >
          Coffee, crafted for you
        </h1>

        {/* Sub-text */}
        <p
          style={{
            fontSize: 14,
            color: '#555',
            textAlign: 'center',
            lineHeight: 1.6,
            marginBottom: 24,
          }}
        >
          choose from classic espresso drinks, smooth milk coffee, and refreshing non-coffee favourites.
        </p>

        {/* Dots indicator */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
          <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#C5B9B0' }} />
          <div style={{ width: 20, height: 6, borderRadius: 3, backgroundColor: '#0E3A23' }} />
          <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#C5B9B0' }} />
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 32px 40px',
        }}
      >
        <button
          onClick={() => navigate({ to: '/home' })}
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: '#111',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Skip
        </button>
        <button
          onClick={() => navigate({ to: '/onboarding3' })}
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: '#fff',
            backgroundColor: '#0E3A23',
            border: 'none',
            borderRadius: 14,
            paddingLeft: 32,
            paddingRight: 32,
            paddingTop: 14,
            paddingBottom: 14,
            cursor: 'pointer',
            letterSpacing: '0.02em',
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}
