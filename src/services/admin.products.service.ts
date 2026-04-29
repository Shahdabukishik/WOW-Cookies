import { supabase } from "../lib/supabaseClient"
import type { Product } from "../types/database.types"

export type ProductPayload = Pick<
  Product,
  "name" | "description" | "price" | "image_url" | "category" | "is_active" | "Ingredients"
>

export const createProduct = async (product: ProductPayload) => {
  return supabase.from("products").insert(product)
}

export const updateProduct = async (id: string, product: ProductPayload) => {
  return supabase.from("products").update(product).eq("id", id)
}

export const deleteProduct = async (id: string) => {
  return supabase.from("products").delete().eq("id", id)
}
