import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getCurrentUser } from "../services/auth.service"

export default function Navbar() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    async function fetchUser() {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    }

    fetchUser()
  }, [])
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark fixed-top site-navbar"
      dir="rtl"
    >
      <div className="container">

        {/* LOGO */}
        <Link className="navbar-brand" to="/">
          <img
            src="https://xnwjkhrtogrguplpabfl.supabase.co/storage/v1/object/public/general_images/logo2-removebg-preview%20(1).png"
            alt="Logo"
            width="120"
            height="55"
          />
        </Link>

        {/* TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">

          {/* Links */}
          <ul className="navbar-nav ms-auto text-end">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">الرئيسية</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/products">المنتجات</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/offers">العروض</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/wheel">عجلة الكوكيز</Link>
            </li>
            {user?.profile?.role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/admin">الإدارة</Link>
              </li>
            )}
          </ul>

          {/* Actions */}
          <div className="d-flex gap-2 ms-lg-3 site-navbar-actions">
            <Link to="/cart" className="btn btn-outline-light">
              <i className="bi bi-cart"></i>
            </Link>

            {!user && (
              <Link to="/login" className="btn btn-light">
                تسجيل الدخول
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  )
}
