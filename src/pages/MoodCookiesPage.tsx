import { useMemo } from "react"
import { ProductCard } from "@/components/ProductCard"
import EmptyCollectionState from "@/components/common/EmptyCollectionState"
import { useCart } from "@/hooks/useCart"
import { useProducts } from "@/hooks/useProducts"
import type { Product } from "@/types/database.types"
import { Link, useNavigate, useParams } from "react-router-dom"

const moodMeta: Record<string, { emoji: string }> = {
  very_sad: { emoji: "😭" },
  sad: { emoji: "😢" },
  natural: { emoji: "😐" },
  happy: { emoji: "😊" },
  very_happy: { emoji: "🤩" },
}

const shuffle = <T,>(items: T[]) => {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

const candidatesByMood = (cookies: Product[], mood: string) => {
  const byRating = [...cookies].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
  const byPriceAsc = [...cookies].sort((a, b) => a.price - b.price)
  const byPriceDesc = [...cookies].sort((a, b) => b.price - a.price)

  switch (mood) {
    case "very_sad":
      return byPriceDesc.slice(0, 6)
    case "sad":
      return byRating.slice(0, 6)
    case "natural":
      return byPriceAsc.slice(0, 6)
    case "happy":
      return byRating.slice(0, 8)
    case "very_happy":
      return byRating.slice(0, 10)
    default:
      return byRating.slice(0, 8)
  }
}

export default function MoodCookiesPage() {
  const { mood = "natural" } = useParams<{ mood: string }>()
  const { products, loading } = useProducts()
  const cart = useCart()
  const navigate = useNavigate()

  const meta = moodMeta[mood] ?? moodMeta.natural
  const cookies = products.filter((product) => product.category === "cookie")
  const picks = useMemo(() => {
    const pool = candidatesByMood(cookies, mood)
    return shuffle(pool).slice(0, 2)
  }, [cookies, mood])

  if (loading) return <p>Loading...</p>

  return (
    <main className="page-shell">
      <section className="section-block">
        <div className="wow-container">
          <div className="mood-page-head glass-card">
            <h1 className="mood-emoji-only" aria-label="Selected mood">{meta.emoji}</h1>
            <Link className="primary-pill small" to="/">
              Back
            </Link>
          </div>

          {picks.length === 0 ? (
            <EmptyCollectionState
              title="No cookies available"
              description="Please check back soon for fresh cookie batches."
            />
          ) : (
            <div className="products-zigzag-list mood-picks-grid">
              {picks.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={cart.addToCart}
                  onViewDetails={() => navigate(`/products/${product.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
