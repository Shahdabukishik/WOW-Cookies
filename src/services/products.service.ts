import { supabase } from "../lib/supabaseClient"
import type { Product } from "../types/database.types"

export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)

  if (error) throw error
  return data
}