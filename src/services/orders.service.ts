import { supabase } from "../lib/supabaseClient"

export const createOrder = async (order: any, items: any[]) => {
  const { data: orderData, error } = await supabase
    .from("orders")
    .insert(order)
    .select()
    .single()

  if (error) throw error

  const orderItems = items.map((item) => ({
    order_id: orderData.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.product.price,
  }))

  await supabase.from("order_items").insert(orderItems)

  return orderData
}