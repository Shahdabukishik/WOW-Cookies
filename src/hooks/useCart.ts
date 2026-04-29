import { useEffect, useState } from "react"
import { getCart, addToCart, removeFromCart } from "../services/cart.service"
import { supabase } from "../lib/supabaseClient"

export const useCart = () => {
  const [cart, setCart] = useState<any[]>([])

  const loadCart = async () => {
    const user = (await supabase.auth.getUser()).data.user
    if (!user) return

    const data = await getCart(user.id)
    setCart(data)
  }

  const add = async (productId: string) => {
    const user = (await supabase.auth.getUser()).data.user
    if (!user) return

    await addToCart(user.id, productId)
    loadCart()
  }

  const remove = async (id: string) => {
    await removeFromCart(id)
    loadCart()
  }

  useEffect(() => {
    loadCart()
  }, [])

  return { cart, add, remove }
}