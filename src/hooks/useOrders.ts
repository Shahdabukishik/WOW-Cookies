import { getCurrentUser } from "@/services/auth.service"
import { computeTotalPrice, type CartItemView } from "@/services/cart.service"
import { submitOrder } from "@/services/order.service"

export const useOrders = () => {
  const checkout = async (
    cart: CartItemView[],
    address: string,
    phone: string,
    firstName: string,
    lastName: string
  ) => {
    const currentUser = await getCurrentUser()
    const user = currentUser.data.user
    if (!user) return null

    return submitOrder({
      userId: user.id,
      firstName,
      lastName,
      phone,
      address,
      fulfillmentMethod: "delivery",
      items: cart,
      totalPrice: computeTotalPrice(cart),
    })
  }

  return { checkout }
}
