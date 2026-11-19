import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/checkout')({
  component: CheckoutPage,
})

type PaymentMethod = 'qris' | 'ewallet' | 'card'

function CheckoutPage() {
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('qris')

  const sectionLabel: React.CSSProperties = {
    fontSize: 15,
    fontWeight: 700,
    color: '#0E3A23',
    marginBottom: 10,
  }

  const card: React.CSSProperties = {
    border: '1.5px solid #E0E0E0',
    borderRadius: 14,
    padding: '14px 16px',
    backgroundColor: '#fff',
  }

  const paymentOptionRow = (method: PaymentMethod, icon: string, label: string, sub?: string): React.ReactNode => (
    <div
      key={method}
      onClick={() => setPaymentMethod(method)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 0',
        borderBottom: method === 'card' ? 'none' : '1px solid #F0F0F0',
        cursor: 'pointer',
      }}
    >
      <span style={{ fontSize: 22, flexShrink: 0 }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: '#0E3A23' }}>{label}</p>
        {sub && <p style={{ margin: 0, fontSize: 12, color: '#888' }}>{sub}</p>}
      </div>
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          border: paymentMethod === method ? '5px solid #0E3A23' : '1.5px solid #ccc',
          backgroundColor: '#fff',
          flexShrink: 0,
          boxSizing: 'border-box',
        }}
      />
    </div>
  )

  return (
    <div
      className="nala-phone-frame"
      style={{
        maxWidth: 430,
        minHeight: '100vh',
        margin: '0 auto',
        fontFamily: 'Montserrat, sans-serif',
        backgroundColor: '#F5F5F5',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '20px 16px 14px',
          gap: 12,
          backgroundColor: '#fff',
        }}
      >
        <button
          onClick={() => navigate({ to: '/cart' })}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: 22,
            cursor: 'pointer',
            color: '#0E3A23',
            fontWeight: 700,
            padding: 0,
          }}
        >
          ←
        </button>
        <span style={{ fontSize: 18, fontWeight: 700, color: '#0E3A23' }}>Checkout</span>
      </div>

      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Alamat Pengiriman */}
        <div>
          <p style={sectionLabel}>Alamat Pengiriman</p>
          <div style={{ ...card, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 22, flexShrink: 0 }}>📍</span>
            <p style={{ flex: 1, margin: 0, fontSize: 14, color: '#333', fontWeight: 500 }}>
              Jl. Surabaya No.12 Malang
            </p>
            <button
              style={{
                background: 'transparent',
                border: 'none',
                color: '#0E3A23',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                fontFamily: 'Montserrat, sans-serif',
                flexShrink: 0,
              }}
            >
              Ubah
            </button>
          </div>
        </div>

        {/* Metode Pengiriman */}
        <div>
          <p style={sectionLabel}>Metode Pengiriman</p>
          <div style={{ ...card, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 22 }}>🚚</span>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: '#0E3A23' }}>
                Antar ke Alamat
              </p>
              <p style={{ margin: 0, fontSize: 11, color: '#888' }}>Delivery to Address</p>
            </div>
            <span style={{ fontWeight: 700, color: '#0E3A23', fontSize: 14 }}>Rp 5.000</span>
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                border: '5px solid #0E3A23',
                backgroundColor: '#fff',
                flexShrink: 0,
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>

        {/* Metode Pembayaran */}
        <div>
          <p style={sectionLabel}>Metode Pembayaran</p>
          <div style={card}>
            {paymentOptionRow('qris', '📱', 'QRIS')}
            {paymentOptionRow('ewallet', '👛', 'E-Wallet', 'OVO, DANA, GOPay')}
            {paymentOptionRow('card', '💳', 'Kartu Kredit/Debit')}
          </div>
        </div>

        {/* Kode Promo */}
        <div
          style={{
            ...card,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 14, color: '#333' }}>🏷️ Kode Promo</span>
          <button
            style={{
              background: 'transparent',
              border: 'none',
              color: '#0E3A23',
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            Gunakan &gt;
          </button>
        </div>

        {/* Total */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            backgroundColor: '#fff',
            borderRadius: 14,
            border: '1.5px solid #E0E0E0',
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 600, color: '#333' }}>Total Pembayaran</span>
          <span style={{ fontSize: 17, fontWeight: 700, color: '#0E3A23' }}>Rp 20.000</span>
        </div>
      </div>

      {/* Sticky CTA */}
      <div
        style={{
          backgroundColor: '#fff',
          padding: '12px 16px 28px',
          boxShadow: '0 -4px 16px rgba(0,0,0,0.07)',
        }}
      >
        <button
          onClick={() => navigate({ to: '/payment-success' })}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: '#0E3A23',
            color: '#fff',
            border: 'none',
            borderRadius: 14,
            fontSize: 16,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'Montserrat, sans-serif',
          }}
        >
          Bayar Sekarang
        </button>
      </div>
    </div>
  )
}
