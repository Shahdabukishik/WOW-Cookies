// services/productOffers.ts
import { supabase } from "../lib/supabaseClient"

export const getProductOffers = async () => {
  const { data, error } = await supabase
    .from("product_offers")
    .select("*")

  if (error) throw error
  return data
}