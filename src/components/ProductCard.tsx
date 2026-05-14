import { useEffect, useRef, useState } from "react"
import type { Product } from "@/types/database.types"
import { submitProductRating } from "@/services/productRating.service"

type Props = {
  product: Product & {
    finalPrice?: number
    originalPrice?: number
    discount?: number
    offerTitle?: string
  }
  onAddToCart: (product: Product) => void
  onViewDetails?: (product: Product) => void
  rating?: number
}

const categoryLabels: Record<Product["category"], string> = {
  cookie: "كوكيز",
  drink: "مشروب",
  box: "بوكس",
}

export const ProductCard = ({ product, onAddToCart, onViewDetails, rating }: Props) => {
  const [showAddedToast, setShowAddedToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("تم إضافة المنتج إلى السلة")
  const [isRatingSubmitting, setIsRatingSubmitting] = useState(false)
  const [displayRating, setDisplayRating] = useState(0)
  const toastTimerRef = useRef<number | null>(null)
  const hasDiscount = product.discount !== undefined
  const productRating = Math.min(5, Math.max(1, Math.round(rating ?? product.rating ?? 5)))

  useEffect(() => {
    setDisplayRating(productRating)
  }, [productRating, product.id])

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current)
      }
    }
  }, [])

  const showToast = (message: string) => {
    setToastMessage(message)
    setShowAddedToast(true)

    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current)
    }

    toastTimerRef.current = window.setTimeout(() => {
      setShowAddedToast(false)
      toastTimerRef.current = null
    }, 5000)
  }

  const handleAddToCartClick = () => {
    onAddToCart(product)
    showToast("تم إضافة المنتج إلى السلة")
  }

  const handleRateProduct = async (nextRating: number) => {
    if (isRatingSubmitting) return

    const previousRating = displayRating
    setDisplayRating(nextRating)
    setIsRatingSubmitting(true)

    try {
      await submitProductRating(product.id, nextRating)
      setDisplayRating(nextRating)
      showToast("تم حفظ تقييمك بنجاح")
    } catch (error) {
      setDisplayRating(previousRating)
      showToast(error instanceof Error ? error.message : "تعذر حفظ التقييم، حاول مرة أخرى.")
    } finally {
      setIsRatingSubmitting(false)
    }
  }

  return (
    <>
      <article className="product-card">

        <div className="product-image">

          <img src={product.image_url || ""} alt={product.name} />

          <span className="category-chip">{categoryLabels[product.category]}</span>
          {rating !== undefined && (
            <div className="position-absolute top-0 end-0 m-2 px-2 py-1 rounded-pill bg-dark text-white d-flex align-items-center gap-1">
              <span className="text-warning">★</span>
              <span>{rating}</span>
            </div>
          )}
          {hasDiscount && (
            <div className="position-absolute top-0 start-0 m-2 px-2 py-1 rounded bg-danger text-white small">
              -{product.discount}%
            </div>
          )}
        </div>

        <div className="product-content">
          <div className="product-text">
            <h3>{product.name}</h3>
            <div className="product-rating" aria-label={`التقييم ${displayRating} من 5`}>
              {Array.from({ length: 5 }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  className={index < displayRating ? "star filled" : "star"}
                  aria-label={`قيّم المنتج ${index + 1} من 5`}
                  onClick={() => void handleRateProduct(index + 1)}
                  disabled={isRatingSubmitting}
                >
                  ★
                </button>
              ))}
            </div>

            <p className="desc">
              {product.description?.slice(0, 60)}...
            </p>

            <div className="price d-flex flex-column">
              {hasDiscount ? (
                <>
                  <span className="text-muted text-decoration-line-through">
                    {product.originalPrice} ₪
                  </span>
                  <span className="fw-bold text-danger">
                    {product.finalPrice} ₪
                  </span>
                  {product.offerTitle && (
                    <span className="small text-danger">
                      {product.offerTitle}
                    </span>
                  )}
                </>
              ) : (
                <span>{product.price} ₪</span>
              )}
            </div>
          </div>

          <div className="actions">
            <button
              className="product-action"
              onClick={handleAddToCartClick}
            >
              + أضف
            </button>
            <button
              className="product-action"
              onClick={() => onViewDetails?.(product)}
            >
              التفاصيل
            </button>
          </div>
        </div>

      </article>

      <div className={`cart-toast ${showAddedToast ? "show" : ""}`} role="status" aria-live="polite">
        {toastMessage}
      </div>
    </>
  )
}
