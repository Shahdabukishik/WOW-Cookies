import { type OrderItem } from "@/types/database.types"

export const OrderItemsSection = ({
  items,
}: {
  items: OrderItem[]
}) => {
  return (
    <div className="mt-3 border-top pt-3">
      <h6 className="fw-bold mb-3">المنتجات</h6>

      <div className="d-flex flex-column gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="d-flex justify-content-between border rounded p-2"
          >
            <div>
              <p className="mb-1 fw-bold">
                {item.product_id}
              </p>
              <small>الكمية: {item.quantity}</small>
            </div>

            <strong>
              {(item.price * item.quantity).toFixed(2)} ₪
            </strong>
          </div>
        ))}
      </div>
    </div>
  )
}