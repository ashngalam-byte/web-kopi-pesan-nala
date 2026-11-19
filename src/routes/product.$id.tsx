import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { findProduct } from '@/data/products'

export const Route = createFileRoute('/product/$id')({
  component: ProductDetailPage,
})

function ProductDetailPage() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const product = findProduct(id)

  const [selectedSize, setSelectedSize] = useState<string>('M')
  const [qty, setQty] = useState(1)

  const productImage = product?.image ?? 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&q=80'
  const productName = product?.name ?? 'Nala Coffee Milk'
  const productPrice = product?.price ?? 13000
  const productRating = product?.rating ?? 4.8
  const productReviews = product?.reviews ?? 1200
  const sizes = product?.sizes ?? ['S', 'M', 'L']

  const formatPrice = (p: number) => `Rp${p.toLocaleString('id-ID')}*`

  return (
    <div
      className="nala-phone-frame"
      style={{
        maxWidth: 430,
        minHeight: '100vh',
        margin: '0 auto',
        fontFamily: 'Montserrat, sans-serif',
        backgroundColor: '#f5f5f5',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* Product Image */}
      <div style={{ position: 'relative', width: '100%', height: 280 }}>
        <img
          src={productImage}
          alt={productName}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {/* Back Arrow */}
        <button
          onClick={() => navigate({ to: '/menu', search: { cat: product?.category ?? 'coffee' } })}
          style={{
            position: 'absolute',
            top: 20,
            left: 16,
            background: 'rgba(0,0,0,0.3)',
            border: 'none',
            borderRadius: '50%',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#fff',
            fontSize: 18,
          }}
        >
          ←
        </button>
      </div>

      {/* White card */}
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '24px 24px 0 0',
          marginTop: -24,
          padding: '28px 20px 32px',
          minHeight: 'calc(100vh - 256px)',
        }}
      >
        {/* Name & Price */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0E3A23', margin: 0, flex: 1 }}>
            {productName}
          </h1>
          <span style={{ fontSize: 20, fontWeight: 700, color: '#0E3A23', marginLeft: 8 }}>
            {formatPrice(productPrice)}
          </span>
        </div>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 8, gap: 6 }}>
          <span style={{ color: '#F5A623', fontSize: 16 }}>★</span>
          <span style={{ fontWeight: 700, fontSize: 14, color: '#333' }}>{productRating}</span>
          <span style={{ fontSize: 13, color: '#888' }}>({productReviews.toLocaleString('id-ID')} ulasan)</span>
        </div>

        {/* Size */}
        <div style={{ marginTop: 24 }}>
          <p style={{ fontWeight: 700, fontSize: 15, color: '#0E3A23', marginBottom: 10 }}>Ukuran</p>
          <div style={{ display: 'flex', gap: 10 }}>
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  border: selectedSize === s ? 'none' : '1.5px solid #ccc',
                  backgroundColor: selectedSize === s ? '#0E3A23' : '#fff',
                  color: selectedSize === s ? '#fff' : '#333',
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: 'pointer',
                  fontFamily: 'Montserrat, sans-serif',
                  transition: 'all 0.2s',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Qty */}
        <div style={{ marginTop: 24 }}>
          <p style={{ fontWeight: 700, fontSize: 15, color: '#0E3A23', marginBottom: 10 }}>Jumlah</p>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: '#F2F2F2',
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              style={{
                width: 44,
                height: 44,
                border: 'none',
                background: 'transparent',
                fontSize: 22,
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
                minWidth: 36,
                textAlign: 'center',
                fontWeight: 700,
                fontSize: 16,
                color: '#0E3A23',
              }}
            >
              {qty}
            </span>
            <button
              onClick={() => setQty(qty + 1)}
              style={{
                width: 44,
                height: 44,
                border: 'none',
                background: 'transparent',
                fontSize: 22,
                fontWeight: 700,
                cursor: 'pointer',
                color: '#0E3A23',
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              +
            </button>
          </div>
        </div>

        {/* Spacer */}
        <div style={{ marginTop: 32 }} />

        {/* CTA Button */}
        <button
          onClick={() => navigate({ to: '/outlet', search: { productId: id } })}
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
            letterSpacing: 0.5,
          }}
        >
          Pilih Outlet
        </button>
      </div>
    </div>
  )
}
