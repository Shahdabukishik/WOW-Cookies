import type { Product } from "../types/database.types"

export const useTopRated = (products: Product[]) => {
  return products.filter(p => (p.rating ?? 0) >= 4.5).slice(0, 4)
}