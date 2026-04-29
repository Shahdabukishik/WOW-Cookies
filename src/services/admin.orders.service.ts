import { supabase } from "../lib/supabaseClient"

export const getAllOrders = async () => {
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*, product:products(*))")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export const updateOrderStatus = async (id: string, status: string) => {
  return supabase.from("orders").update({ status }).eq("id", id)
}