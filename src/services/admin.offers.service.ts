import { supabase } from "@/lib/supabaseClient"

export type OfferPayload = {
  title: string
  discount_percentage: number
  is_global: boolean
  start_date: string
  end_date: string
  product_ids?: string[]
}

export const getAllOffers = async () => {
  const { data, error } = await supabase
    .from("offers")
    .select(`
      *,
      product_offers (
        product_id,
        product:products (
          id,
          name
        )
      )
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error(error)
    return []
  }

  return data || []
}

export const createOffer = async (
  payload: OfferPayload
) => {
  const {
    product_ids = [],
    ...offerData
  } = payload

  const { data, error } = await supabase
    .from("offers")
    .insert(offerData)
    .select()
    .single()

  if (error) throw error

  if (!payload.is_global && product_ids.length) {
    const relations = product_ids.map(
      (product_id) => ({
        product_id,
        offer_id: data.id,
      })
    )

    const { error: relationError } =
      await supabase
        .from("product_offers")
        .insert(relations)

    if (relationError) throw relationError
  }

  return data
}

export const updateOffer = async (
  id: string,
  payload: OfferPayload
) => {
  const {
    product_ids = [],
    ...offerData
  } = payload

  const { error } = await supabase
    .from("offers")
    .update(offerData)
    .eq("id", id)

  if (error) throw error

  await supabase
    .from("product_offers")
    .delete()
    .eq("offer_id", id)

  if (!payload.is_global && product_ids.length) {
    const relations = product_ids.map(
      (product_id) => ({
        product_id,
        offer_id: id,
      })
    )

    const { error: relationError } =
      await supabase
        .from("product_offers")
        .insert(relations)

    if (relationError) throw relationError
  }
}

export const deleteOffer = async (
  id: string
) => {
  await supabase
    .from("product_offers")
    .delete()
    .eq("offer_id", id)

  const { error } = await supabase
    .from("offers")
    .delete()
    .eq("id", id)

  if (error) throw error
}

export const getProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("id,name")
    .order("name")

  if (error) {
    console.error(error)
    return []
  }

  return data || []
}