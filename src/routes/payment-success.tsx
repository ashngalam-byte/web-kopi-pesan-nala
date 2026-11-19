import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/payment-success')({
  component: PaymentSuccessPage,
})

function PaymentSuccessPage() {
  const navigate = useNavigate()

  return (
    <div
      className="nala-phone-frame"
      style={{
        maxWidth: 430,
        minHeight: '100vh',
        margin: '0 auto',
        fontFamily: 'Montserrat, sans-serif',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Back Arrow */}
      <button
        onClick={() => navigate({ to: '/checkout' })}
        style={{
          position: 'absolute',
          top: 20,
          left: 16,
          background: 'transparent',
          border: 'none',
          fontSize: 22,
          cursor: 'pointer',
          color: '#0E3A23',
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
          padding: '60px 24px 32px',
        }}
      >
        {/* Green circle checkmark */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            backgroundColor: '#6BBF7A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
            boxShadow: '0 8px 24px rgba(107,191,122,0.35)',
          }}
        >
          <span style={{ color: '#fff', fontSize: 48, lineHeight: 1, fontWeight: 700 }}>✓</span>
        </div>

        {/* Titles */}
        <h1
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: '#0E3A23',
            margin: '0 0 6px',
            textAlign: 'center',
          }}
        >
          Pembayaran Berhasil!
        </h1>
        <p style={{ fontSize: 14, color: '#888', margin: '0 0 6px' }}>Payment Successful!</p>
        <p style={{ fontSize: 13, color: '#666', margin: '0 0 28px', textAlign: 'center' }}>
          Pesanan Anda sedang diproses
        </p>

        {/* Divider */}
        <div style={{ width: '100%', height: 1, backgroundColor: '#F0F0F0', marginBottom: 24 }} />

        {/* Order number */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <p style={{ fontSize: 13, color: '#888', margin: '0 0 6px' }}>Nomor Pesanan</p>
          <p style={{ fontSize: 22, fontWeight: 800, color: '#0E3A23', margin: 0, letterSpacing: 1 }}>
            #NCR123456
          </p>
        </div>

        {/* Track Order Button */}
        <button
          onClick={() => navigate({ to: '/thankyou' })}
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: '#0E3A23',
            color: '#fff',
            border: 'none',
            borderRadius: 14,
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'Montserrat, sans-serif',
            marginBottom: 32,
          }}
        >
          Lacak Pesanan / Track Your Order
        </button>
      </div>

      {/* Bottom coffee image */}
      <img
        src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80"
        alt="Coffee"
        style={{
          width: '100%',
          height: 220,
          objectFit: 'cover',
          display: 'block',
          flexShrink: 0,
        }}
      />
    </div>
  )
}
