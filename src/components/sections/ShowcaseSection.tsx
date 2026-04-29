import type { StorefrontProduct } from '../../services/storefront.service'

function ShowcaseSection({
  eyebrow,
  title,
  description,
  items,
  accentLabel,
  onAddToCart,
}: {
  eyebrow: string
  title: string
  description: string
  items: StorefrontProduct[]
  accentLabel: string
  onAddToCart: (product: StorefrontProduct) => void
}) {
  return (
    <section className="section-block">
      <div className="wow-container">
        <div className="section-header">
          <p className="section-kicker">{eyebrow}</p>
          <h2>{title}</h2>
          <p className="section-description">{description}</p>
        </div>

        <div className="showcase-list">
          {items.map((product, index) => (
            <article
              key={product.id}
              className={`showcase-card ${index % 2 === 1 ? 'reversed' : ''}`}
            >
              <div className="showcase-image-shell">
                <img src={product.imageUrl} alt={product.name} className="showcase-image" />
              </div>

              <div className="showcase-copy">
                <p className="section-kicker">{accentLabel}</p>
                <h3>{product.name}</h3>
                <p className="showcase-lead">{product.shortDescription}</p>
                <p>{product.detailedDescription}</p>

                <div className="showcase-actions">
                  <button className="primary-pill small" onClick={() => onAddToCart(product)}>
                    أضف إلى السلة
                  </button>
                  <span className="price-tag">{product.price} ريال</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ShowcaseSection