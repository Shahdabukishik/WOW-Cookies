import {type Product } from "@/types/database.types"

export const ProductSelector = ({
  products,
  product_ids,
  setForm,
  form,
}: any) => {
  return (
    <div className="col-12">
      <label className="form-label">
        المنتجات
      </label>

      <select
        multiple
        className="form-select"
        value={product_ids}
        onChange={(e) => {
          const values = Array.from(
            e.target.selectedOptions
          ).map((o) => o.value)

          setForm({
            ...form,
            product_ids: values,
          })
        }}
      >
        {products.map((p: Product) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
    </div>
  )
}