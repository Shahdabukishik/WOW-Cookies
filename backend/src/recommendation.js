const CATEGORY_WEIGHT = 0.35
const POPULARITY_WEIGHT = 0.25
const RATING_WEIGHT = 0.2
const FRESHNESS_WEIGHT = 0.12
const NOVELTY_WEIGHT = 0.08

function eventBaseWeight(type) {
  if (type === "add_to_cart") return 3.2
  if (type === "click") return 1.8
  return 1
}

function sourceBoost(source) {
  if (!source) return 1
  if (source.includes("recommendation")) return 1.25
  if (source.includes("details")) return 1.12
  return 1
}

function recencyMultiplier(createdAt) {
  const days = daysSince(createdAt)
  if (days <= 7) return 1.35
  if (days <= 14) return 1.2
  if (days <= 30) return 1.08
  return 1
}

function normalizeMap(scores) {
  const values = Object.values(scores)
  const max = values.length ? Math.max(...values) : 1
  if (max <= 0) return scores
  const normalized = {}
  Object.entries(scores).forEach(([key, value]) => {
    normalized[key] = value / max
  })
  return normalized
}

function daysSince(dateValue) {
  const now = Date.now()
  const date = new Date(dateValue).getTime()
  const diff = Math.max(0, now - date)
  return diff / (1000 * 60 * 60 * 24)
}

function scoreFreshness(product) {
  const days = daysSince(product.created_at)
  return Math.max(0, 1 - days / 120)
}

function scoreRating(product) {
  const rating = typeof product.rating === "number" ? product.rating : 0
  return Math.max(0, Math.min(1, rating / 5))
}

function computeCategoryAffinity(userInteractions, userOrders) {
  const categoryScores = {}

  userInteractions.forEach((row) => {
    const category = row?.products?.category
    if (!category) return
    const weight =
      eventBaseWeight(row.type) *
      sourceBoost(row.source) *
      recencyMultiplier(row.created_at)
    categoryScores[category] = (categoryScores[category] ?? 0) + weight
  })

  userOrders.forEach((row) => {
    const category = row?.products?.category
    if (!category) return
    categoryScores[category] = (categoryScores[category] ?? 0) + (row.quantity ?? 1) * 2.8
  })

  return normalizeMap(categoryScores)
}

function computePopularity(products, globalInteractions, globalOrders) {
  const popularityByProduct = {}
  const productIds = new Set(products.map((product) => product.id))

  globalInteractions.forEach((row) => {
    if (!productIds.has(row.product_id)) return
    const weight =
      eventBaseWeight(row.type) *
      sourceBoost(row.source) *
      recencyMultiplier(row.created_at)
    popularityByProduct[row.product_id] = (popularityByProduct[row.product_id] ?? 0) + weight
  })

  globalOrders.forEach((row) => {
    if (!productIds.has(row.product_id)) return
    popularityByProduct[row.product_id] =
      (popularityByProduct[row.product_id] ?? 0) + (row.quantity ?? 1) * 2.2
  })

  return normalizeMap(popularityByProduct)
}

function coldStartPick(products, popularity) {
  const scored = products.map((product) => {
    const popularityScore = popularity[product.id] ?? 0
    const ratingScore = scoreRating(product)
    const freshnessScore = scoreFreshness(product)
    const score = popularityScore * 0.55 + ratingScore * 0.3 + freshnessScore * 0.15
    return { product, score }
  })

  scored.sort((a, b) => b.score - a.score)
  return scored[0] ?? null
}

function interactedSet(userInteractions, userOrders) {
  const ids = new Set()
  userInteractions.forEach((row) => ids.add(row.product_id))
  userOrders.forEach((row) => ids.add(row.product_id))
  return ids
}

export function pickRecommendation({
  products,
  userInteractions,
  userOrders,
  globalInteractions,
  globalOrders,
}) {
  if (!Array.isArray(products) || products.length === 0) {
    return null
  }

  const categoryAffinity = computeCategoryAffinity(userInteractions, userOrders)
  const popularity = computePopularity(products, globalInteractions, globalOrders)
  const seenProducts = interactedSet(userInteractions, userOrders)
  const isColdStart = Object.keys(categoryAffinity).length === 0 && seenProducts.size === 0

  if (isColdStart) {
    const fallback = coldStartPick(products, popularity)
    if (!fallback) return null
    return {
      product: fallback.product,
      score: fallback.score,
      reasons: {
        categoryScore: 0,
        popularityScore: popularity[fallback.product.id] ?? 0,
        ratingScore: scoreRating(fallback.product),
        freshnessScore: scoreFreshness(fallback.product),
        noveltyScore: 1,
        strategy: "cold_start_trending",
      },
    }
  }

  const scored = products.map((product) => {
    const categoryScore = categoryAffinity[product.category] ?? 0
    const popularityScore = popularity[product.id] ?? 0
    const ratingScore = scoreRating(product)
    const freshnessScore = scoreFreshness(product)
    const noveltyScore = seenProducts.has(product.id) ? 0.15 : 1

    const score =
      categoryScore * CATEGORY_WEIGHT +
      popularityScore * POPULARITY_WEIGHT +
      ratingScore * RATING_WEIGHT +
      freshnessScore * FRESHNESS_WEIGHT +
      noveltyScore * NOVELTY_WEIGHT

    return {
      product,
      score,
      reasons: {
        categoryScore,
        popularityScore,
        ratingScore,
        freshnessScore,
        noveltyScore,
      },
    }
  })

  scored.sort((a, b) => b.score - a.score)
  return scored[0] ?? null
}
