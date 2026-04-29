import { useEffect, useMemo, useState, type FormEvent } from 'react'
import heroImage from './assets/hero.png'
import './App.css'
import {
  fetchStorefrontData,
  type StorefrontOffer,
  type StorefrontProduct,
} from './services/storefront.service'

type PageId = 'home' | 'products' | 'offers' | 'locations' | 'login' | 'cart'
type CartItem = StorefrontProduct & { quantity: number }

const navItems: Array<{ label: string; page: PageId }> = [
  { label: 'الرئيسية', page: 'home' },
  { label: 'المنتجات', page: 'products' },
  { label: 'العروض', page: 'offers' },
  { label: 'الفروع', page: 'locations' },
  { label: 'تسجيل الدخول', page: 'login' },
]

function Header({
  currentPage,
  cartCount,
  onNavigate,
}: {
  currentPage: PageId
  cartCount: number
  onNavigate: (page: PageId) => void
}) {
  return (
    <header className="wow-header">
      <div className="wow-container wow-header-inner">
        <button className="brand-button" onClick={() => onNavigate('home')}>
          <span className="brand-mark">WOW</span>
          <span className="brand-copy">
            <strong>واو كوكيز</strong>
            <small>مخبوزات طازجة كل يوم</small>
          </span>
        </button>

        <nav className="wow-nav">
          {navItems.map((item) => (
            <button
              key={item.page}
              className={`wow-nav-link ${currentPage === item.page ? 'active' : ''}`}
              onClick={() => onNavigate(item.page)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="wow-header-actions">
          <button className="ghost-pill" onClick={() => onNavigate('cart')}>
            السلة
            {cartCount > 0 ? <span className="cart-count">{cartCount}</span> : null}
          </button>
          <button className="primary-pill" onClick={() => onNavigate('products')}>
            اطلب الآن
          </button>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="wow-footer">
      <div className="wow-container wow-footer-grid">
        <div>
          <h2>واو كوكيز</h2>
          <p>
            واجهة متجر عربية جاهزة لعرض الصور والوصف والعروض بطريقة واضحة، مع قابلية الربط
            لاحقاً مع قاعدة البيانات.
          </p>
        </div>
        <div>
          <p className="section-kicker">استكشف</p>
          <p>العروض</p>
          <p>الأعلى تقييماً</p>
          <p>الأكثر مبيعاً</p>
        </div>
        <div>
          <p className="section-kicker">جاهز للتطوير</p>
          <p>ربط المنتجات</p>
          <p>صور التخزين</p>
          <p>البيانات الحية</p>
        </div>
      </div>
    </footer>
  )
}

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
          <img src={featuredProduct.imageUrl || heroImage} alt={featuredProduct.name} className="hero-image" />
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

function IntroSection() {
  const stats = [
    { value: 'Live', label: 'محتوى من Supabase' },
    { value: '24h', label: 'تحديث سريع للمحتوى' },
    { value: '100%', label: 'تجربة عربية متناسقة' },
  ]

  const points = [
    {
      title: 'أقسام واضحة',
      description: 'العروض، الأعلى تقييماً، والأكثر مبيعاً تظهر بترتيب يساعد الزائر على الاستكشاف بسرعة.',
    },
    {
      title: 'جاهز للبيانات',
      description: 'كل قسم مصمم ليأخذ محتواه من قاعدة البيانات دون الحاجة لتغيير الواجهة.',
    },
    {
      title: 'واجهة تشجّع الطلب',
      description: 'عرض بصري قوي للصور والأسعار والوصف يجعل المنتجات أوضح وأكثر إقناعاً.',
    },
  ]

  return (
    <section className="section-block">
      <div className="wow-container intro-grid">
        <div className="glass-card intro-panel">
          <p className="section-kicker">واجهة المتجر</p>
          <h2>ترتيب رئيسي ذكي يسهل عرض المحتوى القادم من قاعدة البيانات</h2>
          <p className="section-description">
            الصفحة تبدأ بانطباع قوي ثم تنتقل إلى العروض، وبعدها المنتجات الأعلى تقييماً، ثم
            الأكثر مبيعاً، وأخيراً كل المنتجات في مساحة واضحة وسهلة التصفح.
          </p>
          <div className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="mini-card centered">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="feature-grid">
          {points.map((point) => (
            <div key={point.title} className="mini-card">
              <p className="section-kicker">ميزة مهمة</p>
              <h3>{point.title}</h3>
              <p>{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

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
            <article key={product.id} className={`showcase-card ${index % 2 === 1 ? 'reversed' : ''}`}>
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

function EmptyCollectionState({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}) {
  return (
    <div className="glass-card empty-collection-card">
      <p className="section-kicker">لا يوجد محتوى حالياً</p>
      <h3>{title}</h3>
      <p>{description}</p>
      {actionLabel && onAction ? (
        <button className="primary-pill small" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </div>
  )
}

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
  const featuredProduct = products.find((product) => product.flags.featured) ?? products[0]
  const topRated = products.filter((product) => product.flags.topRated)
  const mostSelling = products.filter((product) => product.flags.mostSelling)
  const homeSections = [
    {
      key: 'top-rated',
      eyebrow: 'الأعلى تقييماً',
      title: 'منتجات تستحق الواجهة الأمامية لأنها الأقوى في الانطباع والجودة',
      description:
        'هذا القسم مناسب لإبراز المنتجات التي تملك أفضل تفاعل أو أفضل حضور بصري، مع مساحة كبيرة للصورة والتفاصيل.',
      accentLabel: 'الأعلى تقييماً',
      items: topRated.length > 0 ? topRated : products.slice(0, 3),
    },
    {
      key: 'most-selling',
      eyebrow: 'الأكثر مبيعاً',
      title: 'خيارات محبوبة يطلبها العملاء باستمرار وتدفع الزائر للشراء بسرعة',
      description:
        'اعرض المنتجات الأكثر مبيعاً بشكل تحريري واضح يساعد على إبراز الصورة والسعر والوصف المختصر بطريقة مقنعة.',
      accentLabel: 'الأكثر مبيعاً',
      items: mostSelling.length > 0 ? mostSelling : products.slice(0, 3),
    },
  ]

  if (!featuredProduct) {
    return (
      <>
        <IntroSection />
        <section className="section-block">
          <div className="wow-container">
            <EmptyCollectionState
              title="لم يتم تحميل منتجات بعد"
              description="أضف منتجات فعالة داخل Supabase مع الاسم والسعر والصورة والوصف، وبعدها ستظهر الصفحة الرئيسية تلقائياً في أماكنها المناسبة."
              actionLabel="اذهب للمنتجات"
              onAction={() => onNavigate('products')}
            />
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <Hero featuredProduct={featuredProduct} onBrowse={() => onNavigate('products')} />
      <IntroSection />
      <OffersSection offers={offers} />
      {homeSections
        .filter((section) => section.items.length > 0)
        .map((section) => (
          <ShowcaseSection
            key={section.key}
            eyebrow={section.eyebrow}
            title={section.title}
            description={section.description}
            items={section.items}
            accentLabel={section.accentLabel}
            onAddToCart={onAddToCart}
          />
        ))}
      <ProductGridSection
        title="التشكيلة الكاملة في شبكة مرنة وواضحة"
        description="بعد عرض العروض والمنتجات البارزة، يصل الزائر إلى جميع المنتجات في شكل منظم وسهل للربط مستقبلاً مع قاعدة البيانات."
        items={products}
        onAddToCart={onAddToCart}
      />
    </>
  )
}

function ProductsPage({
  products,
  onAddToCart,
}: {
  products: StorefrontProduct[]
  onAddToCart: (product: StorefrontProduct) => void
}) {
  const [selectedCategories, setSelectedCategories] = useState<StorefrontProduct['category'][]>([])
  const [sortOrder, setSortOrder] = useState<'price-asc' | 'price-desc'>('price-asc')
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const categoryOptions = useMemo(
    () => [...new Set(products.map((product) => product.category))],
    [products],
  )

  const visibleProducts = useMemo(() => {
    const filtered =
      selectedCategories.length === 0
        ? products
        : products.filter((product) => selectedCategories.includes(product.category))

    return [...filtered].sort((first, second) =>
      sortOrder === 'price-asc' ? first.price - second.price : second.price - first.price,
    )
  }, [products, selectedCategories, sortOrder])
  const activeFilterCount = selectedCategories.length + (sortOrder === 'price-desc' ? 1 : 0)

  const toggleCategory = (category: StorefrontProduct['category']) => {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    )
  }

  const toggleProductCard = (productId: string) => {
    setExpandedProductId((current) => (current === productId ? null : productId))
  }

  const featuredProducts =
    products.filter((product) => product.flags.featured).slice(0, 3).length > 0
      ? products.filter((product) => product.flags.featured).slice(0, 3)
      : products.slice(0, 3)

  return (
    <main className="page-shell">
      <section className="banner-section products-hero">
        <div className="wow-container banner-grid">
          <div className="products-hero-copy">
            <p className="section-kicker">صفحة المنتجات</p>
            <h1 className="page-title">اكتشف التشكيلة الكاملة من الكوكيز والبوكسات والمشروبات</h1>
            <p className="section-description">
              تصميم أقرب لواجهات متاجر الكوكيز الحديثة: صور كبيرة، بطاقات نظيفة، ومساحة واضحة
              تجعل استبدال المحتوى لاحقاً من Supabase سهلاً جداً.
            </p>
            <div className="products-hero-tags">
              <span>صور كبيرة</span>
              <span>بيانات من Supabase</span>
              <span>فلاتر واضحة</span>
            </div>
          </div>
          <div className="products-hero-stack">
            <div className="glass-card summary-panel">
              <p className="section-kicker">ملخص سريع</p>
              <div className="summary-row">
                <span>عدد المنتجات</span>
                <strong>{products.length}</strong>
              </div>
              <div className="summary-row">
                <span>الفئات المتاحة</span>
                <strong>كوكيز، بوكسات، مشروبات</strong>
              </div>
              <div className="summary-row">
                <span>أسلوب العرض</span>
                <strong>بطاقات كبيرة أقرب لمتاجر الكوكيز الحديثة</strong>
              </div>
            </div>
            <div className="products-featured-strip">
              {featuredProducts.map((product) => (
                <article key={product.id} className="products-featured-card">
                  <img src={product.imageUrl} alt={product.name} className="products-featured-image" />
                  <div>
                    <p className="section-kicker">{product.category}</p>
                    <h3>{product.name}</h3>
                    <span>{product.price} ريال</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="wow-container products-layout">
          <aside className={`glass-card filters-panel ${filtersOpen ? 'is-open' : ''}`}>
            <button className="filters-toggle" onClick={() => setFiltersOpen((current) => !current)} aria-expanded={filtersOpen}>
              <span>الفلاتر {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
              <strong>{filtersOpen ? '−' : '+'}</strong>
            </button>

            {filtersOpen ? (
              <div className="filters-panel-body">
                <div className="row-between">
                  <h2>تخصيص العرض</h2>
                  <button
                    className="link-button"
                    onClick={() => {
                      setSelectedCategories([])
                      setSortOrder('price-asc')
                      setExpandedProductId(null)
                    }}
                  >
                    إعادة ضبط
                  </button>
                </div>

                <div className="filter-group">
                  <h3>الفئات</h3>
                  {categoryOptions.map((category) => (
                    <label key={category} className="checkbox-row">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                      />
                      <span>{category}</span>
                    </label>
                  ))}
                </div>

                <div className="filter-group">
                  <h3>ترتيب السعر</h3>
                  <div className="sort-arrow-group">
                    <button
                      type="button"
                    className={`sort-arrow-button ${sortOrder === 'price-asc' ? 'active' : ''}`}
                      onClick={() => setSortOrder('price-asc')}
                      aria-label="ترتيب السعر من الأقل إلى الأعلى"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      className={`sort-arrow-button ${sortOrder === 'price-desc' ? 'active' : ''}`}
                      onClick={() => setSortOrder('price-desc')}
                      aria-label="ترتيب السعر من الأعلى إلى الأقل"
                    >
                      ↓
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </aside>

          <div className="products-content">
            <div className="row-between products-head">
              <div>
                <p className="section-kicker">كل المنتجات</p>
                <h2>واجهة عرض المنتجات</h2>
                <p className="products-subhead">المنتجات المعروضة هنا تتغير مباشرة بحسب البيانات والفلاتر القادمة من backend.</p>
              </div>
              <div className="products-count">
                يتم عرض <strong>{visibleProducts.length}</strong> منتج
              </div>
            </div>
            {visibleProducts.length === 0 ? (
              <EmptyCollectionState
                title="لا توجد منتجات مطابقة للفلاتر"
                description="جرّب إزالة بعض الفلاتر أو أضف منتجات جديدة في قاعدة البيانات ضمن هذه الفئة."
                actionLabel="إعادة ضبط"
                onAction={() => {
                  setSelectedCategories([])
                  setSortOrder('price-asc')
                  setExpandedProductId(null)
                }}
              />
            ) : (
              <div className="products-zigzag-list">
                {visibleProducts.map((product, index) => (
                  <article
                    key={product.id}
                    className={`product-card product-zigzag-card ${index % 2 === 1 ? 'is-reversed' : ''} ${expandedProductId === product.id ? 'is-expanded' : ''}`}
                    onClick={() => toggleProductCard(product.id)}
                  >
                    <div className="product-image-wrap">
                      {expandedProductId === product.id ? (
                        <div className="product-description-panel">
                          <span className="product-description-label">وصف المنتج</span>
                          <p>{product.detailedDescription}</p>
                        </div>
                      ) : (
                        <>
                          <img src={product.imageUrl} alt={product.name} className="product-image" />
                          <span className="product-floating-chip">{product.category}</span>
                        </>
                      )}
                    </div>
                    <div className="product-card-body">
                      <p className="section-kicker">{product.category}</p>
                      <h3>{product.name}</h3>
                      <p className="product-short-copy">{product.shortDescription}</p>
                      <p className="muted-copy">
                        {expandedProductId === product.id
                          ? 'اضغط مرة أخرى للعودة إلى الصورة.'
                          : 'اضغط على البطاقة لعرض الوصف مكان الصورة.'}
                      </p>
                      <div className="product-card-footer">
                        <div className="product-price-block">
                          <span>السعر</span>
                          <strong>{product.price} ريال</strong>
                        </div>
                        <button
                          className="primary-pill small"
                          onClick={(event) => {
                            event.stopPropagation()
                            onAddToCart(product)
                          }}
                        >
                          أضف إلى السلة
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

function CartPage({
  items,
  onNavigate,
  onRemove,
  onUpdateQuantity,
  onClear,
}: {
  items: CartItem[]
  onNavigate: (page: PageId) => void
  onRemove: (productId: string) => void
  onUpdateQuantity: (productId: string, quantity: number) => void
  onClear: () => void
}) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (items.length === 0) {
    return (
      <main className="empty-state-shell">
        <div className="glass-card empty-card">
          <p className="section-kicker">السلة</p>
          <h1>السلة فارغة حالياً</h1>
          <p>لم تقم بإضافة أي منتج بعد. ابدأ من صفحة المنتجات واختر النكهات التي ترغب بها.</p>
          <button className="primary-pill" onClick={() => onNavigate('products')}>
            تصفح المنتجات
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="page-shell">
      <section className="wow-container cart-hero">
        <div>
          <p className="section-kicker">سلة التسوق</p>
          <h1 className="page-title">راجع طلبك قبل المتابعة للدفع</h1>
          <p className="section-description">
            عدّل الكميات أو احذف أي منتج، ثم تابع إلى تسجيل الدخول لإكمال الطلب.
          </p>
        </div>
        <div className="glass-card cart-count-card">
          <span>عدد الأصناف</span>
          <strong>{items.length}</strong>
        </div>
      </section>

      <section className="section-block">
        <div className="wow-container cart-layout">
          <div className="cart-items-column">
            {items.map((item) => (
              <article key={item.id} className="cart-item-card">
                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                <div className="cart-item-body">
                  <div className="row-between row-start">
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.shortDescription}</p>
                    </div>
                    <button className="danger-pill" onClick={() => onRemove(item.id)}>
                      إزالة
                    </button>
                  </div>
                  <div className="row-between wrap-row">
                    <div className="quantity-control">
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <div className="cart-pricing">
                      <span>{item.price} ريال</span>
                      <strong>{item.price * item.quantity} ريال</strong>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="glass-card cart-summary-card">
            <p className="section-kicker">الملخص</p>
            <h2>إجمالي الطلب</h2>
            <div className="summary-row">
              <span>المنتجات</span>
              <strong>{total} ريال</strong>
            </div>
            <div className="summary-row">
              <span>التوصيل</span>
              <strong>يحدد لاحقاً</strong>
            </div>
            <div className="summary-row">
              <span>الإجمالي</span>
              <strong>{total} ريال</strong>
            </div>
            <button className="primary-pill full-width" onClick={() => onNavigate('login')}>
              المتابعة للدفع
            </button>
            <button className="ghost-pill full-width" onClick={onClear}>
              إفراغ السلة
            </button>
          </aside>
        </div>
      </section>
    </main>
  )
}

function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setEmailError('يرجى إدخال بريد إلكتروني صحيح')
      return
    }
    setEmailError('')
    void password
  }

  return (
    <main className="page-shell">
      <section className="wow-container login-layout">
        <div className="login-aside">
          <p className="section-kicker">حسابك</p>
          <h1>{isSignUp ? 'أنشئ حساباً جديداً وابدأ الطلب' : 'سجّل دخولك وأكمل طلبك بسرعة'}</h1>
          <p>
            صفحة دخول متناسقة مع المتجر، مهيأة لاحقاً لربط تسجيل الدخول الحقيقي وإدارة الطلبات والعناوين والمفضلة.
          </p>
          <div className="feature-grid single-column">
            <div className="mini-card">
              <h3>طلب أسرع</h3>
              <p>احفظ بياناتك وواصل الشراء دون خطوات مربكة.</p>
            </div>
            <div className="mini-card">
              <h3>واجهة واضحة</h3>
              <p>حقول مريحة على الجوال وسطح المكتب مع رسائل تنبيه واضحة.</p>
            </div>
            <div className="mini-card">
              <h3>قابل للتطوير</h3>
              <p>جاهز للربط لاحقاً مع المصادقة وقاعدة البيانات.</p>
            </div>
          </div>
        </div>

        <div className="glass-card login-card">
          <div className="switcher">
            <button className={!isSignUp ? 'active' : ''} onClick={() => setIsSignUp(false)}>
              تسجيل الدخول
            </button>
            <button className={isSignUp ? 'active' : ''} onClick={() => setIsSignUp(true)}>
              إنشاء حساب
            </button>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <label className="field">
              <span>البريد الإلكتروني</span>
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" />
            </label>
            {emailError ? <p className="error-message">{emailError}</p> : null}

            <label className="field">
              <span>كلمة المرور</span>
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" />
            </label>

            <button type="submit" className="primary-pill full-width">
              {isSignUp ? 'إنشاء حساب' : 'تسجيل الدخول'}
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

function SimplePage({ title, description }: { title: string; description: string }) {
  return (
    <main className="page-shell">
      <section className="wow-container centered-banner">
        <div className="glass-card centered-card">
          <p className="section-kicker">مسار جاهز</p>
          <h1 className="page-title">{title}</h1>
          <p className="section-description">{description}</p>
        </div>
      </section>
    </main>
  )
}

function LoadingPage() {
  return (
    <main className="page-shell">
      <section className="wow-container centered-banner">
        <div className="glass-card centered-card">
          <p className="section-kicker">تحميل البيانات</p>
          <h1 className="page-title">جاري جلب المحتوى من Supabase</h1>
          <p className="section-description">يتم الآن تحميل المنتجات والعروض والتقسيمات الأساسية للمتجر.</p>
        </div>
      </section>
    </main>
  )
}

function ErrorPage({ message }: { message: string }) {
  return (
    <main className="page-shell">
      <section className="wow-container centered-banner">
        <div className="glass-card centered-card">
          <p className="section-kicker">تعذر التحميل</p>
          <h1 className="page-title">لم نتمكن من جلب بيانات المتجر</h1>
          <p className="section-description">{message}</p>
        </div>
      </section>
    </main>
  )
}

function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home')
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [products, setProducts] = useState<StorefrontProduct[]>([])
  const [offers, setOffers] = useState<StorefrontOffer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isActive = true

    fetchStorefrontData()
      .then((data) => {
        if (!isActive) return
        setProducts(data.products)
        setOffers(data.offers)
      })
      .catch((err: unknown) => {
        if (!isActive) return
        const message = err instanceof Error ? err.message : 'تحقق من جداول المنتجات أو مفاتيح Supabase.'
        setError(message)
      })
      .finally(() => {
        if (isActive) setLoading(false)
      })

    return () => {
      isActive = false
    }
  }, [])

  const addToCart = (product: StorefrontProduct) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id)
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...currentItems, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCartItems((currentItems) =>
      currentItems.map((item) => (item.id === productId ? { ...item, quantity } : item)),
    )
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="app-shell">
      <Header currentPage={currentPage} cartCount={cartCount} onNavigate={setCurrentPage} />

      {loading ? <LoadingPage /> : null}
      {!loading && error ? <ErrorPage message={error} /> : null}
      {!loading && !error && currentPage === 'home' ? (
        <HomePage offers={offers} products={products} onNavigate={setCurrentPage} onAddToCart={addToCart} />
      ) : null}
      {!loading && !error && currentPage === 'products' ? (
        <ProductsPage products={products} onAddToCart={addToCart} />
      ) : null}
      {!loading && !error && currentPage === 'cart' ? (
        <CartPage
          items={cartItems}
          onNavigate={setCurrentPage}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
          onClear={() => setCartItems([])}
        />
      ) : null}
      {!loading && !error && currentPage === 'login' ? <LoginPage /> : null}
      {!loading && !error && currentPage === 'offers' ? (
        <SimplePage
          title="صفحة العروض"
          description="هذه الصفحة جاهزة كمسار مستقل، ويمكن ربطها لاحقاً بعروض قاعدة البيانات أو لوحة التحكم."
        />
      ) : null}
      {!loading && !error && currentPage === 'locations' ? (
        <SimplePage
          title="صفحة الفروع"
          description="هذا المسار جاهز الآن ضمن الواجهة ويمكن تطويره لاحقاً ليعرض الفروع وساعات العمل."
        />
      ) : null}

      <Footer />
    </div>
  )
}

export default App