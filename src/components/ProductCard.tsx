import "./product.css"
import type { Product } from "@/types/database.types"

type Props = {
  product: Product
  onAddToCart: (product: Product) => void
 
}

export const ProductCard = ({ product, onAddToCart }: Props) => {
  return (
    <article className="product-card">

      <div className="product-image">
        <img src={product.image_url || ""} alt={product.name} />
        <span className="category-chip">{product.category}</span>
      </div>

      <div className="product-content">
        <h3>{product.name}</h3>

        <p className="desc">
          {product.description?.slice(0, 60)}...
        </p>

        <div className="bottom">
          <span className="price">{product.price} ₪</span>

          <button
            className="btn-primary"
            onClick={() => onAddToCart(product)}
          >
            + أضف
          </button>
        </div>
      </div>

    </article>
  )
}