import { ProductCard } from "@/components/ProductCard"
import EmptyCollectionState from "@/components/common/EmptyCollectionState"
import { useCart } from "@/hooks/useCart"
import { useOfferProductsCatalog } from "@/hooks/useProductsCatalog"

export default function OffersPage() {
  const cart = useCart()
  const { offerProducts, isLoading } = useOfferProductsCatalog()

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
                  <ProductCard product={product} onAddToCart={cart.addToCart} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

