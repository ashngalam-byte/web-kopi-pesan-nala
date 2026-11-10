import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { CategoryChips, PageHeader, PrimaryButton, ProductCard, Screen } from "@/components/nala";
import { colors, font, SCREEN_MAX_WIDTH } from "@/lib/design";
import { useCart } from "@/lib/cart";
import { CATEGORIES, productsByCategory } from "@/data/products";
import type { CategoryId, Size } from "@/lib/types";

export const Route = createFileRoute("/menu/$category")({
  head: ({ params }: { params: { category: string } }) => {
    const cat = CATEGORIES.find((c) => c.id === params.category);
    return {
      meta: [
        { title: `${cat?.title ?? "Menu"} — Nala Coffee Roastery` },
        { name: "description", content: "Menu Nala Coffee Roastery, pesan favoritmu." },
      ],
    };
  },
  loader: async ({ params }: { params: { category: string } }) => {
    if (!CATEGORIES.some((c) => c.id === params.category)) {
      throw redirect({ to: "/menu/$category", params: { category: "coffee" }, replace: true });
    }
    return { category: params.category as CategoryId };
  },
  component: MenuCategoryPage,
});

/* ══════════════════════════════════════════
   LAYAR 11–17 — MENU PER KATEGORI
   (desain: baris 2, kolom 2–8)
   Layar 11 = Coffee Menu
   Layar 12 = Drink Non-Coffee Menu
   Layar 13 = Food Menu
   Layar 14 = Snack Menu
   Layar 15 = Signature Coffee Menu
   Layar 16 = Manual Brew Menu
   Layar 17 = Beans Coffee Menu
══════════════════════════════════════════ */
function MenuCategoryPage() {
  const navigate = useNavigate();
  const { category } = Route.useLoaderData();
  const cart = useCart();
  const activeCat = CATEGORIES.find((c) => c.id === category);

  const [selection, setSelection] = useState<Record<string, { qty: number; size: Size }>>({});

  const items = useMemo(() => productsByCategory(category), [category]);


  // Background khusus Signature Coffee Menu (Layar 15)
  const isSignature = category === "signature";
  const pageBg = isSignature ? "#F0E9DF" : colors.paper;

  function getSelection(productId: string, sizes: Size[]): { qty: number; size: Size } {
    const existing = selection[productId];
    if (existing) return existing;
    return { qty: 0, size: sizes.includes("M") ? "M" : (sizes[0] ?? "M") };
  }

  function updateSelection(productId: string, patch: Partial<{ qty: number; size: Size }>) {
    setSelection((prev) => {
      const current = getSelection(productId, []);
      return { ...prev, [productId]: { ...current, ...patch } };
    });
  }

  function addToCart() {
    const picked = items
      .map((product) => ({ product, sel: getSelection(product.id, product.sizes ?? []) }))
      .filter(({ sel }) => sel.qty > 0);

    if (picked.length === 0) {
      // Jika pengguna belum memilih jumlah, otomatis tambahkan produk unggulan Nala Coffee Milk / pertama
      const featured = items[0];
      if (featured) {
        cart.add(
          {
            productId: featured.id,
            name: featured.name,
            image: featured.image,
            price: featured.price,
            size: featured.sizes?.length ? "M" : null,
          },
          1,
        );
        toast.success(`1x ${featured.name} ditambahkan ke keranjang`);
      }
      void navigate({ to: "/product/$id", params: { id: "nala-coffee-milk" } });
      return;
    }

    for (const { product, sel } of picked) {
      cart.add(
        {
          productId: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          size: product.sizes?.length ? sel.size : null,
        },
        sel.qty,
      );
    }
    // Lanjut ke Layar 18 (Detail Produk) atau Layar 20 (Keranjang)
    void navigate({
      to: "/product/$id",
      params: { id: picked[0]?.product.id ?? "nala-coffee-milk" },
    });
  }

  return (
    <Screen bg={pageBg}>
      <div style={{ flex: 1, paddingBottom: 24 }}>
        <PageHeader
          title={activeCat?.title ?? "Menu"}
          onBack={() => void navigate({ to: "/home" })}
        />


        {/* Baris Chip 7 Kategori Menu */}
        <CategoryChips
          items={CATEGORIES.map((c) => ({ id: c.id, label: c.label }))}
          value={category}
          onChange={(id) => void navigate({ to: "/menu/$category", params: { category: id } })}
        />

        {/* Grid Produk 2 Kolom Sesuai Mockup */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            padding: "8px 20px 0",
          }}
        >
          {items.map((product) => {
            const sel = getSelection(product.id, product.sizes ?? []);
            const sizes = product.sizes ?? [];
            return (
              <ProductCard
                key={product.id}
                product={product}
                qty={sel.qty}
                size={sizes.length ? sel.size : null}
                onQtyChange={(qty) => updateSelection(product.id, { qty })}
                onSizeChange={
                  sizes.length ? (size) => updateSelection(product.id, { size }) : undefined
                }
                onOpenDetail={() =>
                  void navigate({ to: "/product/$id", params: { id: product.id } })
                }
                style={{ minWidth: 0 }}
              />
            );
          })}
        </div>
      </div>

      {/* Tombol Add to Cart Melekat di Bawah Sesuai Desain */}
      <div
        style={{
          position: "sticky",
          bottom: 0,
          background: `linear-gradient(to top, ${pageBg} 75%, ${pageBg}00)`,
          padding: "14px 20px 20px",
          maxWidth: SCREEN_MAX_WIDTH,
          width: "100%",
          alignSelf: "center",
        }}
      >
        <PrimaryButton onClick={addToCart}>Add to Cart</PrimaryButton>
      </div>
    </Screen>
  );
}
