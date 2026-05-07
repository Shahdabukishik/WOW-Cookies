import { useMemo } from "react"
import type { Product, offers, product_offers } from "@/types/database.types"

export type ProductWithOffer = Product & {
  discount?: number
  offerTitle?: string
  originalPrice: number
  finalPrice: number
}

const applyOffer = (product: Product, offer?: offers): ProductWithOffer => {
  if (!offer) {
    return {
      ...product,
      discount: undefined,
      offerTitle: undefined,
      originalPrice: product.price,
      finalPrice: product.price,
    }
  }

  const discount = offer.discount_percentage
  const finalPrice = Number(
    (product.price - (product.price * discount) / 100).toFixed(2)
  )

  return {
    ...product,
    discount,
    offerTitle: offer.title,
    originalPrice: product.price,
    finalPrice,
  }
}

export const enrichProductsWithOffers = (
  products: Product[],
  offers: offers[],
  productOffers: product_offers[]
): ProductWithOffer[] => {
  const globalOffer = offers.find((offer) => offer.is_global)

  return products.map((product) => {
    const productRelation = productOffers.find(
      (productOffer) => String(productOffer.product_id) === String(product.id)
    )

    const productOffer = productRelation
      ? offers.find((offer) => String(offer.id) === String(productRelation.offer_id))
      : undefined

    return applyOffer(product, productOffer ?? globalOffer)
  })
}

export function useOffersProducts(
  products: Product[],
  offers: offers[],
  productOffers: product_offers[]
) {
  return useMemo(
    () => enrichProductsWithOffers(products, offers, productOffers),
    [products, offers, productOffers]
  )
}
