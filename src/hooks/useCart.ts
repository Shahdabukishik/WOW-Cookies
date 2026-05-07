import { useCallback, useEffect, useMemo, useState } from "react"
import { useOffersProducts } from "@/hooks/useOffersProducts"
import { useOffersState } from "@/hooks/useOffers"
import { useProducts } from "@/hooks/useProducts"
import { getProductOffers } from "@/services/productOffers"
import {
  computeTotalPrice,
  mapCartLinesToViews,
  type PricedProduct,
} from "@/services/cart.service"
import { useCartStore } from "@/stores/cart.store"
import type { Product, product_offers } from "@/types/database.types"

const formatPrice = (price: number): string => `${price.toFixed(2)} ₪`

const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : "Could not load cart products"

export const useCart = () => {
  const lines = useCartStore((state) => state.items)
  const addCartLine = useCartStore((state) => state.addToCart)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const removeMany = useCartStore((state) => state.removeMany)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const toggleItemSelection = useCartStore((state) => state.toggleItemSelection)

  const { products, loading: productsLoading, refreshProducts } = useProducts()
  const { offers, loading: offersLoading } = useOffersState()
  const [productOffers, setProductOffers] = useState<product_offers[]>([])
  const [productOffersLoading, setProductOffersLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refreshProductOffers = useCallback(async () => {
    setProductOffersLoading(true)
    setError(null)

    try {
      const nextProductOffers = await getProductOffers()
      setProductOffers(nextProductOffers ?? [])
    } catch (loadError) {
      setError(getErrorMessage(loadError))
    } finally {
      setProductOffersLoading(false)
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    getProductOffers()
      .then((nextProductOffers) => {
        if (isMounted) setProductOffers(nextProductOffers ?? [])
      })
      .catch((loadError: unknown) => {
        if (isMounted) setError(getErrorMessage(loadError))
      })
      .finally(() => {
        if (isMounted) setProductOffersLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const pricedProducts = useOffersProducts(products, offers, productOffers)

  const items = useMemo(
    () => mapCartLinesToViews(lines, pricedProducts),
    [lines, pricedProducts]
  )

  const selectedItemIds = useMemo(
    () => lines.filter((line) => line.selected).map((line) => line.id),
    [lines]
  )

  const selectedItems = useMemo(
    () => items.filter((item) => item.selected),
    [items]
  )

  const totalPrice = useMemo(
    () => computeTotalPrice(selectedItems),
    [selectedItems]
  )

  const addToCart = useCallback(
    (product: Product | PricedProduct) => {
      addCartLine(product.id)
    },
    [addCartLine]
  )

  const refreshCart = useCallback(async () => {
    await Promise.all([refreshProducts(), refreshProductOffers()])
  }, [refreshProductOffers, refreshProducts])

  return {
    items,
    lines,
    selectedItems,
    selectedItemIds,
    selectedItemsCount: selectedItems.length,
    totalPrice,
    totalPriceLabel: formatPrice(totalPrice),
    hasItems: lines.length > 0,
    canCheckout: selectedItems.length > 0 && totalPrice > 0,
    loading: productsLoading || offersLoading || productOffersLoading,
    mutating: false,
    error,

    addToCart,
    removeFromCart,
    removeMany,
    updateQuantity,
    toggleItemSelection,
    refreshCart,
  }
}
