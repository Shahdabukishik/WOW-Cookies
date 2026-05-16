import { InfoBox } from "./InfoBox"
import { OrderItemsSection } from "./OrderItemsSection"

export const OrderCard = ({
  order,
  expanded,
  setExpanded,
  changeStatus,
  getStatusData,
  STATUS_OPTIONS,
}: any) => {
  const statusData = getStatusData(order.status)

  return (
    <div className="card border-0 shadow-sm rounded-4">
      <div className="card-body p-4">

        <div className="d-flex justify-content-between mb-4">
          <div>
            <h5 className="fw-bold">
              طلب #{order.id.slice(0, 8)}
            </h5>
            <small className="text-muted">
              {new Date(order.created_at).toLocaleString("ar-EG")}
            </small>
          </div>

          <div className="d-flex gap-2">
            <span className={`badge bg-${statusData.color}`}>
              {statusData.label}
            </span>

            <select
              value={order.status}
              onChange={(e) =>
                changeStatus(order.id, e.target.value)
              }
              className="form-select"
            >
              {STATUS_OPTIONS.map((s: any) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row g-3">
          <InfoBox label="الاسم الأول" value={order.first_name} />
          <InfoBox label="الاسم الأخير" value={order.last_name} />
          <InfoBox label="رقم الجوال" value={order.phone} />
          <InfoBox label="طريقة الاستلام" value={order.fulfillment_method} />
          <InfoBox label="العنوان" value={order.address} />
          <InfoBox label="المجموع" value={`${order.total_price} ₪`} />
        </div>

        <button
          className="btn btn-outline-dark mt-4"
          onClick={() =>
            setExpanded(expanded === order.id ? null : order.id)
          }
        >
          عرض / إخفاء المنتجات
        </button>

        {expanded === order.id && (
          <OrderItemsSection items={order.order_items} />
        )}

      </div>
    </div>
  )
}