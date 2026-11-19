import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/onboarding3')({
  component: OnboardingPage3,
})

function OnboardingPage3() {
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
        onClick={() => navigate({ to: '/onboarding2' })}
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
        {/* Sparkle decoration top-left */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 24,
            fontSize: 24,
            color: '#8B6347',
            lineHeight: 1,
          }}
        >
          ✦
        </div>
        <div
          style={{
            position: 'absolute',
            top: 44,
            left: 40,
            fontSize: 14,
            color: '#8B6347',
            lineHeight: 1,
          }}
        >
          ✦
        </div>

        {/* Latte art circular image (top view) */}
        <img
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80"
          alt="Latte Art Top View"
          style={{
            width: 150,
            height: 150,
            objectFit: 'cover',
            borderRadius: '50%',
            boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
            marginBottom: 16,
          }}
        />

        {/* Coffee packaging placeholder */}
        <div
          style={{
            backgroundColor: '#E6D9CC',
            border: '2px solid #C5B9B0',
            borderRadius: 16,
            padding: '12px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          <img
            src="/nala-logo.png"
            alt="NALA Coffee Beans"
            style={{ width: 70, objectFit: 'contain' }}
          />
          <p
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: '#8B6347',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            ACEH GAYO BEANS
          </p>
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
          TASTE THE ORIGIN
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
          From Aceh Gayo to your cup
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
          Explore speciality beans manual brew selections, carefully presented by Nala Coffee Roastory.
        </p>

        {/* Dots indicator */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
          <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#C5B9B0' }} />
          <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#C5B9B0' }} />
          <div style={{ width: 20, height: 6, borderRadius: 3, backgroundColor: '#0E3A23' }} />
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
          onClick={() => navigate({ to: '/home' })}
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
