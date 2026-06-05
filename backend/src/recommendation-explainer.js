const TYPE_LABELS = {
  category_affinity: "category_affinity",
  session_affinity: "session_affinity",
  similar_users: "similar_users",
  popular_this_week: "popular_this_week",
  highly_rated: "highly_rated",
  new_arrival: "new_arrival",
  diverse_pick: "diverse_pick",
}

const CATEGORY_LABELS = {
  cookie: "cookies",
  drink: "drinks",
  box: "gift boxes",
}

function clampConfidence(score) {
  return Math.max(0, Math.min(100, Math.round(Number(score || 0) * 100)))
}

function inferType(reasons = {}) {
  if ((reasons.sessionScore ?? 0) >= 0.45) return TYPE_LABELS.session_affinity
  if ((reasons.categoryScore ?? 0) >= 0.45) return TYPE_LABELS.category_affinity
  if ((reasons.popularityScore ?? 0) >= 0.55) return TYPE_LABELS.popular_this_week
  if ((reasons.ratingScore ?? 0) >= 0.85) return TYPE_LABELS.highly_rated
  if ((reasons.freshnessScore ?? 0) >= 0.7) return TYPE_LABELS.new_arrival
  if ((reasons.diversityScore ?? 0) >= 0.8) return TYPE_LABELS.diverse_pick
  if (reasons.strategy === "cold_start_trending") return TYPE_LABELS.popular_this_week
  return TYPE_LABELS.similar_users
}

export function explainRecommendation(product, score, reasons = {}) {
  const recommendation_type = inferType(reasons)
  const categoryLabel = CATEGORY_LABELS[product.category] ?? "this category"
  const copy = {
    category_affinity: `Recommended because you frequently engage with ${categoryLabel}.`,
    session_affinity: `Recommended because you recently browsed ${categoryLabel}.`,
    similar_users: "Trending among users with similar interests.",
    popular_this_week: "Popular this week.",
    highly_rated: "Highly rated by customers.",
    new_arrival: "A fresh pick from our newest products.",
    diverse_pick: "A fresh pick to keep your recommendations varied.",
  }

  return {
    recommendation_reason: copy[recommendation_type],
    recommendation_type,
    confidence_score: clampConfidence(score),
  }
}
