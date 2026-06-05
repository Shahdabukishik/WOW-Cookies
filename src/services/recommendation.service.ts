import { supabase } from "@/lib/supabaseClient"
import type { Product, RecommendationProduct } from "@/types/database.types"
import {
  getRecentRecommendedProductIds,
  getSessionInteractionProductIds,
} from "@/services/recommendation-events.service"
import { generateRecommendationExplanation } from "@/utils/recommendation-explainer"

type RecommendationResponse = {
  recommended_product_id?: string
  product?: Product
  score?: number
  reasons?: Record<string, number | string>
  recommendation_reason?: string
  recommendation_type?: RecommendationProduct["recommendation_type"]
  confidence_score?: number
}

const recommendationApiBaseUrl = import.meta.env.VITE_RECOMMENDATION_API_URL as string | undefined

export async function fetchHeroRecommendation(products: Product[]): Promise<RecommendationProduct | null> {
  if (!recommendationApiBaseUrl || products.length === 0) return null

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const params = new URLSearchParams()
  if (user?.id) {
    params.set("user_id", user.id)
  }
  getSessionInteractionProductIds().forEach((productId) => {
    params.append("session_product_id", productId)
  })
  getRecentRecommendedProductIds().forEach((productId) => {
    params.append("recent_recommended_id", productId)
  })

  const response = await fetch(
    `${recommendationApiBaseUrl}/api/recommendations/hero?${params.toString()}`,
  )

  if (!response.ok) return null

  const payload = (await response.json()) as RecommendationResponse
  const recommendedId = payload.recommended_product_id ?? payload.product?.id

  if (!recommendedId) return null
  const product = products.find((item) => item.id === recommendedId) ?? payload.product
  if (!product) return null

  const fallbackExplanation = generateRecommendationExplanation(
    product,
    payload.score ?? 0.5,
    payload.reasons,
  )

  return {
    ...product,
    recommendation_reason: payload.recommendation_reason ?? fallbackExplanation.recommendation_reason,
    recommendation_type: payload.recommendation_type ?? fallbackExplanation.recommendation_type,
    confidence_score: payload.confidence_score ?? fallbackExplanation.confidence_score,
  }
}
