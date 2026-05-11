import { useEffect, useMemo, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useCart } from "@/hooks/useCart"
import { useProducts } from "@/hooks/useProducts"
import { trackCurrentUserInteraction } from "@/services/interaction"
import {
  getMyProductRating,
  getProductAverageRating,
  submitProductRating,
} from "@/services/productRating.service"

const categoryLabels: Record<string, string> = {
  cookie: "كوكيز",
  drink: "مشروب",
  box: "بوكس",
}

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const { products, loading } = useProducts()
  const cart = useCart()
  const product = useMemo(() => products.find((item) => item.id === id) ?? null, [products, id])

  const [myRating, setMyRating] = useState<number>(0)
  const [avgRating, setAvgRating] = useState<number>(0)
  const [ratingLoading, setRatingLoading] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const toastTimerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!product?.id) return

    let active = true
    void Promise.all([getMyProductRating(product.id), getProductAverageRating(product.id)])
      .then(([mine, avg]) => {
        if (!active) return
        setMyRating(mine ?? 0)
        setAvgRating(avg)
      })
      .catch(() => {
        if (!active) return
        setMyRating(0)
        setAvgRating(product.rating ?? 0)
      })

    return () => {
      active = false
    }
  }, [product?.id, product?.rating])

  const showToast = (message: string) => {
    setToastMessage(message)
    setToastOpen(true)

    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current)
    }

    toastTimerRef.current = window.setTimeout(() => {
      setToastOpen(false)
      toastTimerRef.current = null
    }, 5000)
  }

  const handleRate = async (value: number) => {
    if (!product?.id || ratingLoading) return

    const previous = myRating
    setMyRating(value)
    setRatingLoading(true)

    try {
      const avg = await submitProductRating(product.id, value)
      setAvgRating(avg)
      showToast("تم حفظ تقييمك بنجاح")
    } catch (error) {
      setMyRating(previous)
      showToast(error instanceof Error ? error.message : "تعذر حفظ التقييم")
    } finally {
      setRatingLoading(false)
    }
  }

  if (loading) return <p>Loading...</p>
  if (!product) return <p>المنتج غير موجود.</p>

  return (
    <section className="section-block">
      <div className="wow-container details-layout">
        <article className="details-card">
          <div className="details-image-wrap">
            <img src={product.image_url || ""} alt={product.name} className="details-image" />
          </div>

          <div className="details-content">
            <span className="details-category">{categoryLabels[product.category] ?? "منتج"}</span>
            <h1>{product.name}</h1>

            <div className="details-rating">
              <div className="product-rating" aria-label={`تقييمك ${myRating || 0} من 5`}>
                {Array.from({ length: 5 }, (_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={index < myRating ? "star filled" : "star"}
                    aria-label={`قيّم المنتج ${index + 1} من 5`}
                    onClick={() => void handleRate(index + 1)}
                    disabled={ratingLoading}
                  >
                    ★
                  </button>
                ))}
              </div>
              <small>
                تقييم المنتج: {avgRating > 0 ? `${avgRating}/5` : "لا يوجد تقييمات بعد"}
              </small>
            </div>

            <p className="details-description">{product.description || "لا يوجد وصف لهذا المنتج حالياً."}</p>
            <strong className="details-price">{product.price} ₪</strong>

            <div className="details-actions">
              <button
                className="primary-pill"
                onClick={() => {
                  cart.addToCart(product)
                  void trackCurrentUserInteraction(product.id, "add_to_cart", {
                    source: "product_details",
                    metadata: { page: "product_details" },
                  })
                }}
              >
                اطلب الآن
              </button>
              <Link className="primary-pill" to="/products">
                عودة للمنتجات
              </Link>
            </div>
          </div>
        </article>
      </div>

      <div className={`cart-toast ${toastOpen ? "show" : ""}`} role="status" aria-live="polite">
        {toastMessage}
      </div>
    </section>
  )
}
