import { supabase } from "../lib/supabaseClient"

export const getMostSelling = async () => {
  const { data } = await supabase.rpc("most_selling_products")
  return data
}

export const getRevenue = async () => {
  const { data } = await supabase
    .from("orders")
    .select("total_price")

  return data
}