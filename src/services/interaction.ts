import { supabase } from "../lib/supabaseClient"
import { rememberSessionInteraction } from "@/services/recommendation-events.service"


export const trackInteraction = async (
  userId: string,
  productId: string,
  type: "view" | "click" | "add_to_cart",
  source?: string,
  metadata?: Record<string, unknown>
) => {
  rememberSessionInteraction(productId)

  return supabase.from("user_interactions").insert({
    user_id: userId,
    product_id: productId,
    type,
    source: source ?? null,
    metadata: metadata ?? null,
  })
}

export const trackCurrentUserInteraction = async (
  productId: string,
  type: "view" | "click" | "add_to_cart",
  options?: {
    source?: string
    metadata?: Record<string, unknown>
  }
) => {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.id) return
  await trackInteraction(user.id, productId, type, options?.source, options?.metadata)
}
