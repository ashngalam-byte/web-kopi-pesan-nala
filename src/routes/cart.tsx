import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/cart')({
  component: CartPage,
})

function CartPage() {
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [removed, setRemoved] = useState(false)

  const price = 13000
  const serviceFee = 2000
  const subtotal = qty * price
  const total = subtotal + serviceFee

  const formatRp = (n: number) => `Rp ${n.toLocaleString('id-ID')}`

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
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '20px 16px 12px',
          gap: 12,
        }}
      >
        <button
          onClick={() => navigate({ to: '/outlet' })}
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
        <span style={{ fontSize: 18, fontWeight: 700, color: '#0E3A23' }}>Keranjang</span>
      </div>

      <div style={{ padding: '0 16px 100px', flex: 1 }}>
        {/* Cart Item */}
        {!removed ? (
          <div
            style={{
              backgroundColor: '#F9F9F9',
              borderRadius: 14,
              padding: '14px 12px',
              marginBottom: 20,
            }}
          >
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <img
                src="https://images.unsplash.com/photo-1541167760496-1628856ab772?w=200&q=80"
                alt="Nala Coffee Milk"
                style={{ width: 68, height: 68, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }}
              />
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 700, fontSize: 15, color: '#0E3A23', margin: '0 0 2px' }}>
                  Nala Coffee Milk
                </p>
                <p style={{ fontSize: 12, color: '#888', margin: '0 0 4px' }}>Medium</p>
                <p style={{ fontWeight: 700, fontSize: 14, color: '#0E3A23', margin: 0 }}>
                  Rp13.000*
                </p>
              </div>
            </div>

            {/* Qty + Delete */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 12,
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: '#EFEFEF',
                  borderRadius: 10,
                }}
              >
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  style={{
                    width: 36,
                    height: 36,
                    border: 'none',
                    background: 'transparent',
                    fontSize: 20,
                    fontWeight: 700,
                    cursor: 'pointer',
                    color: '#0E3A23',
                    fontFamily: 'Montserrat, sans-serif',
                  }}
                >
                  −
                </button>
                <span
                  style={{
                    minWidth: 28,
                    textAlign: 'center',
                    fontWeight: 700,
                    fontSize: 15,
                    color: '#0E3A23',
                  }}
                >
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  style={{
                    width: 36,
                    height: 36,
                    border: 'none',
                    background: 'transparent',
                    fontSize: 20,
                    fontWeight: 700,
                    cursor: 'pointer',
                    color: '#0E3A23',
                    fontFamily: 'Montserrat, sans-serif',
                  }}
                >
                  +
                </button>
              </div>

              <button
                onClick={() => setRemoved(true)}
                style={{
                  backgroundColor: '#FFEBEE',
                  color: '#E53935',
                  border: 'none',
                  borderRadius: 8,
                  padding: '7px 14px',
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                  fontFamily: 'Montserrat, sans-serif',
                }}
              >
                🗑 Hapus
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '32px 0',
              color: '#888',
              fontSize: 14,
            }}
          >
            Keranjang kosong
          </div>
        )}

        {/* Divider */}
        <div style={{ height: 1, backgroundColor: '#F0F0F0', margin: '8px 0' }} />

        {/* Summary */}
        <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 14, color: '#666' }}>Subtotal</span>
            <span style={{ fontSize: 14, color: '#333', fontWeight: 600 }}>
              {removed ? 'Rp 0' : formatRp(subtotal)}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 14, color: '#666' }}>Biaya Layanan</span>
            <span style={{ fontSize: 14, color: '#333', fontWeight: 600 }}>{formatRp(serviceFee)}</span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, backgroundColor: '#F0F0F0', margin: '8px 0' }} />

        {/* Total */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 0',
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 700, color: '#0E3A23' }}>Total</span>
          <span style={{ fontSize: 18, fontWeight: 700, color: '#0E3A23' }}>
            {removed ? 'Rp 2.000' : formatRp(total)}
          </span>
        </div>
      </div>

      {/* Sticky CTA */}
      <div
        style={{
          position: 'sticky',
          bottom: 0,
          backgroundColor: '#fff',
          padding: '12px 16px calc(24px + env(safe-area-inset-bottom))',
          boxShadow: '0 -4px 16px rgba(0,0,0,0.07)',
        }}
      >
        <button
          onClick={() => navigate({ to: '/checkout' })}
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
          Checkout →
        </button>
      </div>
    </div>
  )
}
