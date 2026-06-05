import { Link, Outlet } from "react-router-dom"

export const AdminLayout = () => {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" , backgroundColor: "#3AA4AD" }}>
      
      {/* Sidebar */}
      <div className=" text-white p-3" style={{ width: "250px" }}>
        <h4>الإدارة</h4>

        <ul className="nav flex-column">
          <li><Link className="nav-link text-white" to="/admin">لوحة التحكم</Link></li>
          <li><Link className="nav-link text-white" to="/admin/products">المنتجات</Link></li>
          <li><Link className="nav-link text-white" to="/admin/orders">الطلبات</Link></li>
          <li><Link className="nav-link text-white" to="/admin/offers">العروض</Link></li>
          <li><Link className="nav-link text-white" to="/admin/analytics">التحليلات</Link></li>
        </ul>
      </div>

      
      <div className="flex-grow-1 p-4 bg-light">
        <Outlet />
      </div>

    </div>
  )
}
