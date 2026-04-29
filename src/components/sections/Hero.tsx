import heroImage from '../../assets/hero.png'
import type { StorefrontProduct } from '../../services/storefront.service'

function Hero({
  featuredProduct,
  onBrowse,
}: {
  featuredProduct: StorefrontProduct
  onBrowse: () => void
}) {
  return (
    <section className="hero-section">
      <div className="wow-container hero-grid">
        <div className="hero-copy">
          <span className="soft-badge">طازج كل أسبوع</span>
          <h1>واجهة عربية أنيقة لعرض الكوكيز والعروض بطريقة شهية وواضحة.</h1>
          <p>
            هذا التصميم يحافظ على روح المتجر ويجهز الصفحات لربط الصور والوصف والعروض القادمة
            مباشرة من قاعدة البيانات.
          </p>

          <div className="hero-actions">
            <button className="primary-pill" onClick={onBrowse}>
              اطلب الآن
            </button>
            <button className="ghost-pill" onClick={onBrowse}>
              استكشف النكهات
            </button>
          </div>

          <div className="hero-note">مخبوزات طازجة يومياً وتصميم جاهز للتوسع وربط البيانات.</div>
        </div>

        <div className="hero-visual-wrap">
          <img
            src={featuredProduct.imageUrl || heroImage}
            alt={featuredProduct.name}
            className="hero-image"
          />

          <div className="featured-card">
            <p className="section-kicker">مميز هذا الأسبوع</p>
            <h3>{featuredProduct.name}</h3>
            <p>{featuredProduct.shortDescription}</p>

            <div className="row-between">
              <strong>{featuredProduct.price} ريال</strong>
              <button className="primary-pill small" onClick={onBrowse}>
                اعرف أكثر
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero