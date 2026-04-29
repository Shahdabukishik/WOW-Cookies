// import type { StorefrontOffer, StorefrontProduct } from '../services/storefront.service'
// import type { PageId } from '../types/storefront.types'

// import Hero from '../components/sections/Hero'
// import IntroSection from '../components/sections/IntroSection'
// import OffersSection from '../components/sections/OffersSection'
// import ShowcaseSection from '../components/sections/ShowcaseSection'
// import ProductGridSection from '../components/sections/ProductGridSection'
// import EmptyCollectionState from '../components/common/EmptyCollectionState'

// function HomePage({
//   offers,
//   products,
//   onNavigate,
//   onAddToCart,
// }: {
//   offers: StorefrontOffer[]
//   products: StorefrontProduct[]
//   onNavigate: (page: PageId) => void
//   onAddToCart: (product: StorefrontProduct) => void
// }) {
//   const featuredProduct = products.find((product) => product.flags.featured) ?? products[0]
//   const topRated = products.filter((product) => product.flags.topRated)
//   const mostSelling = products.filter((product) => product.flags.mostSelling)

//   const homeSections = [
//     {
//       key: 'top-rated',
//       eyebrow: 'الأعلى تقييماً',
//       title: 'منتجات تستحق الواجهة الأمامية لأنها الأقوى في الانطباع والجودة',
//       description:
//         'هذا القسم مناسب لإبراز المنتجات التي تملك أفضل تفاعل أو أفضل حضور بصري، مع مساحة كبيرة للصورة والتفاصيل.',
//       accentLabel: 'الأعلى تقييماً',
//       items: topRated.length > 0 ? topRated : products.slice(0, 3),
//     },
//     {
//       key: 'most-selling',
//       eyebrow: 'الأكثر مبيعاً',
//       title: 'خيارات محبوبة يطلبها العملاء باستمرار وتدفع الزائر للشراء بسرعة',
//       description:
//         'اعرض المنتجات الأكثر مبيعاً بشكل تحريري واضح يساعد على إبراز الصورة والسعر والوصف المختصر بطريقة مقنعة.',
//       accentLabel: 'الأكثر مبيعاً',
//       items: mostSelling.length > 0 ? mostSelling : products.slice(0, 3),
//     },
//   ]

//   if (!featuredProduct) {
//     return (
//       <>
//         <IntroSection />
//         <section className="section-block">
//           <div className="wow-container">
//             <EmptyCollectionState
//               title="لم يتم تحميل منتجات بعد"
//               description="أضف منتجات فعالة داخل Supabase مع الاسم والسعر والصورة والوصف، وبعدها ستظهر الصفحة الرئيسية تلقائياً في أماكنها المناسبة."
//               actionLabel="اذهب للمنتجات"
//               onAction={() => onNavigate('products')}
//             />
//           </div>
//         </section>
//       </>
//     )
//   }

//   return (
//     <>
//       <Hero featuredProduct={featuredProduct} onBrowse={() => onNavigate('products')} />
//       <IntroSection />
//       <OffersSection offers={offers} />

//       {homeSections
//         .filter((section) => section.items.length > 0)
//         .map((section) => (
//           <ShowcaseSection
//             key={section.key}
//             eyebrow={section.eyebrow}
//             title={section.title}
//             description={section.description}
//             items={section.items}
//             accentLabel={section.accentLabel}
//             onAddToCart={onAddToCart}
//           />
//         ))}

//       <ProductGridSection
//         title="التشكيلة الكاملة في شبكة مرنة وواضحة"
//         description="بعد عرض العروض والمنتجات البارزة، يصل الزائر إلى جميع المنتجات في شكل منظم وسهل للربط مستقبلاً مع قاعدة البيانات."
//         items={products}
//         onAddToCart={onAddToCart}
//       />
//     </>
//   )
// }

// export default HomePage
import type { StorefrontOffer, StorefrontProduct } from '../services/storefront.service'
import type { PageId } from '../types/storefront.types'
import heroImage from '../assets/Cookies-With-Chocolate-Chips.jpg'

function HomePage({
  offers,
  products,
  onNavigate,
  onAddToCart,
}: {
  offers: StorefrontOffer[]
  products: StorefrontProduct[]
  onNavigate: (page: PageId) => void
  onAddToCart: (product: StorefrontProduct) => void
}) {
  const featuredProduct = products[0]
  const topRated = products.filter((product) => product.flags.topRated).slice(0, 4)
  const mostSelling = products.filter((product) => product.flags.mostSelling).slice(0, 4)
  const recommendation = products[1] ?? products[0]

  if (!featuredProduct) {
    return (
      <main className="home-desktop">
        <section className="home-empty">
          <h1>No products yet</h1>
          <p>Add products in Supabase to show them here.</p>
        </section>
      </main>
    )
  }

  return (
    <main className="home-desktop">
      <section className="desktop-hero">
        <div className="hero-image-card">
          <img src={heroImage} alt="cookies" />
          <div className="hero-overlay">
            <span>ARTISAN DAILY</span>
            <h1>Baked With Love</h1>
            <button onClick={() => onNavigate('products')}>Order Fresh Now</button>
          </div>
        </div>

        <div className="hero-side">
          <div className="recommend-card">
            <p className="small-title">⚡ AI RECOMMENDATION</p>
            <h2>Your Perfect Match</h2>
            <p>Based on your love for cookies, we think you’ll adore this.</p>

            {recommendation ? (
              <div className="mini-product">
                <img src={recommendation.imageUrl} alt={recommendation.name} />
                <div>
                  <strong>{recommendation.name}</strong>
                  <span>${recommendation.price}</span>
                </div>
                <button onClick={() => onAddToCart(recommendation)}>+</button>
              </div>
            ) : null}
          </div>

          <div className="hero-info">
            <h3>Fresh cookies, warm moments.</h3>
            <p>Beautiful storefront layout ready for laptop screens and responsive design.</p>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="section-title-row">
          <div>
            <h2>Top Rated</h2>
            <p>Customer favorites this week</p>
          </div>
          <button onClick={() => onNavigate('products')}>See all</button>
        </div>

        <div className="top-rated-grid">
          {(topRated.length > 0 ? topRated : products.slice(0, 4)).map((product) => (
            <article key={product.id} className="top-rated-card">
              <div className="top-image-wrap">
                <img src={product.imageUrl} alt={product.name} />
                <span>⭐ 4.9</span>
              </div>
              <div className="product-row">
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.shortDescription}</p>
                </div>
                <strong>${product.price}</strong>
              </div>
              <button onClick={() => onAddToCart(product)}>Add to cart</button>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="section-title-row">
          <div>
            <h2>Special Offers</h2>
            <p>Limited deals for cookie lovers</p>
          </div>
        </div>

        <div className="offers-desktop-grid">
          {(offers.length > 0 ? offers : [
            { id: '1', title: 'Buy 5 Get 1 Free', description: 'Limited time only' },
            { id: '2', title: 'First Box 20% Off', description: 'Use code: WOOW' },
          ]).map((offer, index) => (
            <article key={offer.id} className={`offer-desktop-card offer-${index + 1}`}>
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
              <button>➜</button>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section most-selling-section">
        <div className="section-title-row">
          <div>
            <h2>Most Selling</h2>
            <p>Crowd favorites by popularity</p>
          </div>
          <button onClick={() => onNavigate('products')}>Shop all</button>
        </div>

        <div className="selling-grid">
          {(mostSelling.length > 0 ? mostSelling : products.slice(0, 4)).map((product) => (
            <article key={product.id} className="selling-card">
              <img src={product.imageUrl} alt={product.name} />
              <div>
                <div className="selling-head">
                  <h3>{product.name}</h3>
                  <strong>${product.price}</strong>
                </div>
                <p>{product.shortDescription}</p>
                <div className="tags">
                  <span>BESTSELLER</span>
                  <span>ORGANIC</span>
                </div>
              </div>
              <button onClick={() => onAddToCart(product)}>+</button>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default HomePage