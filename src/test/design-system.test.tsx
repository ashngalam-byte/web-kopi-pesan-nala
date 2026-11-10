import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CategoryChips } from "@/components/nala/category-chips";
import { OtpInput } from "@/components/nala/otp-input";
import { ProductCard } from "@/components/nala/product-card";
import { QuantityStepper } from "@/components/nala/quantity-stepper";
import { colors, formatDecimal, formatRp } from "@/lib/design";
import type { Product } from "@/lib/types";

const sampleProduct: Product = {
  id: "coffee-1",
  category: "coffee",
  name: "Americano",
  desc: "Perpaduan espresso dan air panas",
  price: 13000,
  rating: 4.8,
  reviews: 1200,
  image: "/nala-brand.jpg",
  sizes: ["S", "M", "L"],
};

describe("Design tokens", () => {
  it("memakai warna brand dari desain terpilih", () => {
    expect(colors.green).toBe("#083628");
    expect(colors.caramel).toBe("#CF8E52");
    expect(colors.cream).toBe("#E8D8C9");
  });

  it("memformat rupiah dan desimal gaya Indonesia", () => {
    expect(formatRp(13000)).toBe("Rp13.000");
    expect(formatRp(15000, true)).toBe("Rp 15.000");
    expect(formatDecimal(4.8)).toBe("4,8");
  });
});

describe("QuantityStepper", () => {
  it("menaikkan dan menurunkan nilai", () => {
    const onChange = vi.fn();
    render(<QuantityStepper value={1} onChange={onChange} min={0} />);

    fireEvent.click(screen.getByRole("button", { name: "Tambah" }));
    expect(onChange).toHaveBeenLastCalledWith(2);

    fireEvent.click(screen.getByRole("button", { name: "Kurangi" }));
    expect(onChange).toHaveBeenLastCalledWith(0);
  });

  it("menonaktifkan tombol kurangi di nilai minimum", () => {
    render(<QuantityStepper value={0} onChange={() => {}} min={0} />);
    expect(screen.getByRole("button", { name: "Kurangi" }).hasAttribute("disabled")).toBe(true);
  });
});

describe("ProductCard", () => {
  it("menampilkan nama, harga, rating, dan ukuran", () => {
    render(
      <ProductCard
        product={sampleProduct}
        qty={0}
        onQtyChange={() => {}}
        size="M"
        onSizeChange={() => {}}
      />,
    );

    expect(screen.getByText("Americano")).toBeTruthy();
    expect(screen.getByText("Rp13.000*")).toBeTruthy();
    expect(screen.getByText("4,8 (1.200 ulasan)")).toBeTruthy();
    expect(screen.getByText("Ukuran")).toBeTruthy();
  });

  it("memanggil onQtyChange saat tambah", () => {
    const onQtyChange = vi.fn();
    render(<ProductCard product={sampleProduct} qty={2} onQtyChange={onQtyChange} />);

    fireEvent.click(screen.getByRole("button", { name: "Tambah" }));
    expect(onQtyChange).toHaveBeenLastCalledWith(3);
  });

  it("menyembunyikan baris ukuran untuk produk tanpa ukuran", () => {
    render(
      <ProductCard
        product={{ ...sampleProduct, sizes: undefined, rating: undefined, reviews: undefined }}
        qty={0}
        onQtyChange={() => {}}
      />,
    );

    expect(screen.queryByText("Ukuran")).toBeNull();
    expect(screen.queryByText(/ulasan/)).toBeNull();
  });
});

describe("CategoryChips", () => {
  const items = [
    { id: "coffee", label: "Coffee" },
    { id: "food", label: "Food" },
  ];

  it("menandai chip aktif dan meneruskan pilihan", () => {
    const onChange = vi.fn();
    render(<CategoryChips items={items} value="coffee" onChange={onChange} />);

    expect(screen.getByRole("button", { name: "Coffee" }).getAttribute("aria-pressed")).toBe(
      "true",
    );
    fireEvent.click(screen.getByRole("button", { name: "Food" }));
    expect(onChange).toHaveBeenCalledWith("food");
  });
});

describe("OtpInput", () => {
  it("menggabungkan digit yang diketik", () => {
    const onChange = vi.fn();
    render(<OtpInput value="" onChange={onChange} length={4} />);

    fireEvent.change(screen.getByLabelText("Digit 1"), { target: { value: "9" } });
    expect(onChange).toHaveBeenLastCalledWith("9");
  });

  it("membatasi panjang kode OTP", () => {
    const onChange = vi.fn();
    render(<OtpInput value="123456" onChange={onChange} length={6} />);

    expect(screen.getByLabelText("Digit 6")).toHaveValue("6");
    expect(screen.queryByLabelText("Digit 7")).toBeNull();
  });
});
