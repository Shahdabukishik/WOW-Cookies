import { useProducts } from "../hooks/useProducts"
import { useTopRated } from "../hooks/useTopRated"
import { useMostSelling } from "../hooks/useMostSelling"
import { useOffers } from "../hooks/useOffers"
import { ProductCard } from "@/components/ProductCard"

export default function HomePage() {
  const { products, loading } = useProducts()
  const topRated = useTopRated(products)
  const mostSelling = useMostSelling(products)
  const offers = useOffers()

  const recommendation = products[1] ?? products[0]

  const handleAddToCart = (product: any) => {
    console.log("Add to cart", product)
  }

  if (loading) return <p>Loading...</p>

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

        <button className=" offer-btn">
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
            <ProductCard product={p} onAddToCart={handleAddToCart} />
          </div>
        ))}
      </div>
    </>

  )
}
