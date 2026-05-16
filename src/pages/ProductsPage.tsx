import { ProductCard } from "@/components/ProductCard"
import EmptyCollectionState from "@/components/common/EmptyCollectionState"
import { Filters } from "@/components/Filters"
import { useCart } from "@/hooks/useCart"
import { useProductsCatalog } from "@/hooks/useProductsCatalog"
import { trackCurrentUserInteraction } from "@/services/interaction"
import { useNavigate } from "react-router-dom"

export default function ProductsPage() {
  const cart = useCart()
  const { filters, isLoading } = useProductsCatalog()
  const navigate = useNavigate()
  const visibleProducts = filters.visibleProducts.filter((product) => {
    const name = product.name.toLowerCase()
    const isCoffeeOrMilk = name.includes("coffee") || name.includes("milk") || name.includes("قهوة") || name.includes("حليب")
    return !isCoffeeOrMilk
  })

  const handleAddToCart = async (productId: string) => {
    await trackCurrentUserInteraction(productId, "add_to_cart", {
      source: "products_grid",
      metadata: { page: "products" },
    })
  }

  const handleViewDetails = async (productId: string) => {
    await trackCurrentUserInteraction(productId, "click", {
      source: "products_grid_details",
      metadata: { page: "products" },
    })
  }

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
            ) : visibleProducts.length === 0 ? (
              <EmptyCollectionState
                actionLabel="Reset"
                description=""
                title="No products"
                onAction={filters.resetFilters}
              />
            ) : (
              <div className="products-zigzag-list">
                {visibleProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={(product) => {
                      cart.addToCart(product)
                      void handleAddToCart(product.id)
                    }}
                    onViewDetails={(product) => {
                      void handleViewDetails(product.id)
                      navigate(`/products/${product.id}`)
                    }}
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
