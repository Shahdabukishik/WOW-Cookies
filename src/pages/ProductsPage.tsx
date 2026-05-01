import { useProducts } from "@/hooks/useProducts"
import { useProductFilters } from "@/features/products/useProductFilters"
import { ProductCard } from "@/components/ProductCard"
import { Filters } from "@/components/Filters"
import EmptyCollectionState from "@/components/common/EmptyCollectionState"

export default function ProductsPage({ onAddToCart }: any) {
  const { products, loading } = useProducts()
  const filters = useProductFilters(products)


  return (
    <main className="page-shell">
      <section className="section-block">
        <div className="wow-container products-layout">

          <Filters
           
            
            selectedCategories={filters.selectedCategories}
           
            sortOrder={filters.sortOrder}
            onToggleCategory={(c) =>
              filters.setSelectedCategories((prev) =>
                prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
              )
            }
            onSortChange={filters.setSortOrder}
            
          />

          <div className="products-content">

            {loading ? (
              <p>Loading...</p>
            ) : filters.visibleProducts.length === 0 ? (
              <EmptyCollectionState
                title="لا يوجد منتجات"
                description=""
                actionLabel="Reset"
                onAction={filters.resetFilters}
              />
            ) : (
              <div className="products-zigzag-list">
                {filters.visibleProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onAddToCart={onAddToCart}
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