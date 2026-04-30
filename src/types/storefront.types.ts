import type { StorefrontProduct } from '../services/storefront.service'

export type PageId = 'home' | 'products' | 'offers' | 'locations' | 'login' | 'cart'

export type CartItem = StorefrontProduct & {
  quantity: number
}