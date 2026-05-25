export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: { rate: number; count: number }
}

const BASE = 'https://fakestoreapi.com'

export const useProducts = () => {
  const fetchProducts = async (): Promise<Product[]> => {
    const res = await fetch(`${BASE}/products`)
    return res.json()
  }

  const fetchProduct = async (id: number | string): Promise<Product> => {
    const res = await fetch(`${BASE}/products/${id}`)
    return res.json()
  }

  const fetchCategories = async (): Promise<string[]> => {
    const res = await fetch(`${BASE}/products/categories`)
    return res.json()
  }

  const fetchByCategory = async (cat: string): Promise<Product[]> => {
    const res = await fetch(`${BASE}/products/category/${encodeURIComponent(cat)}`)
    return res.json()
  }

  return { fetchProducts, fetchProduct, fetchCategories, fetchByCategory }
}
