import type { Product } from "../types/database.types"

export const useMostSelling = (products: Product[]) => {
  return [...products]
    .sort((a, b) => (b.sales ?? 0) - (a.sales ?? 0))
    .slice(0, 4)
}