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
      <section className="mb-5 position-relative" style={{ height: "600px", overflow: "hidden" }}>
        <video autoPlay muted loop className="w-100 h-100 object-fit-cover rounded" >
          <source src="https://xnwjkhrtogrguplpabfl.supabase.co/storage/v1/object/public/general_images/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="position-absolute top-50 start-50 translate-middle text-center text-white text-shadow">
          <h1 style={{ fontSize: 60 }}>خُبز ب كل حب</h1>
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
      <style>{`
        .offer-card {
  background: linear-gradient(135deg, #3AA4AD, #9ACACE);
  color: white;
  border: none;
  border-radius: 20px;
  padding: 30px 20px;
  position: relative;
  overflow: hidden;

  /* 👇 الجديد */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

/* خلي العناصر فوق الخلفية */
.offer-card > * {
  position: relative;
  z-index: 2;
}

/* الدائرة الخلفية */
.offer-card::before {
  content: "";
  position: absolute;
  width: 180px;
  height: 180px;
  background: rgba(255,255,255,0.2);
  border-radius: 50%;
  top: -40px;
  left: -40px;
  z-index: 1; /* 👈 مهم */
}

/* badge */
.offer-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: white;
  color: #3AA4AD;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 12px;
  z-index: 3;
}

.offer-btn {
  background: white;
  color: #3AA4AD;
  border: none;
  border-radius: 10px;
  padding: 6px 12px;
  font-weight: bold;
  transition: 0.2s;
}

.offer-btn:hover {
  background: #f1f1f1;
}
        `}</style>
    </>

  )
}
