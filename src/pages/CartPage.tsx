import { useEffect, useRef, useState } from "react"
import { CartItems } from "@/components/cart/CartItems"
import { CheckoutModal } from "@/components/cart/CheckoutModal"
import EmptyCollectionState from "@/components/common/EmptyCollectionState"
import { useCart } from "@/hooks/useCart"
import { useCheckout } from "@/hooks/useCheckout"
import { useProducts } from "@/hooks/useProducts"

export default function CartPage() {
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [showOrderToast, setShowOrderToast] = useState(false)
  const orderToastTimerRef = useRef<number | null>(null)
  const cart = useCart()
  const { products } = useProducts()
  const checkout = useCheckout(cart.selectedItems, {
    onSuccess: async () => {
      cart.removeMany(cart.selectedItems.map((item) => item.id))
      await cart.refreshCart()
      setCheckoutOpen(false)
      setShowOrderToast(true)

      if (orderToastTimerRef.current !== null) {
        window.clearTimeout(orderToastTimerRef.current)
      }

      orderToastTimerRef.current = window.setTimeout(() => {
        setShowOrderToast(false)
        orderToastTimerRef.current = null
      }, 5000)
    },
  })

  useEffect(() => {
    return () => {
      if (orderToastTimerRef.current !== null) {
        window.clearTimeout(orderToastTimerRef.current)
      }
    }
  }, [])

  const addonProducts = products
    .filter((product) => product.category === "drink")
    .filter((product) => {
      const n = product.name.toLowerCase()
      return n.includes("coffee") || n.includes("milk") || n.includes("قهوة") || n.includes("حليب")
    })
    .slice(0, 2)

  const fallbackAddons = products.filter((product) => product.category === "drink").slice(0, 2)
  const suggestedAddons = addonProducts.length > 0 ? addonProducts : fallbackAddons

  if (cart.loading) return <p>جاري التحميل...</p>

  return (
    <main className="page-shell">
      <section className="section-block">
        <div className="wow-container cart-page">
          <header className="cart-header">
            <div>
              <p className="section-kicker">السلة</p>
              <h1>سلة التسوق الخاصة بك</h1>
              <p className="section-description">حدد العناصر التي ترغب في طلبها الآن.</p>
            </div>
          </header>

          {cart.error ? <p className="error-message">{cart.error}</p> : null}

          {!cart.hasItems ? (
            <EmptyCollectionState
              title="سلة التسوق فارغة"
              description="أضف كوكيز أو مشروبات أو بوكسات لبدء الطلب."
            />
          ) : (
            <div className="cart-layout">
              <CartItems
                disabled={cart.mutating}
                items={cart.items}
                selectedItemIds={cart.selectedItemIds}
                onQuantityChange={cart.updateQuantity}
                onRemove={cart.removeFromCart}
                onToggleSelection={cart.toggleItemSelection}
              />

              <div className="cart-side-column">
                <aside className="cart-summary glass-card">
                  <h2>الملخص</h2>
                  <div className="cart-summary-row">
                    <span>العناصر المحددة</span>
                    <strong>{cart.selectedItemsCount}</strong>
                  </div>
                  <div className="cart-summary-row total">
                    <span>الإجمالي</span>
                    <strong>{cart.totalPriceLabel}</strong>
                  </div>
                  <button
                    className="primary-pill full-width"
                    disabled={!cart.canCheckout}
                    type="button"
                    onClick={() => setCheckoutOpen(true)}
                  >
                    إتمام الطلب
                  </button>
                </aside>

                {suggestedAddons.length > 0 ? (
                  <aside className="cart-addons glass-card">
                    <h3>أضف مع الطلب</h3>
                    <p>قهوة أو حليب؟ اختر بسرعة.</p>
                    <div className="cart-addons-list">
                      {suggestedAddons.map((product) => (
                        <article key={product.id} className="cart-addon-item">
                          <img src={product.image_url || ""} alt={product.name} />
                          <div>
                            <strong>{product.name}</strong>
                            <span>{product.price} ₪</span>
                          </div>
                          <button type="button" className="product-action" onClick={() => cart.addToCart(product)}>
                            + أضف
                          </button>
                        </article>
                      ))}
                    </div>
                  </aside>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </section>

      <CheckoutModal
        canSubmit={checkout.canSubmit}
        error={checkout.error}
        isOpen={checkoutOpen}
        selectedItems={checkout.selectedItems}
        submitting={checkout.submitting}
        totalPriceLabel={checkout.totalPriceLabel}
        values={checkout.formValues}
        onClose={() => setCheckoutOpen(false)}
        onConfirm={checkout.confirmOrder}
        onFieldChange={checkout.updateField}
      />

      <div className={`cart-toast ${showOrderToast ? "show" : ""}`} role="status" aria-live="polite">
        تم الطلب بنجاح
      </div>
    </main>
  )
}
