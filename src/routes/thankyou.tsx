import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/thankyou')({
  component: ThankyouPage,
})

function ThankyouPage() {
  const navigate = useNavigate()

  return (
    <div
      className="nala-phone-frame"
      style={{
        maxWidth: 430,
        minHeight: '100vh',
        margin: '0 auto',
        fontFamily: 'Montserrat, sans-serif',
        backgroundColor: '#0E3A23',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Back Arrow */}
      <button
        onClick={() => navigate({ to: '/payment-success' })}
        style={{
          position: 'absolute',
          top: 20,
          left: 16,
          background: 'transparent',
          border: 'none',
          fontSize: 22,
          cursor: 'pointer',
          color: '#fff',
          fontWeight: 700,
          zIndex: 10,
        }}
      >
        ←
      </button>

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 28px 32px',
          textAlign: 'center',
        }}
      >
        {/* Logo */}
        <img
          src="/nala-logo.png"
          alt="NALA"
          style={{ width: 120, filter: 'brightness(0) invert(1)', marginBottom: 28 }}
        />

        {/* Thank you text */}
        <h1
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: '#fff',
            margin: '0 0 6px',
            letterSpacing: 0.5,
          }}
        >
          Terima Kasih!
        </h1>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', margin: '0 0 20px' }}>
          Thank You!
        </p>

        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', margin: '0 0 6px', lineHeight: 1.5 }}>
          Sampai jumpa di pesanan berikutnya!
        </p>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', margin: '0 0 32px' }}>
          See you on your next order!
        </p>

        {/* Divider */}
        <div
          style={{
            width: '80%',
            height: 1,
            backgroundColor: 'rgba(255,255,255,0.2)',
            marginBottom: 24,
          }}
        />

        {/* Brand footer text */}
        <p
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: '#fff',
            letterSpacing: 2,
            textTransform: 'uppercase',
            margin: '0 0 6px',
          }}
        >
          NALA COFFEE ROASTORY
        </p>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', margin: 0, fontStyle: 'italic' }}>
          Taste the Quality, Feel the Story.
        </p>
      </div>

      {/* Bottom coffee image */}
      <img
        src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80"
        alt="Coffee"
        style={{
          width: '100%',
          height: 260,
          objectFit: 'cover',
          display: 'block',
          flexShrink: 0,
        }}
      />
    </div>
  )
}
