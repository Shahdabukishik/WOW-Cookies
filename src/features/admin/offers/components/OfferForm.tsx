import { ProductSelector } from "./ProductSelector"

export const OfferForm = ({
  form,
  setForm,
  editingId,
  handleSubmit,
  resetForm,
  products,
}: any) => {
  return (
    <div className="card shadow-sm border-0 rounded-4 mb-5">
      <div className="card-body p-4">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">

            <div className="col-md-6">
              <label className="form-label">
                عنوان العرض
              </label>

              <input
                className="form-control"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                نسبة الخصم %
              </label>

              <input
                type="number"
                className="form-control"
                value={form.discount_percentage}
                onChange={(e) =>
                  setForm({
                    ...form,
                    discount_percentage:
                      Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="col-md-6">
              <label>تاريخ البداية</label>
              <input
                type="date"
                className="form-control"
                value={form.start_date}
                onChange={(e) =>
                  setForm({
                    ...form,
                    start_date: e.target.value,
                  })
                }
              />
            </div>

            <div className="col-md-6">
              <label>تاريخ النهاية</label>
              <input
                type="date"
                className="form-control"
                value={form.end_date}
                onChange={(e) =>
                  setForm({
                    ...form,
                    end_date: e.target.value,
                  })
                }
              />
            </div>

            {/* TYPE */}
            <div className="col-12">
              <div className="d-flex gap-4">
                <label>
                  <input
                    type="radio"
                    checked={form.is_global}
                    onChange={() =>
                      setForm({
                        ...form,
                        is_global: true,
                        product_ids: [],
                      })
                    }
                  />
                  كل المنتجات
                </label>

                <label>
                  <input
                    type="radio"
                    checked={!form.is_global}
                    onChange={() =>
                      setForm({
                        ...form,
                        is_global: false,
                      })
                    }
                  />
                  منتجات محددة
                </label>
              </div>
            </div>

            {!form.is_global && (
              <ProductSelector
                products={products}
                product_ids={form.product_ids}
                setForm={setForm}
                form={form}
              />
            )}

            <div className="col-12 d-flex gap-2">
              <button className="btn btn-dark">
                {editingId
                  ? "تحديث"
                  : "إضافة"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={resetForm}
                >
                  إلغاء
                </button>
              )}
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}