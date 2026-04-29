import { useCallback, useEffect, useState } from "react"
import { getProducts } from "../services/products.service"
import type { Product } from "../types/database.types"

type UseProductsOptions = {
  includeInactive?: boolean
}

export const useProducts = (options: UseProductsOptions = {}) => {
  const includeInactive = options.includeInactive ?? false
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const refreshProducts = useCallback(() => {
    setLoading(true)

    return getProducts({ includeInactive })
      .then(setProducts)
      .finally(() => setLoading(false))
  }, [includeInactive])

  useEffect(() => {
    let isMounted = true

    getProducts({ includeInactive })
      .then((nextProducts) => {
        if (isMounted) setProducts(nextProducts)
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [includeInactive])

  return { products, loading, refreshProducts }
}
