import "./product.css"
import type { Product } from "@/types/database.types"

type Props = {
  product: Product
  onAddToCart: (product: Product) => void
  rating?: number
}

const categoryLabels: Record<Product["category"], string> = {
  cookie: "كوكيز",
  drink: "مشروب",
  box: "بوكس",
};

export const ProductCard = ({ product, onAddToCart, rating }: Props) => {
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
      </div>

      <div className="product-content">
        <h3>{product.name}</h3>

        <p className="desc">
          {product.description?.slice(0, 60)}...
        </p>

        <div className="bottom">
          <span className="price">{product.price} ₪</span>
          <div className="actions">
            <button
              className="btn-primary"
              onClick={() => onAddToCart(product)}
            >
              + أضف
            </button>
            <button
              className="btn-primary"

            >
              التفاصيل
            </button>
          </div>
        </div>
      </div>

    </article>
  )
}