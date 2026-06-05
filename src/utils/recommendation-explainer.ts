import type {
  Product,
  RecommendationExplanation,
  RecommendationType,
} from "@/types/database.types"

export type RecommendationReasonSignals = {
  categoryScore?: number
  sessionScore?: number
  popularityScore?: number
  ratingScore?: number
  freshnessScore?: number
  diversityScore?: number
  strategy?: string
}

const categoryLabels: Record<Product["category"], string> = {
  cookie: "cookies",
  drink: "drinks",
  box: "gift boxes",
}

const clampConfidence = (score: number): number =>
  Math.max(0, Math.min(100, Math.round(score * 100)))

const inferRecommendationType = (
  signals: RecommendationReasonSignals,
): RecommendationType => {
  if ((signals.sessionScore ?? 0) >= 0.45) return "session_affinity"
  if ((signals.categoryScore ?? 0) >= 0.45) return "category_affinity"
  if ((signals.popularityScore ?? 0) >= 0.55) return "popular_this_week"
  if ((signals.ratingScore ?? 0) >= 0.85) return "highly_rated"
  if ((signals.freshnessScore ?? 0) >= 0.7) return "new_arrival"
  if ((signals.diversityScore ?? 0) >= 0.8) return "diverse_pick"
  if (signals.strategy === "cold_start_trending") return "popular_this_week"
  return "similar_users"
}

export const recommendationTypeLabels: Record<RecommendationType, string> = {
  category_affinity: "توافق مع النوع",
  session_affinity: "الاهتمام الأخير",
  similar_users: "مستخدمون متشابهون",
  popular_this_week: "شائع هذا الأسبوع",
  highly_rated: "مرتفع التقييم",
  new_arrival: "وصول جديد",
  diverse_pick: "تنوع جديد",
}

export const generateRecommendationExplanation = (
  product: Product,
  score: number,
  signals: RecommendationReasonSignals = {},
): RecommendationExplanation => {
  const recommendation_type = inferRecommendationType(signals)
  const confidence_score = clampConfidence(score)
  const categoryLabel = categoryLabels[product.category] ?? "this category"

  const reasons: Record<RecommendationType, string> = {
    category_affinity: `موصى به لأنك تتفاعل بشكل متكرر مع ${categoryLabel}.`,
    session_affinity: `موصى به لأنك تصفح ${categoryLabel} مؤخرًا.`,
    similar_users: "تrending بين المستخدمين ذوي الاهتمامات المشابهة.",
    popular_this_week: "شائع هذا الأسبوع.",
    highly_rated: "مرتفع التقييم من قبل العملاء.",
    new_arrival: "اختيار جديد من أحدث منتجاتنا.",
    diverse_pick: "اختيار جديد لجعل توصياتك متنوعة.",
  }

  return {
    recommendation_reason: reasons[recommendation_type],
    recommendation_type,
    confidence_score,
  }
}
