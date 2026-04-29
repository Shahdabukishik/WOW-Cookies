import { supabase } from "../lib/supabaseClient"

export const uploadProductImage = async (file: File) => {
  const fileName = `products/${Date.now()}-${file.name}`

  const { error } = await supabase.storage
    .from("products")
    .upload(fileName, file)

  if (error) return { error }

  const { data } = supabase.storage
    .from("products")
    .getPublicUrl(fileName)

  return { url: data.publicUrl, path: fileName }
}

export const deleteProductImage = async (path: string) => {
  const { error } = await supabase.storage
    .from("products")
    .remove([path])

  return { error }
}