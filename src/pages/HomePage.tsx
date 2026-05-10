import { useEffect, useState } from "react"
import { useProducts } from "../hooks/useProducts"
import { useTopRated } from "../hooks/useTopRated"
import { useMostSelling } from "../hooks/useMostSelling"
import { useOffers } from "../hooks/useOffers"
import { ProductCard } from "@/components/ProductCard"
import { useCart } from "@/hooks/useCart"
import { fetchHeroRecommendation } from "@/services/recommendation.service"
import { trackCurrentUserInteraction } from "@/services/interaction"
import type { Product } from "@/types/database.types"
import { useNavigate } from "react-router-dom"

export default function HomePage() {
  const { products, loading } = useProducts()
  const cart = useCart()
  const navigate = useNavigate()
  const topRated = useTopRated(products)
  const mostSelling = useMostSelling(products)
  const offers = useOffers()
  const [recommendedProduct, setRecommendedProduct] = useState<Product | null>(null)

  const recommendation = recommendedProduct ?? products[1] ?? products[0]

  useEffect(() => {
    let mounted = true

    if (products.length === 0) return

    fetchHeroRecommendation(products)
      .then((result) => {
        if (!mounted) return
        setRecommendedProduct(result)
      })
      .catch(() => {
        if (!mounted) return
        setRecommendedProduct(null)
      })

    return () => {
      mounted = false
    }
  }, [products])

  useEffect(() => {
    if (!recommendation?.id) return
    void trackCurrentUserInteraction(recommendation.id, "view", {
      source: "home_recommendation",
      metadata: { page: "home", block: "hero_recommendation" },
    })
  }, [recommendation?.id])

  if (loading) return <p>Loading...</p>

  const handleAddToCart = (product: Product) => {
    cart.addToCart(product)
    void trackCurrentUserInteraction(product.id, "add_to_cart", {
      source: "home_product_card",
      metadata: { page: "home" },
    })
  }

  const handleRecommendationClick = (product: Product) => {
    void trackCurrentUserInteraction(product.id, "click", {
      source: "home_recommendation_cta",
      metadata: { page: "home", block: "hero_recommendation" },
    })
    navigate(`/products/${product.id}`)
  }

  return (
    <>
      {/* 🎥 Video Hero */}
      <section className="mb-5 position-relative hero-video-section">
        <video autoPlay muted loop>
          <source src="https://xnwjkhrtogrguplpabfl.supabase.co/storage/v1/object/public/general_images/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="position-absolute top-50 start-50 translate-middle text-center text-white text-shadow">
          <h1 className="hero-title">خُبز ب كل حب</h1>
        </div>
      </section>

<div className="row g-3 mb-4">

  {/* 🎁 Offer */}
  {offers.slice(0,1).map(o => (
    <div className="col-md-6" key={o.id}>
      <div className="offer-card h-100">

        <div className="offer-badge">
          {o.discount_percentage}% خصم
        </div>

        <h5 className="fw-bold mb-2">{o.title}</h5>
        <p>خصم لفترة محدودة</p>

        <button className=" offer-btn">
          اطلب الآن
        </button>

      </div>
    </div>
  ))}

  {/* 🤖 Recommendation */}
  {recommendation && (
    <div className="col-md-6">
      <div className="offer-card h-100">

        <div className="offer-badge">
          لكَ
        </div>

        <h5 className="fw-bold mb-2">
          {recommendation.name}
        </h5>

        <p>اخترناه خصيصاً لك </p>

        <button
          className=" offer-btn"
          onClick={() => handleRecommendationClick(recommendation)}
        >
          جرّب الآن
        </button>

      </div>
    </div>
  )}

</div>


      {/* ⭐ Top Rated */}
      <h3>الأكثر تقييمًا</h3>
      <div className="row">
        {topRated.map(p => (
          <div className="col-md-3" key={p.id}>
            <ProductCard product={p}
              onAddToCart={handleAddToCart}
              onViewDetails={(product) => {
                void trackCurrentUserInteraction(product.id, "click", {
                  source: "home_top_rated_details",
                  metadata: { page: "home", section: "top_rated" },
                })
                navigate(`/products/${product.id}`)
              }}
              rating={p.rating}
            />
          </div>
        ))}
      </div>


      {/* 🔥 Most Selling */}
      <h3 className="mt-4">الأكثر مبيعًا</h3>
      <div className="row">
        {mostSelling.map(p => (
          <div className="col-md-3" key={p.id}>
            <ProductCard
              product={p}
              onAddToCart={handleAddToCart}
              onViewDetails={(product) => {
                void trackCurrentUserInteraction(product.id, "click", {
                  source: "home_most_selling_details",
                  metadata: { page: "home", section: "most_selling" },
                })
                navigate(`/products/${product.id}`)
              }}
            />
          </div>
        ))}
      </div>
    </>

  )
}
