import type { CheckoutFormValues } from "@/hooks/useCheckout"
import type { CartItemView } from "@/services/cart.service"

type CheckoutModalProps = {
  isOpen: boolean
  values: CheckoutFormValues
  selectedItems: CartItemView[]
  totalPriceLabel: string
  canSubmit: boolean
  submitting: boolean
  error: string | null
  onClose: () => void
  onConfirm: () => void
  onFieldChange: <Key extends keyof CheckoutFormValues>(
    field: Key,
    value: CheckoutFormValues[Key]
  ) => void
}

export function CheckoutModal({
  isOpen,
  values,
  selectedItems,
  totalPriceLabel,
  canSubmit,
  submitting,
  error,
  onClose,
  onConfirm,
  onFieldChange,
}: CheckoutModalProps) {
  if (!isOpen) return null

  return (
    <div className="checkout-backdrop" role="presentation">
      <section
        aria-modal="true"
        className="checkout-modal glass-card"
        role="dialog"
      >
        <header className="checkout-modal-header">
          <div>
            <p className="section-kicker">إتمام الطلب</p>
            <h2>تأكيد الطلب</h2>
          </div>
          <button
            aria-label="Close checkout"
            className="icon-button"
            type="button"
            onClick={onClose}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </header>

        <div className="checkout-modal-body">
          <form className="checkout-form">
            <label className="field">
              الاسم الأول
              <input
                value={values.firstName}
                onChange={(event) => onFieldChange("firstName", event.target.value)}
              />
            </label>

            <label className="field">
              الاسم الأخير
              <input
                value={values.lastName}
                onChange={(event) => onFieldChange("lastName", event.target.value)}
              />
            </label>

            <label className="field">
              رقم الهاتف
              <input
                inputMode="tel"
                value={values.phone ?? ""}
                onChange={(event) => onFieldChange("phone", event.target.value)}
              />
            </label>

            <label className="field checkout-full-field">
              العنوان
              <input
                disabled={values.fulfillmentMethod === "pickup"}
                value={values.fulfillmentMethod === "pickup" ? "" : values.address}
                onChange={(event) => onFieldChange("address", event.target.value)}
              />
            </label>

            <div className="checkout-full-field fulfillment-options" role="group">
              <button
                className={values.fulfillmentMethod === "delivery" ? "active" : ""}
                type="button"
                onClick={() => onFieldChange("fulfillmentMethod", "delivery")}
              >
                توصيل
              </button>
              <button
                className={values.fulfillmentMethod === "pickup" ? "active" : ""}
                type="button"
                onClick={() => onFieldChange("fulfillmentMethod", "pickup")}
              >
                نقطة استلام
              </button>
            </div>
          </form>

          <aside className="checkout-summary">
            <h3>ملخص الطلب</h3>
            <div className="checkout-summary-items">
              {selectedItems.map((item) => (
                <div className="checkout-summary-row" key={item.id}>
                  <span>{item.product.name}</span>
                  <span>
                    {item.quantity} × {item.unitPrice} ₪
                  </span>
                </div>
              ))}
            </div>
            <div className="checkout-total">
              <span>الإجمالي</span>
              <strong>{totalPriceLabel}</strong>
            </div>
          </aside>
        </div>

        {error ? <p className="error-message">{error}</p> : null}

        <footer className="checkout-modal-footer">
          <button className="btn btn-outline-secondary" type="button" onClick={onClose}>
            إلغاء
          </button>
          <button
            className="primary-pill"
            disabled={!canSubmit || submitting}
            type="button"
            onClick={onConfirm}
          >
            {submitting ? "جاري التأكيد..." : "تأكيد الطلب"}
          </button>
        </footer>
      </section>
    </div>
  )
}
