import { useEffect, useState } from "react"

import { getAllOrders, updateOrderStatus } from "@/services/admin.orders.service"

export const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    getAllOrders().then(setOrders)
  }, [])

  const changeStatus = async (id: string, status: string) => {
    await updateOrderStatus(id, status)
    location.reload()
  }

  return (
    <>
      <h2 className="mb-3">Orders</h2>

      {orders.map((o) => (
        <div key={o.id} className="card mb-3 shadow-sm">
          <div className="card-body">
            <p><strong>Address:</strong> {o.address}</p>
            <p><strong>Status:</strong> {o.status}</p>

            <button
              className="btn btn-sm btn-success me-2"
              onClick={() => changeStatus(o.id, "shipped")}
            >
              Ship
            </button>

            <button
              className="btn btn-sm btn-warning"
              onClick={() => changeStatus(o.id, "delivered")}
            >
              Deliver
            </button>
          </div>
        </div>
      ))}
    </>
  )
}