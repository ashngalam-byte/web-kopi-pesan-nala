import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/outlet')({
  component: OutletPage,
})

const OUTLETS = [
  {
    id: 1,
    name: 'Nala Coffee Roastory',
    address: 'Jl. Surabaya No.12',
    distance: '1.2 Km',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200&q=80',
  },
  {
    id: 2,
    name: 'Nala Coffee Roastory',
    address: 'Jl. Lawang No.3',
    distance: '1.2 Km',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200&q=80',
  },
]

function OutletPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<'pickup' | 'delivery'>('pickup')
  const [selectedOutlet, setSelectedOutlet] = useState<number>(1)

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
          onClick={() => navigate({ to: '/menu', search: { cat: 'coffee' } })}
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
        <span style={{ fontSize: 18, fontWeight: 700, color: '#0E3A23' }}>Pilih Outlet</span>
      </div>

      <div style={{ padding: '0 16px 32px', flex: 1 }}>
        {/* Toggle Pick Up / Delivery */}
        <div
          style={{
            display: 'flex',
            backgroundColor: '#F2F2F2',
            borderRadius: 50,
            padding: 4,
            marginBottom: 20,
          }}
        >
          <button
            onClick={() => setMode('pickup')}
            style={{
              flex: 1,
              padding: '10px 0',
              borderRadius: 50,
              border: 'none',
              backgroundColor: mode === 'pickup' ? '#0E3A23' : 'transparent',
              color: mode === 'pickup' ? '#fff' : '#666',
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              fontFamily: 'Montserrat, sans-serif',
              transition: 'all 0.2s',
            }}
          >
            Pick Up
          </button>
          <button
            onClick={() => setMode('delivery')}
            style={{
              flex: 1,
              padding: '10px 0',
              borderRadius: 50,
              border: 'none',
              backgroundColor: mode === 'delivery' ? '#0E3A23' : 'transparent',
              color: mode === 'delivery' ? '#fff' : '#666',
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              fontFamily: 'Montserrat, sans-serif',
              transition: 'all 0.2s',
            }}
          >
            Delivery
          </button>
        </div>

        {/* Map Placeholder */}
        <div
          style={{
            backgroundColor: '#e8f5e9',
            borderRadius: 16,
            height: 200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
            border: '1.5px solid #c8e6c9',
          }}
        >
          <span style={{ fontSize: 32, marginBottom: 8 }}>📍</span>
          <span style={{ fontWeight: 700, color: '#0E3A23', fontSize: 14 }}>NALA COFFEE ROASTORY</span>
          <span style={{ fontSize: 12, color: '#4CAF50', marginTop: 4 }}>Lihat di peta</span>
        </div>

        {/* Outlet List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {OUTLETS.map((outlet) => (
            <div
              key={outlet.id}
              onClick={() => setSelectedOutlet(outlet.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 14px',
                borderRadius: 14,
                border: selectedOutlet === outlet.id ? '2px solid #0E3A23' : '1.5px solid #E0E0E0',
                backgroundColor: selectedOutlet === outlet.id ? '#f0f7f3' : '#fff',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <img
                src={outlet.image}
                alt={outlet.name}
                style={{ width: 60, height: 60, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }}
              />
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 700, fontSize: 14, color: '#0E3A23', margin: '0 0 2px' }}>
                  {outlet.name}
                </p>
                <p style={{ fontSize: 12, color: '#666', margin: '0 0 2px' }}>{outlet.address}</p>
                <p style={{ fontSize: 12, color: '#4CAF50', margin: 0, fontWeight: 600 }}>
                  📍 {outlet.distance}
                </p>
              </div>
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  border: selectedOutlet === outlet.id ? 'none' : '1.5px solid #ccc',
                  backgroundColor: selectedOutlet === outlet.id ? '#0E3A23' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {selectedOutlet === outlet.id && (
                  <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>✓</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate({ to: '/cart' })}
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
          Pilih Outlet
        </button>
      </div>
    </div>
  )
}
