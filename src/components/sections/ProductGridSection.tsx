import type { StorefrontProduct } from '../../services/storefront.service'

function ProductGridSection({
  title,
  description,
  items,
  onAddToCart,
}: {
  title: string
  description: string
  items: StorefrontProduct[]
  onAddToCart: (product: StorefrontProduct) => void
}) {
  return (
    <section className="section-block product-grid-surface">
      <div className="wow-container">
        <div className="section-header">
          <p className="section-kicker">كل المنتجات</p>
          <h2>{title}</h2>
          <p className="section-description">{description}</p>
        </div>

        <div className="catalog-grid">
          {items.map((product) => (
            <article key={product.id} className="product-card">
              <div className="product-image-wrap">
                <img src={product.imageUrl} alt={product.name} className="product-image" />
                <span className="product-badge">متاح الآن</span>
              </div>

              <div className="product-card-body">
                <p className="section-kicker">{product.category}</p>
                <h3>{product.name}</h3>
                <p>{product.shortDescription}</p>

                <div className="row-between">
                  <strong>{product.price} ريال</strong>
                  <button className="primary-pill small" onClick={() => onAddToCart(product)}>
                    إضافة للسلة
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductGridSection