import { useEffect, useState } from "react"
import { getAllOrders, updateOrderStatus } from "@/services/admin.orders.service"

import { OrderCard } from "./components/OrderCard"
import { OrderFilters } from "./components/OrderFilters"

export const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([])
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState("all")

  const STATUS_OPTIONS = [
    { value: "pending", label: "قيد الانتظار", color: "secondary" },
    { value: "preparing", label: "قيد التحضير", color: "warning" },
    { value: "shipped", label: "تم الشحن", color: "info" },
    { value: "delivered", label: "تم التسليم", color: "success" },
    { value: "cancelled", label: "ملغي", color: "danger" },
  ]

  const getStatusData = (status: string) =>
    STATUS_OPTIONS.find((s) => s.value === status) ||
    STATUS_OPTIONS[0]

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    const data = await getAllOrders()
    setOrders(data)
  }

  const changeStatus = async (id: string, status: string) => {
    await updateOrderStatus(id, status)

    setOrders((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, status } : o
      )
    )
  }

  const filtered =
    statusFilter === "all"
      ? orders
      : orders.filter((o) => o.status === statusFilter)

  return (
    <div dir="rtl">

      <div className="d-flex justify-content-between mb-3">
        <h2>الطلبات</h2>
        <span className="badge bg-dark">
          {filtered.length}
        </span>
      </div>

      <OrderFilters
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        STATUS_OPTIONS={STATUS_OPTIONS}
      />

      <div className="d-flex flex-column gap-4">
        {filtered.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            expanded={expandedOrder === order.id}
            setExpanded={setExpandedOrder}
            changeStatus={changeStatus}
            getStatusData={getStatusData}
            STATUS_OPTIONS={STATUS_OPTIONS}
          />
        ))}
      </div>

    </div>
  )
}