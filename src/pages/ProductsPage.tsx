import { useMemo, useState } from 'react'
import type { StorefrontProduct } from '../services/storefront.service'
import EmptyCollectionState from '../components/common/EmptyCollectionState'

function ProductsPage({
  products,
  onAddToCart,
  onOpenProduct,
}: {
  products: StorefrontProduct[]
  onAddToCart: (product: StorefrontProduct) => void
  onOpenProduct: (product: StorefrontProduct) => void
}) {
  const [selectedCategories, setSelectedCategories] = useState<StorefrontProduct['category'][]>([])
  const [sortOrder, setSortOrder] = useState<'price-asc' | 'price-desc'>('price-asc')

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

  const toggleCategory = (category: StorefrontProduct['category']) => {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    )
  }

  return (
    <main className="products-desktop-page">
      <section className="products-desktop-hero">
        <div>
          <p className="products-label">صفحة المنتجات</p>
          <h1>
            طازج <span>مخبوز</span> يومياً
          </h1>
          <p>
            نُحضّر منتجاتنا بحب باستخدام أجود المكونات الطبيعية لنمنحك تجربة لا تُنسى.
          </p>
        </div>
      </section>

      <section className="products-toolbar">
        <div className="category-tabs">
          {categoryOptions.map((category) => (
            <button
              key={category}
              className={selectedCategories.includes(category) ? 'active' : ''}
              onClick={() => toggleCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <select
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value as 'price-asc' | 'price-desc')}
        >
          <option value="price-asc">السعر: من الأقل إلى الأعلى</option>
          <option value="price-desc">السعر: من الأعلى إلى الأقل</option>
        </select>
      </section>

      {visibleProducts.length === 0 ? (
        <EmptyCollectionState
          title="لا توجد منتجات مطابقة"
          description="جرّب تغيير الفلاتر."
          actionLabel="إعادة ضبط"
          onAction={() => {
            setSelectedCategories([])
            setSortOrder('price-asc')
          }}
        />
      ) : (
        <section className="products-desktop-grid">
          {visibleProducts.map((product) => (
            <article
              key={product.id}
              className="desktop-product-card"
              onClick={() => onOpenProduct(product)}
            >
              {product.flags.mostSelling && <span className="badge">الأكثر مبيعاً</span>}

              <img src={product.imageUrl} alt={product.name} />

              <div className="desktop-product-info">
                <h3>{product.name}</h3>
                <p>{product.shortDescription}</p>
                <strong>{product.price} ريال</strong>
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
        </section>
      )}
    </main>
  )
}

export default ProductsPage