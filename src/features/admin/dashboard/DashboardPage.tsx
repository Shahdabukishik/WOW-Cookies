
import { useAdmin } from "../../../hooks/useAdmin"

export const DashboardPage = () => {
  const isAdmin = useAdmin()

  if (!isAdmin) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-danger">Access Denied</div>
      </div>
    )
  }

  return (
    <>
      <h2 className="mb-4">لوحة التحكم</h2>

      <div className="row g-4">
        
        {/* Card 1 */}
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">المنتجات</h6>
              <h3>إدارة</h3>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">الطلبات</h6>
              <h3>تتبع</h3>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">العروض</h6>
              <h3>تحكم</h3>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">التحليلات</h6>
              <h3>رؤى</h3>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}