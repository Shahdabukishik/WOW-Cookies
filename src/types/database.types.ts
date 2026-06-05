

export type Product = {
  id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  category: "cookie" | "drink" | "box"
  is_active: boolean
  created_at: string
  Ingredients: string
  rating?: number
  sales?: number
}

export type ProductCategory = Product["category"]

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
  fulfillment_method: "delivery" | "pickup"
  created_at: string
  first_name: string
  last_name: string

}

export type OrderItem = {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  created_at: string
}

export type Interaction = {
  id: string
  user_id: string
  product_id: string
  type: "view" | "click" | "add_to_cart"
  source: string | null
  metadata: Record<string, unknown> | null
  created_at: string
}

export type RecommendationEventType = "shown" | "clicked" | "purchased"

export type RecommendationType =
  | "category_affinity"
  | "session_affinity"
  | "similar_users"
  | "popular_this_week"
  | "highly_rated"
  | "new_arrival"
  | "diverse_pick"

export type RecommendationEvent = {
  id: string
  user_id: string
  recommended_product_id: string
  event_type: RecommendationEventType
  created_at: string
}

export type RecommendationExplanation = {
  recommendation_reason: string
  recommendation_type: RecommendationType
  confidence_score: number
}

export type RecommendationProduct = Product & RecommendationExplanation

export type UserProfile = {
  id: string
  user_id: string | null
  name: string | null
  email: string | null
  created_at: string
  role: "user" | "admin"
}

export type offers = {
  id: string
  title: string
  discount_percentage: number
  is_global: boolean
  start_date: string
  end_date: string
  created_at: string
}

export type product_offers = {
  id: string
  product_id: string
  offer_id: string
}
