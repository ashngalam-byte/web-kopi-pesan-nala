/** Tipe domain bersama untuk aplikasi ordering NALA Coffee Roastery. */

export type Size = "S" | "M" | "L";

export type CategoryId =
  "coffee" | "non-coffee" | "food" | "snack" | "signature" | "manual-brew" | "beans";

export type Product = {
  id: string;
  category: CategoryId;
  name: string;
  desc: string;
  /** Harga dalam rupiah. */
  price: number;
  /** Path aset lokal atau URL foto produk. */
  image: string;
  /** Satuan tampil setelah harga, mis. "250g". */
  unit?: string | undefined;
  /** Rating ulasan; tidak ada untuk produk tanpa ulasan. */
  rating?: number | undefined;
  /** Jumlah ulasan; tanpa rating ini diabaikan. */
  reviews?: number | undefined;
  /** Pilihan ukuran (minuman). Kosong/tidak ada = produk tanpa ukuran. */
  sizes?: Size[] | undefined;
};

/** Item keranjang: produk + varian ukuran + kuantitas. */
export type CartItem = {
  productId: string;
  name: string;
  image: string;
  price: number;
  size: Size | null;
  qty: number;
};

export type Outlet = {
  id: string;
  name: string;
  address: string;
  distanceKm: number;
};

export type SessionUser = {
  id: string;
  name: string;
  email: string;
};
