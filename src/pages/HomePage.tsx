
// import type { StorefrontOffer, StorefrontProduct } from '../services/storefront.service'
// import type { PageId } from '../types/storefront.types'
// import heroImage from '../assets/Cookies-With-Chocolate-Chips.jpg'

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
//   const featuredProduct = products[0]
//   const topRated = products.filter((product) => product.flags.topRated).slice(0, 4)
//   const mostSelling = products.filter((product) => product.flags.mostSelling).slice(0, 4)
//   const recommendation = products[1] ?? products[0]

//   if (!featuredProduct) {
//     return (
//       <main className="home-desktop">
//         <section className="home-empty">
//           <h1>No products yet</h1>
//           <p>Add products in Supabase to show them here.</p>
//         </section>
//       </main>
//     )
//   }

//   return (
//     <main className="home-desktop">
//       <section className="desktop-hero">
//         <div className="hero-image-card">
//           <img src={heroImage} alt="cookies" />
//           <div className="hero-overlay">
//             <span>ARTISAN DAILY</span>
//             <h1>Baked With Love</h1>
//             <button onClick={() => onNavigate('products')}>Order Fresh Now</button>
//           </div>
//         </div>

//         <div className="hero-side">
//           <div className="recommend-card">
//             <p className="small-title">⚡ AI RECOMMENDATION</p>
//             <h2>Your Perfect Match</h2>
//             <p>Based on your love for cookies, we think you’ll adore this.</p>

//             {recommendation ? (
//               <div className="mini-product">
//                 <img src={recommendation.imageUrl} alt={recommendation.name} />
//                 <div>
//                   <strong>{recommendation.name}</strong>
//                   <span>${recommendation.price}</span>
//                 </div>
//                 <button onClick={() => onAddToCart(recommendation)}>+</button>
//               </div>
//             ) : null}
//           </div>

//           <div className="hero-info">
//             <h3>Fresh cookies, warm moments.</h3>
//             <p>Beautiful storefront layout ready for laptop screens and responsive design.</p>
//           </div>
//         </div>
//       </section>

//       <section className="home-section">
//         <div className="section-title-row">
//           <div>
//             <h2>Top Rated</h2>
//             <p>Customer favorites this week</p>
//           </div>
//           <button onClick={() => onNavigate('products')}>See all</button>
//         </div>

//         <div className="top-rated-grid">
//           {(topRated.length > 0 ? topRated : products.slice(0, 4)).map((product) => (
//             <article key={product.id} className="top-rated-card">
//               <div className="top-image-wrap">
//                 <img src={product.imageUrl} alt={product.name} />
//                 <span>⭐ 4.9</span>
//               </div>
//               <div className="product-row">
//                 <div>
//                   <h3>{product.name}</h3>
//                   <p>{product.shortDescription}</p>
//                 </div>
//                 <strong>${product.price}</strong>
//               </div>
//               <button onClick={() => onAddToCart(product)}>Add to cart</button>
//             </article>
//           ))}
//         </div>
//       </section>

//       <section className="home-section">
//         <div className="section-title-row">
//           <div>
//             <h2>Special Offers</h2>
//             <p>Limited deals for cookie lovers</p>
//           </div>
//         </div>

//         <div className="offers-desktop-grid">
//           {(offers.length > 0 ? offers : [
//             { id: '1', title: 'Buy 5 Get 1 Free', description: 'Limited time only' },
//             { id: '2', title: 'First Box 20% Off', description: 'Use code: WOOW' },
//           ]).map((offer, index) => (
//             <article key={offer.id} className={`offer-desktop-card offer-${index + 1}`}>
//               <h3>{offer.title}</h3>
//               <p>{offer.description}</p>
//               <button>➜</button>
//             </article>
//           ))}
//         </div>
//       </section>

//       <section className="home-section most-selling-section">
//         <div className="section-title-row">
//           <div>
//             <h2>Most Selling</h2>
//             <p>Crowd favorites by popularity</p>
//           </div>
//           <button onClick={() => onNavigate('products')}>Shop all</button>
//         </div>

//         <div className="selling-grid">
//           {(mostSelling.length > 0 ? mostSelling : products.slice(0, 4)).map((product) => (
//             <article key={product.id} className="selling-card">
//               <img src={product.imageUrl} alt={product.name} />
//               <div>
//                 <div className="selling-head">
//                   <h3>{product.name}</h3>
//                   <strong>${product.price}</strong>
//                 </div>
//                 <p>{product.shortDescription}</p>
//                 <div className="tags">
//                   <span>BESTSELLER</span>
//                   <span>ORGANIC</span>
//                 </div>
//               </div>
//               <button onClick={() => onAddToCart(product)}>+</button>
//             </article>
//           ))}
//         </div>
//       </section>
//     </main>
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
  onOpenProduct,
}: {
  offers: StorefrontOffer[]
  products: StorefrontProduct[]
  onNavigate: (page: PageId) => void
  onAddToCart: (product: StorefrontProduct) => void
  onOpenProduct: (product: StorefrontProduct) => void
}) {
  const featuredProduct = products[0]
  const topRated = products.filter((product) => product.flags.topRated).slice(0, 4)
  const mostSelling = products.filter((product) => product.flags.mostSelling).slice(0, 4)
  const recommendation = products[1] ?? products[0]
  const relatedProducts = products.slice(0, 2)

  if (!featuredProduct) {
    return (
      <main className="home-desktop">
        <section className="home-empty">
          <h1>لا توجد منتجات بعد</h1>
          <p>أضف منتجات في Supabase ليتم عرضها هنا.</p>
        </section>
      </main>
    )
  }

  return (
    <main className="home-desktop">
      <section className="desktop-hero">
        <div className="hero-image-card">
          <img src={heroImage} alt="كوكيز" />
          <div className="hero-overlay">
            <span>مصنوع يومياً بحرفية</span>
            <h1>مخبوز بحب</h1>
            <button onClick={() => onNavigate('products')}>اطلب الآن طازج</button>
          </div>
        </div>

        <div className="hero-side">
          <div className="recommend-card">
            <p className="small-title">⚡ توصية الذكاء الاصطناعي</p>
            <h2>اختيارك المثالي</h2>
            <p>بناءً على حبك للكوكيز، نعتقد أنك ستعشق هذا المنتج.</p>

            {recommendation ? (
              <div className="mini-product">
                <img src={recommendation.imageUrl} alt={recommendation.name} />
                <div>
                  <strong>{recommendation.name}</strong>
                  <span>{recommendation.price} ريال</span>
                </div>
                <button onClick={() => onAddToCart(recommendation)}>+</button>
              </div>
            ) : null}
          </div>

          <div className="hero-info">
            <h3>كوكيز طازج، لحظات دافئة.</h3>
            <p>تصميم متجر جميل مناسب لشاشات اللابتوب ومتجاوب مع جميع الأجهزة.</p>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="section-title-row">
          <div>
            <h2>الأعلى تقييماً</h2>
            <p>مفضلات العملاء هذا الأسبوع</p>
          </div>
          <button onClick={() => onNavigate('products')}>عرض الكل</button>
        </div>

        <div className="top-rated-grid">
          {(topRated.length > 0 ? topRated : products.slice(0, 4)).map((product) => (
            <article
              key={product.id}
              className="top-rated-card"
              onClick={() => onOpenProduct(product)}
            >
              <div className="top-image-wrap">
                <img src={product.imageUrl} alt={product.name} />
                <span>⭐ 4.9</span>
              </div>

              <div className="product-row">
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.shortDescription}</p>
                </div>
                <strong>{product.price} ريال</strong>
              </div>

              <button
                onClick={(event) => {
                  event.stopPropagation()
                  onAddToCart(product)
                }}
              >
                أضف إلى السلة
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="section-title-row">
          <div>
            <h2>عروض خاصة</h2>
            <p>عروض محدودة لعشاق الكوكيز</p>
          </div>
        </div>

        <div className="offers-desktop-grid">
          {(offers.length > 0
            ? offers
            : [
                {
                  id: '1',
                  title: 'اشتري 5 واحصل على 1 مجاناً',
                  description: 'لفترة محدودة',
                },
                {
                  id: '2',
                  title: 'خصم 20% على أول طلب',
                  description: 'استخدم الكود: WOOW',
                },
              ]
          ).map((offer, index) => (
            <article key={offer.id} className={`offer-desktop-card offer-${index + 1}`}>
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>

              <button
                onClick={() => {
                  const product = relatedProducts[index] ?? products[0]
                  if (product) onOpenProduct(product)
                }}
              >
                ➜
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section most-selling-section">
        <div className="section-title-row">
          <div>
            <h2>الأكثر مبيعاً</h2>
            <p>الأكثر طلباً حسب الشعبية</p>
          </div>
          <button onClick={() => onNavigate('products')}>تسوق الكل</button>
        </div>

        <div className="selling-grid">
          {(mostSelling.length > 0 ? mostSelling : products.slice(0, 4)).map((product) => (
            <article
              key={product.id}
              className="selling-card"
              onClick={() => onOpenProduct(product)}
            >
              <img src={product.imageUrl} alt={product.name} />

              <div>
                <div className="selling-head">
                  <h3>{product.name}</h3>
                  <strong>{product.price} ريال</strong>
                </div>

                <p>{product.shortDescription}</p>

                <div className="tags">
                  <span>الأكثر مبيعاً</span>
                  <span>عضوي</span>
                </div>
              </div>

              <button
                onClick={(event) => {
                  event.stopPropagation()
                  onAddToCart(product)
                }}
              >
                +
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default HomePage