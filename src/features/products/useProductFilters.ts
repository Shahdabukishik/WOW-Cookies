import { useCallback, useMemo, useState } from "react"
import type { Product } from "@/types/database.types"

export const useProductFilters = <ProductItem extends Product>(products: ProductItem[]) => {
  const [selectedCategories, setSelectedCategories] = useState<Product["category"][]>([])
  const [sortOrder, setSortOrder] = useState<"price-asc" | "price-desc">("price-asc")

  const categoryOptions = useMemo<Product["category"][]>(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  )

  const visibleProducts = useMemo(() => {
    const filtered =
      selectedCategories.length === 0
        ? products
        : products.filter((p) => selectedCategories.includes(p.category))

    return [...filtered].sort((a, b) =>
      sortOrder === "price-asc" ? a.price - b.price : b.price - a.price
    )
  }, [products, selectedCategories, sortOrder])

  const resetFilters = () => {
    setSelectedCategories([])
    setSortOrder("price-asc")
  }

  const toggleCategory = useCallback((category: Product["category"]) => {
    setSelectedCategories((currentCategories) =>
      currentCategories.includes(category)
        ? currentCategories.filter((currentCategory) => currentCategory !== category)
        : [...currentCategories, category]
    )
  }, [])

  return {
    selectedCategories,
    setSelectedCategories,
    sortOrder,
    setSortOrder,
    categoryOptions,
    visibleProducts,
    resetFilters,
    toggleCategory,
  }
}
