import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
  images?: string[];
};

export type ProductsResponse = {
  products: Product[];
  total?: number;
  skip?: number;
  limit?: number;
};

export async function fetchProducts(limit = 30, skip = 0): Promise<Product[]> {
  const url = `${BASE_URL}/products?limit=${limit}&skip=${skip}`;
  const { data } = await axios.get<ProductsResponse>(url, {
    headers: { 'Cache-Control': 'no-store' },
  });
  return data.products ?? [];
}

export async function fetchProductById(id: number): Promise<Product> {
  const url = `${BASE_URL}/products/${id}`;
  const { data } = await axios.get<Product>(url, {
    headers: { 'Cache-Control': 'no-store' },
  });
  return data;
}