import { supabase } from "@/lib/supabaseClient"
import type { RecommendationEventType } from "@/types/database.types"

const SESSION_RECOMMENDATION_KEY = "wow_recent_recommendations"
const SESSION_INTERACTION_KEY = "wow_session_product_interactions"

const readSessionList = (key: string): string[] => {
  if (typeof window === "undefined") return []

  try {
    const value = window.sessionStorage.getItem(key)
    const parsed = value ? JSON.parse(value) : []
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : []
  } catch {
    return []
  }
}

const writeSessionList = (key: string, values: string[]) => {
  if (typeof window === "undefined") return
  window.sessionStorage.setItem(key, JSON.stringify(values.slice(-12)))
}

export const rememberRecommendedProduct = (productId: string) => {
  const next = [...readSessionList(SESSION_RECOMMENDATION_KEY), productId]
  writeSessionList(SESSION_RECOMMENDATION_KEY, [...new Set(next)])
}

export const rememberSessionInteraction = (productId: string) => {
  const next = [...readSessionList(SESSION_INTERACTION_KEY), productId]
  writeSessionList(SESSION_INTERACTION_KEY, next)
}

export const getRecentRecommendedProductIds = (): string[] =>
  readSessionList(SESSION_RECOMMENDATION_KEY)

export const getSessionInteractionProductIds = (): string[] =>
  readSessionList(SESSION_INTERACTION_KEY)

export const trackRecommendationEvent = async (
  recommendedProductId: string,
  eventType: RecommendationEventType,
) => {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.id) return

  const { error } = await supabase.from("recommendation_events").insert({
    user_id: user.id,
    recommended_product_id: recommendedProductId,
    event_type: eventType,
  })

  if (error) {
    throw new Error(error.message)
  }
}
