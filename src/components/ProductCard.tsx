import type { Product } from "@/types/database.types"

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
};

export const ProductCard = ({ product, onAddToCart, onViewDetails, rating }: Props) => {
  const hasDiscount = product.discount !== undefined

  return (
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
            onClick={() => onAddToCart(product)}
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
  )
}
