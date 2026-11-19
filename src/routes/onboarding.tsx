import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/onboarding')({
  component: OnboardingPage1,
})

function OnboardingPage1() {
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
        onClick={() => navigate({ to: '/verified' })}
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
          padding: '56px 24px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Coffee machine SVG illustration */}
        <svg width="120" height="80" viewBox="0 0 120 80" fill="none" style={{ marginBottom: 8 }}>
          {/* Table */}
          <rect x="10" y="60" width="100" height="8" rx="4" fill="#8B6347" />
          {/* Machine body */}
          <rect x="30" y="20" width="60" height="42" rx="8" fill="#4A3728" />
          {/* Machine screen */}
          <rect x="40" y="28" width="40" height="16" rx="4" fill="#0E3A23" />
          {/* Steam wand */}
          <rect x="82" y="34" width="4" height="20" rx="2" fill="#8B6347" />
          {/* Cup */}
          <rect x="76" y="52" width="16" height="10" rx="3" fill="#E6D9CC" />
          {/* Steam lines */}
          <path d="M50 10 Q52 6 50 2" stroke="#A0856D" strokeWidth="2" strokeLinecap="round" />
          <path d="M60 10 Q62 6 60 2" stroke="#A0856D" strokeWidth="2" strokeLinecap="round" />
          <path d="M70 10 Q72 6 70 2" stroke="#A0856D" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* NALA Logo */}
        <img src="/nala-logo.png" alt="NALA" style={{ width: 80, marginBottom: 8, objectFit: 'contain' }} />

        {/* Dekorasi dahan kopi kiri */}
        <div style={{ position: 'absolute', left: -20, bottom: 10, opacity: 0.6 }}>
          <span style={{ fontSize: 48 }}>🌿</span>
        </div>
        {/* Dekorasi dahan kopi kanan */}
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
          YOUR DAILY COFFEE RITUAL
        </p>

        {/* Title */}
        <h1
          style={{
            fontSize: 26,
            fontWeight: 800,
            color: '#0E3A23',
            textAlign: 'center',
            margin: '0 0 20px',
            lineHeight: 1.25,
          }}
        >
          Discover your perfect cup
        </h1>

        {/* Latte art image with leaf decorations */}
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', opacity: 0.7 }}>
            <span style={{ fontSize: 36 }}>🌿</span>
          </div>
          <img
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80"
            alt="Latte Art"
            style={{
              width: 220,
              height: 220,
              objectFit: 'cover',
              borderRadius: '50%',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            }}
          />
          <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%) scaleX(-1)', opacity: 0.7 }}>
            <span style={{ fontSize: 36 }}>🌿</span>
          </div>
        </div>

        {/* Sub-text */}
        <p
          style={{
            fontSize: 14,
            color: '#555',
            textAlign: 'center',
            lineHeight: 1.6,
            marginBottom: 24,
            paddingHorizontal: 8,
          } as React.CSSProperties}
        >
          Explore speciality coffee, from rich espresso to smooth manual brews and coffee beans
        </p>

        {/* Dots indicator */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
          <div style={{ width: 20, height: 6, borderRadius: 3, backgroundColor: '#0E3A23' }} />
          <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#C5B9B0' }} />
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
          onClick={() => navigate({ to: '/onboarding2' })}
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
