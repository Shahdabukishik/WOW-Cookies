import { ProductCard } from "@/components/ProductCard"
import EmptyCollectionState from "@/components/common/EmptyCollectionState"
import { useCart } from "@/hooks/useCart"
import { useOfferProductsCatalog } from "@/hooks/useProductsCatalog"
import { trackCurrentUserInteraction } from "@/services/interaction"
import { useNavigate } from "react-router-dom"

export default function OffersPage() {
  const cart = useCart()
  const { offerProducts, isLoading } = useOfferProductsCatalog()
  const navigate = useNavigate()

  const handleViewDetails = async (productId: string) => {
    await trackCurrentUserInteraction(productId, "click", {
      source: "offers_grid_details",
      metadata: { page: "offers" },
    })
  }

  if (isLoading) return <p>Loading...</p>

  return (
    <main className="page-shell">
      <section className="section-block">
        <div className="wow-container">
          {offerProducts.length === 0 ? (
            <EmptyCollectionState
              description="Check back soon for fresh cookie deals."
              title="No active offers"
            />
          ) : (
            <div className="row">
              {offerProducts.map((product) => (
                <div className="col-md-4 mb-3" key={product.id}>
                  <ProductCard
                    product={product}
                    onAddToCart={cart.addToCart}
                    onViewDetails={(product) => {
                      void handleViewDetails(product.id)
                      navigate(`/products/${product.id}`)
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
