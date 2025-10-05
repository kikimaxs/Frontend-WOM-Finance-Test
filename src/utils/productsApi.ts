import { getData } from '@/src/utils/httpclient';

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail?: string;
  images?: string[];
  rating?: number;
  brand?: string;
  category?: string;
};

export type ProductsResponse = {
  products: Product[];
};

export async function fetchProducts(): Promise<Product[]> {
  const res = await getData<ProductsResponse>('https://dummyjson.com/products');
  return res.data.products ?? [];
}

export async function fetchProductDetail(productId: number): Promise<Product | null> {
  const res = await getData<Product>(`https://dummyjson.com/products/${productId}`);
  return res.data ?? null;
}