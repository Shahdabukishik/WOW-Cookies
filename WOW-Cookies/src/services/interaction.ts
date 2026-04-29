import { supabase } from "../lib/supabaseClient"


export const trackInteraction = async (
  userId: string,
  productId: string,
  type: "view" | "click"
) => {
  return supabase.from("user_interactions").insert({
    user_id: userId,
    product_id: productId,
    type,
  })
}