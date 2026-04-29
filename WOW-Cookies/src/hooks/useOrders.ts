import { createOrder } from "../services/orders.service"
import { supabase } from "../lib/supabaseClient"

export const useOrders = () => {
  const checkout = async (cart: any[], address: string, phone: string) => {
    const user = (await supabase.auth.getUser()).data.user
    if (!user) return

    const total = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    )

    const order = await createOrder(
      {
        user_id: user.id,
        address,
        phone,
        total_price: total,
        payment_method: "cash",
      },
      cart
    )

    return order
  }

  return { checkout }
}