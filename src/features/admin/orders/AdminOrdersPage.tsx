import { useEffect, useState } from "react"
import {
  getAllOrders,
  updateOrderStatus,
} from "@/services/admin.orders.service"

type OrderItem = {
  id: string
  quantity: number
  price: number
  product: {
    name: string
    image_url?: string
  }
}

type Order = {
  id: string
  first_name: string
  last_name: string
  phone: string
  address: string
  fulfillment_method: string
  total_price: number
  status: string
  created_at: string
  order_items: OrderItem[]
}

const STATUS_OPTIONS = [
  {
    value: "pending",
    label: "قيد الانتظار",
    color: "secondary",
  },
  {
    value: "processing",
    label: "قيد التحضير",
    color: "warning",
  },
  {
    value: "shipped",
    label: "تم الشحن",
    color: "info",
  },
  {
    value: "delivered",
    label: "تم التسليم",
    color: "success",
  },
  {
    value: "cancelled",
    label: "ملغي",
    color: "danger",
  },
]

const getStatusData = (status: string) => {
  return (
    STATUS_OPTIONS.find((s) => s.value === status) ||
    STATUS_OPTIONS[0]
  )
}


const OrderItemsSection = ({
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
            className="d-flex align-items-center justify-content-between border rounded p-2"
          >
            <div className="d-flex align-items-center gap-3">
              <img
                src={
                  item.product.image_url ||
                  "https://via.placeholder.com/70"
                }
                alt={item.product.name}
                width={70}
                height={70}
                className="rounded object-fit-cover"
              />

              <div>
                <p className="mb-1 fw-bold">
                  {item.product.name}
                </p>

                <small className="text-muted">
                  الكمية: {item.quantity}
                </small>
              </div>
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

export const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    const data = await getAllOrders()
    setOrders(data)
  }

  const changeStatus = async (
    id: string,
    status: string
  ) => {
    await updateOrderStatus(id, status)

    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? { ...order, status }
          : order
      )
    )
  }
  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter(
        (order) => order.status === statusFilter
      )

  return (
    <div dir="rtl">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="fw-bold">الطلبات</h2>

        <span className="badge bg-dark fs-6">
          {filteredOrders.length} طلب
        </span>
        <div className="d-flex flex-wrap gap-2 mb-4">
          <button
            className={`btn ${statusFilter === "all"
              ? "btn-dark"
              : "btn-outline-dark"
              }`}
            onClick={() => setStatusFilter("all")}
          >
            الكل
          </button>

          {STATUS_OPTIONS.map((status) => (
            <button
              key={status.value}
              className={`btn ${statusFilter === status.value
                ? `btn-${status.color}`
                : `btn-outline-${status.color}`
                }`}
              onClick={() =>
                setStatusFilter(status.value)
              }
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      <div className="d-flex flex-column gap-4">
        {filteredOrders.map((order) => {
          const statusData = getStatusData(order.status)

          return (
            <div
              key={order.id}
              className="card border-0 shadow-sm rounded-4"
            >
              <div className="card-body p-4">
                {/* Header */}
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
                  <div>
                    <h5 className="fw-bold mb-1">
                      طلب #{order.id.slice(0, 8)}
                    </h5>

                    <small className="text-muted">
                      {new Date(
                        order.created_at
                      ).toLocaleString("ar-EG")}
                    </small>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <span
                      className={`badge bg-${statusData.color}`}
                    >
                      {statusData.label}
                    </span>

                    <select
                      value={order.status}
                      onChange={(e) =>
                        changeStatus(
                          order.id,
                          e.target.value
                        )
                      }
                      className="form-select"
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option
                          key={status.value}
                          value={status.value}
                        >
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="row g-3">
                  <InfoBox
                    label="الاسم الأول"
                    value={order.first_name}
                  />

                  <InfoBox
                    label="الاسم الأخير"
                    value={order.last_name}
                  />

                  <InfoBox
                    label="رقم الجوال"
                    value={order.phone}
                  />

                  <InfoBox
                    label="طريقة الاستلام"
                    value={order.fulfillment_method}
                  />

                  <InfoBox
                    label="العنوان"
                    value={order.address}
                  />

                  <InfoBox
                    label="المجموع"
                    value={`${order.total_price} ₪`}
                  />
                </div>

                {/* Toggle */}
                <button
                  className="btn btn-outline-dark mt-4"
                  onClick={() =>
                    setExpandedOrder(
                      expandedOrder === order.id
                        ? null
                        : order.id
                    )
                  }
                >
                  {expandedOrder === order.id
                    ? "إخفاء المنتجات"
                    : "عرض المنتجات"}
                </button>

                {/* Items */}
                {expandedOrder === order.id && (
                  <OrderItemsSection
                    items={order.order_items}
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const InfoBox = ({
  label,
  value,
}: {
  label: string
  value: string | number
}) => {
  return (
    <div className="col-md-4">
      <div className="bg-light rounded-3 p-3 h-100">
        <small className="text-muted d-block mb-1">
          {label}
        </small>

        <strong>{value || "-"}</strong>
      </div>
    </div>
  )
}