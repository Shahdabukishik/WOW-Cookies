// src/services/order.service.ts

import { supabase } from "@/lib/supabaseClient"
import {
  computeTotalPrice,
  mapCartToOrderItems,
  type CartItemView,
} from "@/services/cart.service"

export type FulfillmentMethod = "delivery" | "pickup"

export type SubmitOrderPayload = {
  userId: string
  firstName: string
  lastName: string
  phone: string
  address: string
  fulfillmentMethod: FulfillmentMethod
  items: CartItemView[]
  totalPrice: number
}

const validatePayload = (payload: SubmitOrderPayload): void => {
  if (!payload.userId) throw new Error("Missing user")
  if (payload.items.length === 0) throw new Error("Cart is empty")
  if (!payload.firstName.trim()) throw new Error("First name is required")
  if (!payload.lastName.trim()) throw new Error("Last name is required")
  if (!payload.phone.trim()) throw new Error("Phone is required")

  if (payload.fulfillmentMethod === "delivery" && !payload.address.trim()) {
    throw new Error("Address is required for delivery")
  }

  if (computeTotalPrice(payload.items) <= 0) {
    throw new Error("Invalid total price")
  }
}

export const submitOrder = async (payload: SubmitOrderPayload) => {
  validatePayload(payload)

  const {
    userId,
    firstName,
    lastName,
    phone,
    address,
    fulfillmentMethod,
    items,
  } = payload

  const totalPrice = computeTotalPrice(items)

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert([
      {
        user_id: userId,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        phone: phone.trim(),
        address: fulfillmentMethod === "pickup" ? null : address.trim(),
        fulfillment_method: fulfillmentMethod,
        total_price: totalPrice,
      },
    ])
    .select()
    .single()

  if (orderError || !order) {
    throw new Error(orderError?.message || "Failed to create order")
  }

  const orderItems = mapCartToOrderItems(items, order.id)
  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems)

  if (itemsError) {
    await supabase.from("orders").delete().eq("id", order.id)
    throw new Error(itemsError.message || "Failed to create order items")
  }

  return order
}
