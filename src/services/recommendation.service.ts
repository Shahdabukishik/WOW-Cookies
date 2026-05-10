import { supabase } from "@/lib/supabaseClient"
import type { Product } from "@/types/database.types"

type RecommendationResponse = {
  recommended_product_id?: string
  product?: Product
}

const recommendationApiBaseUrl = import.meta.env.VITE_RECOMMENDATION_API_URL as string | undefined

export async function fetchHeroRecommendation(products: Product[]): Promise<Product | null> {
  if (!recommendationApiBaseUrl || products.length === 0) return null

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const params = new URLSearchParams()
  if (user?.id) {
    params.set("user_id", user.id)
  }

  const response = await fetch(
    `${recommendationApiBaseUrl}/api/recommendations/hero?${params.toString()}`,
  )

  if (!response.ok) return null

  const payload = (await response.json()) as RecommendationResponse
  const recommendedId = payload.recommended_product_id ?? payload.product?.id

  if (!recommendedId) return null
  return products.find((product) => product.id === recommendedId) ?? null
}
