import type { Product } from "@/types/database.types"

export type DiversityInput = {
  product: Pick<Product, "id" | "category" | "name">
  selectedProducts?: Pick<Product, "id" | "category" | "name">[]
  recentProductIds?: string[]
  categoryCounts?: Record<string, number>
}

const tokenize = (value: string): Set<string> =>
  new Set(
    value
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s]/gu, " ")
      .split(/\s+/)
      .filter(Boolean),
  )

const jaccardSimilarity = (left: Set<string>, right: Set<string>): number => {
  const intersection = [...left].filter((token) => right.has(token)).length
  const union = new Set([...left, ...right]).size
  return union === 0 ? 0 : intersection / union
}

export const calculateDiversityScore = ({
  product,
  selectedProducts = [],
  recentProductIds = [],
  categoryCounts = {},
}: DiversityInput): number => {
  const categoryCount = categoryCounts[product.category] ?? 0
  const categoryPenalty = Math.min(0.45, categoryCount * 0.16)
  const repetitionPenalty = recentProductIds.includes(product.id) ? 0.35 : 0
  const productNameTokens = tokenize(product.name)
  const similarityPenalty = selectedProducts.reduce((maxPenalty, selected) => {
    const similarity = jaccardSimilarity(productNameTokens, tokenize(selected.name))
    return Math.max(maxPenalty, similarity * 0.25)
  }, 0)

  return Math.max(0, Math.min(1, 1 - categoryPenalty - repetitionPenalty - similarityPenalty))
}
