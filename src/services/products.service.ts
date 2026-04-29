import { supabase } from "../lib/supabaseClient"
import type { Product } from "../types/database.types"

type GetProductsOptions = {
  includeInactive?: boolean
}

export const getProducts = async (options: GetProductsOptions = {}): Promise<Product[]> => {
  let query = supabase
    .from("products")
    .select("*")

  if (!options.includeInactive) {
    query = query.eq("is_active", true)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}
