import type { CartItemView } from "@/services/cart.service"

type CartItemsProps = {
  items: CartItemView[]
  selectedItemIds?: string[]
  disabled?: boolean
  onToggleSelection: (itemId: string) => void
  onQuantityChange: (itemId: string, quantity: number) => void
  onRemove: (itemId: string) => void
}

export function CartItems({
  items,
  selectedItemIds = [],
  disabled = false,
  onToggleSelection,
  onQuantityChange,
  onRemove,
}: CartItemsProps) {
  return (
    <div className="cart-items">
      {items.map((item) => (
        <article className="cart-item glass-card" key={item.id}>
          <input
            aria-label={`Select ${item.product.name}`}
            checked={selectedItemIds.includes(item.id)}
            className="form-check-input cart-check"
            disabled={disabled}
            type="checkbox"
            onChange={() => onToggleSelection(item.id)}
          />

          <img
            alt={item.product.name}
            className="cart-item-image"
            src={item.product.image_url || ""}
          />

          <div className="cart-item-info">
            <h3>{item.product.name}</h3>
            <p>{item.product.description}</p>
            <strong>
              {item.unitPrice} ₪
              {item.product.discount ? (
                <span className="text-muted text-decoration-line-through ms-2">
                  {item.originalUnitPrice} ₪
                </span>
              ) : null}
            </strong>
          </div>

          <div className="cart-item-actions">
            <div className="quantity-control" aria-label="Quantity">
              <button
                aria-label="Decrease quantity"
                disabled={disabled || item.quantity <= 1}
                type="button"
                onClick={() => onQuantityChange(item.id, item.quantity - 1)}
              >
                <i className="bi bi-dash"></i>
              </button>
              <span>{item.quantity}</span>
              <button
                aria-label="Increase quantity"
                disabled={disabled}
                type="button"
                onClick={() => onQuantityChange(item.id, item.quantity + 1)}
              >
                <i className="bi bi-plus"></i>
              </button>
            </div>

            <button
              className="cart-remove-button"
              disabled={disabled}
              type="button"
              onClick={() => onRemove(item.id)}
            >
              حذف
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}
