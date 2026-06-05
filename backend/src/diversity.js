function tokenize(value) {
  return new Set(
    String(value || "")
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s]/gu, " ")
      .split(/\s+/)
      .filter(Boolean),
  )
}

function jaccard(left, right) {
  const intersection = [...left].filter((token) => right.has(token)).length
  const union = new Set([...left, ...right]).size
  return union === 0 ? 0 : intersection / union
}

export function calculateDiversityScore({
  product,
  selectedProducts = [],
  recentProductIds = [],
  categoryCounts = {},
}) {
  const categoryPenalty = Math.min(0.45, (categoryCounts[product.category] ?? 0) * 0.16)
  const repetitionPenalty = recentProductIds.includes(product.id) ? 0.35 : 0
  const productNameTokens = tokenize(product.name)
  const similarityPenalty = selectedProducts.reduce((maxPenalty, selected) => {
    const similarity = jaccard(productNameTokens, tokenize(selected.name))
    return Math.max(maxPenalty, similarity * 0.25)
  }, 0)

  return Math.max(0, Math.min(1, 1 - categoryPenalty - repetitionPenalty - similarityPenalty))
}
