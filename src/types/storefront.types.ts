import type { StorefrontProduct } from '../services/storefront.service'

export type PageId =
  | 'home'
  | 'products'
  | 'cart'
  | 'login'
  | 'offers'
  | 'locations'
  | 'product-details'
export type CartItem = StorefrontProduct & {
  quantity: number
}