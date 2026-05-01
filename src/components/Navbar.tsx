import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link className="navbar-brand fw-bold" to="/">
        🍪 WOW
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">الرئيسية</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/products">المنتجات</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/offers">العروض</Link>
          </li>
        </ul>

        <div className="d-flex gap-2">
          <Link to="/cart" className="btn btn-outline-dark">🛒</Link>
          <Link to="/login" className="btn btn-dark">تسجيل دخول</Link>
        </div>
      </div>
    </nav>
  )
}