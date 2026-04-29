import { Routes, Route,Navigate  } from "react-router-dom"

import { AdminLayout } from "./features/admin/components/AdminLayout"
import { DashboardPage } from "./features/admin/dashboard/DashboardPage"
import { AdminProductsPage } from "./features/admin/products/AdminProductsPage"
import { AdminOrdersPage } from "./features/admin/orders/AdminOrdersPage"

function App() {
  return (

    <Routes>
       <Route path="/" element={<Navigate to="/admin" />} />
       <Route path="/admin" element={<AdminLayout />}>
         <Route index element={<DashboardPage />} />
         <Route path="products" element={<AdminProductsPage />} />
         <Route path="orders" element={<AdminOrdersPage />} />
       </Route>
    </Routes>
  )
}

export default App