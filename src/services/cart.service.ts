// src/services/cart.service.ts

import type { Product } from "@/types/database.types"

export type PricedProduct = Product & {
  discount?: number
  offerTitle?: string
  originalPrice?: number
  finalPrice?: number
}

export type CartLine = {
  id: string
  productId: string
  quantity: number
  selected: boolean
}

export type CartItemView = CartLine & {
  product: PricedProduct
  unitPrice: number
  originalUnitPrice: number
  lineTotal: number
}

const toFiniteNumber = (value: unknown): number | null => {
  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? numberValue : null
}

export const normalizeQuantity = (quantity: number): number => {
  const normalized = Math.trunc(toFiniteNumber(quantity) ?? 1)
  return Math.max(1, normalized)
}

export const getProductUnitPrice = (product: PricedProduct): number => {
  const explicitFinalPrice = toFiniteNumber(product.finalPrice)

  if (explicitFinalPrice !== null && explicitFinalPrice >= 0) {
    return Number(explicitFinalPrice.toFixed(2))
  }

  const price = toFiniteNumber(product.price) ?? 0
  const discount = toFiniteNumber(product.discount) ?? 0
  const discountMultiplier = discount > 0 ? 1 - discount / 100 : 1

  return Number((price * discountMultiplier).toFixed(2))
}

export const getCartLineTotal = (item: CartItemView): number => {
  return Number((item.unitPrice * item.quantity).toFixed(2))
}

export const computeTotalPrice = (items: CartItemView[]): number => {
  return Number(
    items.reduce((sum, item) => sum + item.lineTotal, 0).toFixed(2)
  )
}

export const createCartItemView = (
  item: CartLine,
  product: PricedProduct
): CartItemView => {
  const unitPrice = getProductUnitPrice(product)

  return {
    ...item,
    product,
    quantity: normalizeQuantity(item.quantity),
    unitPrice,
    originalUnitPrice: product.originalPrice ?? product.price,
    lineTotal: Number((unitPrice * normalizeQuantity(item.quantity)).toFixed(2)),
  }
}

export const mapCartLinesToViews = (
  items: CartLine[],
  products: PricedProduct[]
): CartItemView[] => {
  const productsById = new Map(products.map((product) => [String(product.id), product]))

  return items.flatMap((item) => {
    const product = productsById.get(String(item.productId))
    return product ? [createCartItemView(item, product)] : []
  })
}

export const getCartItems = (items: CartLine[]): CartLine[] => {
  return items.map((item) => ({
    id: item.id,
    productId: item.productId,
    quantity: normalizeQuantity(item.quantity),
    selected: item.selected,
  }))
}

export const addCartItem = (
  items: CartLine[],
  productId: string,
  createId: () => string = () => crypto.randomUUID()
): CartLine[] => {
  const existing = items.find((item) => item.productId === productId)

  if (existing) {
    return updateCartItemQuantity(items, existing.id, existing.quantity + 1)
  }

  return [
    ...items,
    {
      id: createId(),
      productId,
      quantity: 1,
      selected: true,
    },
  ]
}

export const updateCartItemQuantity = (
  items: CartLine[],
  itemId: string,
  quantity: number
): CartLine[] => {
  const nextQuantity = normalizeQuantity(quantity)

  return items.map((item) =>
    item.id === itemId ? { ...item, quantity: nextQuantity } : item
  )
}

export const removeCartItems = (
  items: CartLine[],
  ids: string[]
): CartLine[] => {
  const idsToRemove = new Set(ids)
  return items.filter((item) => !idsToRemove.has(item.id))
}

export const mapCartToOrderItems = (
  items: CartItemView[],
  orderId: string
) => {
  return items.map((item) => ({
    order_id: orderId,
    product_id: item.productId,
    price: item.unitPrice,
    quantity: item.quantity,
  }))
}
