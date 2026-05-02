

// import { Routes, Route,Navigate  } from "react-router-dom"

// import { AdminLayout } from "./features/admin/components/AdminLayout"
// import { DashboardPage } from "./features/admin/dashboard/DashboardPage"
// import { AdminProductsPage } from "./features/admin/products/AdminProductsPage"
// import { AdminOrdersPage } from "./features/admin/orders/AdminOrdersPage"

// function App() {
//   return (

//     <Routes>
//        <Route path="/" element={<Navigate to="/admin" />} />
//        <Route path="/admin" element={<AdminLayout />}>
//          <Route index element={<DashboardPage />} />
//          <Route path="products" element={<AdminProductsPage />} />
//          <Route path="orders" element={<AdminOrdersPage />} />
//        </Route>
//     </Routes>
//   )
// }

// export default App


import { Routes, Route } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import HomePage from "./pages/HomePage"
import ProductsPage from "./pages/ProductsPage"
import OffersPage from "./pages/OffersPage"
import CartPage from "./pages/CartPage"
import LoginPage from "./pages/LoginPage"
import "./App.css"

function App() {
  return (
   
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    
  )
} export default App