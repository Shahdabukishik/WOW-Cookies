import { useMemo } from "react"
import { Link, useParams } from "react-router-dom"
import { useCart } from "@/hooks/useCart"
import { useProducts } from "@/hooks/useProducts"
import { trackCurrentUserInteraction } from "@/services/interaction"

const categoryLabels: Record<string, string> = {
  cookie: "كوكيز",
  drink: "مشروب",
  box: "بوكس",
}

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const { products, loading } = useProducts()
  const cart = useCart()
  const product = useMemo(
    () => products.find((item) => item.id === id) ?? null,
    [products, id],
  )

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
            <span className="details-category">
              {categoryLabels[product.category] ?? "منتج"}
            </span>
            <h1>{product.name}</h1>
            <p className="details-description">
              {product.description || "لا يوجد وصف لهذا المنتج حالياً."}
            </p>
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
    </section>
  )
}
