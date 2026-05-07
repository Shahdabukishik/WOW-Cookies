import { useEffect, useMemo, useState } from "react"
import { useProductFilters } from "@/features/products/useProductFilters"
import { useOffersProducts } from "@/hooks/useOffersProducts"
import { useOffersState } from "@/hooks/useOffers"
import { useProducts } from "@/hooks/useProducts"
import { getProductOffers } from "@/services/productOffers"
import type { product_offers } from "@/types/database.types"

export const useProductsCatalog = () => {
  const { products, loading } = useProducts()
  const { offers, loading: offersLoading } = useOffersState()
  const [productOffers, setProductOffers] = useState<product_offers[]>([])
  const [productOffersLoading, setProductOffersLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    getProductOffers()
      .then((data) => {
        if (mounted) setProductOffers(data || [])
      })
      .catch(console.error)
      .finally(() => {
        if (mounted) setProductOffersLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  const productsWithOffers = useOffersProducts(products, offers, productOffers)
  const filters = useProductFilters(productsWithOffers)
  const isLoading = loading || offersLoading || productOffersLoading

  return {
    filters,
    isLoading,
  }
}

export const useOfferProductsCatalog = () => {
  const catalog = useProductsCatalog()

  const offerProducts = useMemo(
    () => catalog.filters.visibleProducts.filter((product) => product.discount),
    [catalog.filters.visibleProducts]
  )

  return {
    offerProducts,
    isLoading: catalog.isLoading,
  }
}

