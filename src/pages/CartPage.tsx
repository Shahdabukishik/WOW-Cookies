import { useState } from "react"
import { CartItems } from "@/components/cart/CartItems"
import { CheckoutModal } from "@/components/cart/CheckoutModal"
import EmptyCollectionState from "@/components/common/EmptyCollectionState"
import { useCart } from "@/hooks/useCart"
import { useCheckout } from "@/hooks/useCheckout"

export default function CartPage() {
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const cart = useCart()
  const checkout = useCheckout(cart.selectedItems, {
    onSuccess: async () => {
      cart.removeMany(cart.selectedItems.map((item) => item.id))
      await cart.refreshCart()
      setCheckoutOpen(false)
    },
  })

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
    </main>
  )
}
