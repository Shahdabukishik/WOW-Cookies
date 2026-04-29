import type { Product } from "../../../../types/database.types"
import type { ProductPayload } from "../../../../services/admin.products.service"

export type ProductFormValues = Omit<ProductPayload, "price" | "description" | "image_url"> & {
  price: string
  description: string
  image_url: string
}

export const toFormValues = (product: Product): ProductFormValues => ({
  name: product.name,
  description: product.description ?? "",
  price: String(product.price),
  image_url: product.image_url ?? "",
  category: product.category,
  is_active: product.is_active,
  Ingredients: product.Ingredients,
})

export const toPayload = (form: ProductFormValues): ProductPayload => ({
  name: form.name,
  description: form.description.trim() || null,
  price: Number(form.price),
  image_url: form.image_url.trim() || null,
  category: form.category,
  is_active: form.is_active,
  Ingredients: form.Ingredients,
})