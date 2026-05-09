import type { Product } from "@/types/database.types"

export type StorefrontProduct = {
  id: string
  name: string
  shortDescription: string
  detailedDescription: string
  price: number
  imageUrl: string
  category: Product["category"] | string
}

export type StorefrontOffer = {
  id: string
  title: string
  description: string
}

