import { create } from "zustand"
import {
  addCartItem,
  normalizeQuantity,
  removeCartItems,
  updateCartItemQuantity,
  type CartLine,
} from "@/services/cart.service"

type CartState = {
  items: CartLine[]
  addToCart: (productId: string) => void
  removeFromCart: (itemId: string) => void
  removeMany: (itemIds: string[]) => void
  updateQuantity: (itemId: string, quantity: number) => void
  toggleItemSelection: (itemId: string) => void
  setItemSelection: (itemId: string, selected: boolean) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>((set) => ({
  items: [],

  addToCart: (productId) =>
    set((state) => ({
      items: addCartItem(state.items, productId),
    })),

  removeFromCart: (itemId) =>
    set((state) => ({
      items: removeCartItems(state.items, [itemId]),
    })),

  removeMany: (itemIds) =>
    set((state) => ({
      items: removeCartItems(state.items, itemIds),
    })),

  updateQuantity: (itemId, quantity) =>
    set((state) => ({
      items: updateCartItemQuantity(state.items, itemId, normalizeQuantity(quantity)),
    })),

  toggleItemSelection: (itemId) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, selected: !item.selected } : item
      ),
    })),

  setItemSelection: (itemId, selected) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, selected } : item
      ),
    })),

  clearCart: () => set({ items: [] }),
}))

