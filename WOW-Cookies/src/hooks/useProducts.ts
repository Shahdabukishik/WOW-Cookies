import { useEffect, useState } from "react"
import { getProducts } from "../services/products.service"
import type { Product } from "../types/database.types"

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .finally(() => setLoading(false))
  }, [])

  return { products, loading }
}