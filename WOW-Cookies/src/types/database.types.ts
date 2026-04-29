export type Product = {
  id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  category: "cookie" | "drink" | "box"
  is_active: boolean
  created_at: string
}

export type CartItem = {
  id: string
  user_id: string
  product_id: string
  quantity: number
  created_at: string
  product?: Product
}

export type Order = {
  id: string
  user_id: string
  status: "pending" | "preparing" | "shipped" | "delivered" | "cancelled"
  total_price: number
  address: string
  phone: string
  payment_method: "cash" | "reflect"
  created_at: string
}

export type OrderItem = {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  product?: Product
}

export type Interaction = {
  id: string
  user_id: string
  product_id: string
  type: "view" | "click"
  created_at: string
}