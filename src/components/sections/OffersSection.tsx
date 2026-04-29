import type { StorefrontOffer } from '../../services/storefront.service'

function OffersSection({ offers }: { offers: StorefrontOffer[] }) {
  return (
    <section className="section-block offers-surface">
      <div className="wow-container">
        <div className="section-header">
          <p className="section-kicker">العروض</p>
          <h2>مساحات عروض جاهزة للإدارة من لوحة التحكم</h2>
          <p className="section-description">
            هذا القسم يمكن تغذيته من جدول عروض مستقل، أو الاعتماد مؤقتاً على عروض مشتقة من المنتجات.
          </p>
        </div>

        <div className="offer-grid">
          {offers.map((offer) => (
            <article key={offer.id} className="mini-card offer-card">
              <p className="section-kicker">عرض خاص</p>
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
              <button className="primary-pill small">عرض التفاصيل</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OffersSection