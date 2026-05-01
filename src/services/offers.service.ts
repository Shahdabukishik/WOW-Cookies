import { supabase } from "../lib/supabaseClient"

export const getOffers = async () => {
  const { data, error } = await supabase.from("offers").select("*")
  if (error) throw error
  return data
}