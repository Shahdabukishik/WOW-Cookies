import type { Product } from "../../../../types/database.types"

type Props = {
  products: Product[]
  loading: boolean
  onEdit: (p: Product) => void
  onDelete: (id: string) => void
}

const categoryLabels: Record<Product["category"], string> = {
  cookie: "كوكيز",
  drink: "مشروب",
  box: "بوكس",
};

export const ProductsTable = ({ products, loading, onEdit, onDelete }: Props) => {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>اسم المنتج</th>
              <th>السعر</th>
              <th>الفئة</th>
              <th>الحالة</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  تحميل...
                </td>
              </tr>
            )}

            {!loading &&
              products.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td> ₪ {p.price}</td>
                  <td>{categoryLabels[p.category]}</td>
                  <td>
                    <span
                      className={`badge ${
                        p.is_active ? "text-bg-success" : "text-bg-secondary"
                      }`}
                    >
                      {p.is_active ? "نشطة" : "غير نشطة"}
                    </span>
                  </td>
                  <td className="text-end">
                    <div className="btn-group btn-group-sm flex flex-row-reverse">
                      <button className="btn btn-outline-danger" onClick={() => onDelete(p.id)}>
                        حذف
                      </button>
                      <button className="btn btn-outline-primary" onClick={() => onEdit(p)}>
                        تعديل
                      </button>
                     
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}