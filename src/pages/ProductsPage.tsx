import { useMemo, useState } from 'react'
import type { StorefrontProduct } from '../services/storefront.service'
import EmptyCollectionState from '../components/common/EmptyCollectionState'

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
            <button
              className="filters-toggle"
              onClick={() => setFiltersOpen((current) => !current)}
              aria-expanded={filtersOpen}
            >
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
                <p className="products-subhead">
                  المنتجات المعروضة هنا تتغير مباشرة بحسب البيانات والفلاتر القادمة من backend.
                </p>
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
                    className={`product-card product-zigzag-card ${index % 2 === 1 ? 'is-reversed' : ''} ${
                      expandedProductId === product.id ? 'is-expanded' : ''
                    }`}
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

export default ProductsPage