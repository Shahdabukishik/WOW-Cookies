import { supabase } from "../lib/supabaseClient"

export const getCart = async (userId: string) => {
  const { data, error } = await supabase
    .from("cart_items")
    .select("*, product:products(*)")
    .eq("user_id", userId)

  if (error) throw error
  return data
}

export const addToCart = async (userId: string, productId: string) => {
  return supabase.from("cart_items").insert({
    user_id: userId,
    product_id: productId,
    quantity: 1,
  })
}

export const removeFromCart = async (id: string) => {
  return supabase.from("cart_items").delete().eq("id", id)
}