import { supabase } from "@/lib/supabaseClient"

const clampRating = (rating: number) => Math.max(1, Math.min(5, Math.round(rating)))

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message

  if (error && typeof error === "object") {
    const maybe = error as { message?: unknown; code?: unknown }
    const message = typeof maybe.message === "string" ? maybe.message : ""
    const code = typeof maybe.code === "string" ? maybe.code : ""

    if (code === "42501" || message.toLowerCase().includes("row-level security")) {
      return "لا توجد صلاحية لتحديث تقييم المنتج حالياً."
    }

    if (message) return message
  }

  return "تعذر حفظ التقييم حالياً."
}

export const submitProductRating = async (productId: string, ratingValue: number): Promise<number> => {
  const rating = clampRating(ratingValue)

  const { error } = await supabase
    .from("products")
    .update({ rating })
    .eq("id", productId)

  if (error) throw new Error(getErrorMessage(error))
  return rating
}

export const getProductAverageRating = async (productId: string): Promise<number> => {
  const { data, error } = await supabase
    .from("products")
    .select("rating")
    .eq("id", productId)
    .maybeSingle()

  if (error) throw new Error(getErrorMessage(error))
  return Number(data?.rating ?? 0)
}

export const getMyProductRating = async (productId: string): Promise<number | null> => {
  const rating = await getProductAverageRating(productId)
  return rating > 0 ? rating : null
}
