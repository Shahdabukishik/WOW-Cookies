import { supabase } from "../lib/supabaseClient"

export const createOffer = async (offer: any) => {
  return supabase.from("offers").insert(offer)
}