import { ProductCard } from "@/components/ProductCard"
import EmptyCollectionState from "@/components/common/EmptyCollectionState"
import { Filters } from "@/components/Filters"
import { useCart } from "@/hooks/useCart"
import { useProductsCatalog } from "@/hooks/useProductsCatalog"

export default function ProductsPage() {
  const cart = useCart()
  const { filters, isLoading } = useProductsCatalog()

  return (
    <main className="page-shell">
      <section className="section-block">
        <div className="wow-container products-layout">
          <Filters
            selectedCategories={filters.selectedCategories}
            sortOrder={filters.sortOrder}
            onSortChange={filters.setSortOrder}
            onToggleCategory={filters.toggleCategory}
          />

          <div className="products-content">
            {isLoading ? (
              <p>Loading...</p>
            ) : filters.visibleProducts.length === 0 ? (
              <EmptyCollectionState
                actionLabel="Reset"
                description=""
                title="No products"
                onAction={filters.resetFilters}
              />
            ) : (
              <div className="products-zigzag-list">
                {filters.visibleProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={cart.addToCart}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

