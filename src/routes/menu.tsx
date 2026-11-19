import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CATEGORIES, productsByCategory } from "@/data/products";
import type { CategoryId } from "@/lib/types";

export const Route = createFileRoute("/menu")({
  validateSearch: (s) => ({ cat: (s['cat'] as string) || "coffee" }),
  component: MenuPage,
});

const PRIMARY = "#0E3A23";
const TAB_IDS: CategoryId[] = [
  "coffee",
  "non-coffee",
  "food",
  "snack",
  "signature",
  "manual-brew",
  "beans",
];

function formatRp(price: number) {
  return `Rp ${(price / 1000).toFixed(0)}.000*`;
}

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      <span style={{ color: "#F5A623", fontSize: 11 }}>★</span>
      <span style={{ fontSize: 11, color: "#555" }}>
        {rating} ({reviews.toLocaleString()} ulasan)
      </span>
    </div>
  );
}

function MenuPage() {
  const { cat } = Route.useSearch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<CategoryId>((cat as CategoryId) || "coffee");
  const [qty, setQty] = useState<Record<string, number>>({});
  const [sizes, setSizes] = useState<Record<string, string>>({});

  const catInfo = CATEGORIES.find((c) => c.id === activeTab)!;
  const products = productsByCategory(activeTab);
  const noSize = activeTab === "beans" || activeTab === "manual-brew";
  const detailCandidate = products.find((p) => (qty[p.id] ?? 0) > 0) ?? products[0];

  function openProduct(id: string) {
    navigate({ to: "/product/$id", params: { id } });
  }

  function setProductQty(id: string, delta: number) {
    setQty((prev) => {
      const next = Math.max(0, (prev[id] ?? 0) + delta);
      return { ...prev, [id]: next };
    });
  }

  function handleTabChange(tab: CategoryId) {
    setActiveTab(tab);
    navigate({ to: "/menu", search: { cat: tab }, replace: true });
  }

  return (
    <div
      className="nala-phone-frame"
      style={{
        width: "100%",
        maxWidth: 430,
        minHeight: "100vh",
        backgroundColor: "#faf8f5",
        fontFamily: "'Montserrat', sans-serif",
        paddingBottom: 90,
        overflowX: "hidden",
      }}
    >
      {/* ── Header ──────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "16px 16px 10px",
          backgroundColor: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <button
          onClick={() => navigate({ to: "/home" })}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 4, lineHeight: 1 }}
          aria-label="Kembali"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke={PRIMARY} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div>
          <h1 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: PRIMARY, lineHeight: 1.2 }}>
            {catInfo.title}
          </h1>
          <p style={{ margin: 0, fontSize: 11, color: "#888" }}>{catInfo.subtitle}</p>
        </div>
      </div>

      {/* ── Tab Bar ─────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          gap: 8,
          overflowX: "auto",
          padding: "10px 16px",
          backgroundColor: "#fff",
          borderBottom: "1px solid #eee",
          scrollbarWidth: "none",
        }}
      >
        {TAB_IDS.map((tabId) => {
          const cat = CATEGORIES.find((c) => c.id === tabId)!;
          const isActive = activeTab === tabId;
          return (
            <button
              key={tabId}
              onClick={() => handleTabChange(tabId)}
              style={{
                flexShrink: 0,
                padding: "7px 14px",
                borderRadius: 20,
                border: "none",
                backgroundColor: isActive ? PRIMARY : "#F0EFEF",
                color: isActive ? "#fff" : "#555",
                fontSize: 12,
                fontWeight: isActive ? 700 : 500,
                cursor: "pointer",
                fontFamily: "'Montserrat', sans-serif",
                whiteSpace: "nowrap",
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* ── Product Grid ────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 12,
          padding: "16px 12px",
        }}
      >
        {products.map((product) => {
          const count = qty[product.id] ?? 0;
          const selectedSize = sizes[product.id] ?? "M";
          function setSize(sz: string) {
            setSizes((prev) => ({ ...prev, [product.id]: sz }));
          }

          return (
            <div
              key={product.id}
              style={{
                backgroundColor: "#fff",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
              }}
            >
              {/* Product Image */}
              <div
                onClick={() => openProduct(product.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && openProduct(product.id)}
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  overflow: "hidden",
                  backgroundColor: "#ddd",
                  cursor: "pointer",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>

              {/* Card Body */}
              <div style={{ padding: "10px 10px 12px" }}>
                {/* Rating */}
                {product.rating && (
                  <StarRating rating={product.rating} reviews={product.reviews ?? 0} />
                )}

                {/* Name */}
                <p
                  onClick={() => openProduct(product.id)}
                  style={{
                    margin: "4px 0 2px",
                    fontSize: 13,
                    fontWeight: 700,
                    color: PRIMARY,
                    lineHeight: 1.3,
                    cursor: "pointer",
                  }}
                >
                  {product.name}
                </p>

                {/* Description */}
                <p
                  style={{
                    margin: "0 0 6px",
                    fontSize: 10,
                    color: "#777",
                    lineHeight: 1.4,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {product.desc}
                </p>

                {/* Price */}
                <p
                  style={{
                    margin: "0 0 8px",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#222",
                  }}
                >
                  {formatRp(product.price)}
                  {product.unit && (
                    <span style={{ fontWeight: 400, fontSize: 10, color: "#888" }}>
                      {" "}/{product.unit}
                    </span>
                  )}
                </p>

                {/* Size Selector */}
                {product.sizes && product.sizes.length > 0 && (
                  <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSize(sz)}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 7,
                          border: `1.5px solid ${selectedSize === sz ? PRIMARY : "#ddd"}`,
                          backgroundColor: selectedSize === sz ? PRIMARY : "#fff",
                          color: selectedSize === sz ? "#fff" : "#555",
                          fontSize: 11,
                          fontWeight: 700,
                          cursor: "pointer",
                          fontFamily: "'Montserrat', sans-serif",
                        }}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                )}

                {/* Qty Counter */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#444" }}>Jumlah</span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0,
                      backgroundColor: "#F0EFEF",
                      borderRadius: 20,
                      overflow: "hidden",
                    }}
                  >
                    <button
                      onClick={() => setProductQty(product.id, -1)}
                      style={{
                        width: 28,
                        height: 28,
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        fontSize: 16,
                        fontWeight: 700,
                        color: PRIMARY,
                        lineHeight: 1,
                      }}
                    >
                      −
                    </button>
                    <span
                      style={{
                        minWidth: 20,
                        textAlign: "center",
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#222",
                      }}
                    >
                      {count}
                    </span>
                    <button
                      onClick={() => setProductQty(product.id, 1)}
                      style={{
                        width: 28,
                        height: 28,
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        fontSize: 16,
                        fontWeight: 700,
                        color: PRIMARY,
                        lineHeight: 1,
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Footer Fixed — Add to Cart ───────────────── */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: 430,
          padding: "12px 16px calc(20px + env(safe-area-inset-bottom))",
          backgroundColor: "#fff",
          borderTop: "1px solid #eee",
          zIndex: 100,
        }}
      >
        <button
          onClick={() => {
            if (detailCandidate) {
              navigate({ to: "/product/$id", params: { id: detailCandidate.id } });
            }
          }}
          style={{
            width: "100%",
            padding: "15px",
            backgroundColor: PRIMARY,
            color: "#fff",
            border: "none",
            borderRadius: 14,
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "'Montserrat', sans-serif",
            boxShadow: "0 4px 14px rgba(14,58,35,0.3)",
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
