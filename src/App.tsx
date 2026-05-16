
import { Routes, Route } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import HomePage from "./pages/HomePage"
import ProductsPage from "./pages/ProductsPage"
import OffersPage from "./pages/OffersPage"
import CartPage from "./pages/CartPage"
import LoginPage from "./pages/Login"
import ProductDetailsPage from "./pages/ProductDetailsPage"
import MoodCookiesPage from "./pages/MoodCookiesPage"
import CookieWheelPage from "./pages/CookieWheelPage"
import AdminRoute from "./components/AdminRoute"
import "./App.css"
import { AdminLayout } from "./features/admin/components/AdminLayout"
import { AdminProductsPage } from "./features/admin/products/AdminProductsPage"
import { AdminOrdersPage } from "./features/admin/orders/AdminOrdersPage"
import { DashboardPage } from "./features/admin/dashboard/DashboardPage"
import { AdminOffersPage } from "./features/admin/offers/AdminOffersPage"

function App() {

  return (

    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/wheel" element={<CookieWheelPage />} />
        <Route path="/mood/:mood" element={<MoodCookiesPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route index element={<DashboardPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="offers" element={<AdminOffersPage />} />
        </Route>
      </Route>
    </Routes>

  )
} export default App
