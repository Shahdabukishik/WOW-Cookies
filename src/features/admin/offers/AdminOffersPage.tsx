import { useEffect, useState } from "react"

import {
  createOffer,
  deleteOffer,
  getAllOffers,
  getProducts,
  updateOffer,
} from "@/services/admin.offers.service"

type Product = {
  id: string
  name: string
}

type Offer = {
  id: string
  title: string
  discount_percentage: number
  is_global: boolean
  start_date: string
  end_date: string
  product_offers: {
    product: Product
  }[]
}

const initialForm = {
  title: "",
  discount_percentage: 0,
  is_global: true,
  start_date: "",
  end_date: "",
  product_ids: [] as string[],
}

export const AdminOffersPage = () => {
  const [offers, setOffers] = useState<Offer[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [editingId, setEditingId] =
    useState<string | null>(null)

  const [form, setForm] =
    useState(initialForm)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const [offersData, productsData] =
      await Promise.all([
        getAllOffers(),
        getProducts(),
      ])

    setOffers(offersData)
    setProducts(productsData)
  }

  const resetForm = () => {
    setForm(initialForm)
    setEditingId(null)
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    try {
      if (editingId) {
        await updateOffer(editingId, form)
      } else {
        await createOffer(form)
      }

      resetForm()
      loadData()
    } catch (error) {
      console.error(error)
    }
  }

  const handleEdit = (offer: Offer) => {
    setEditingId(offer.id)

    setForm({
      title: offer.title,
      discount_percentage:
        offer.discount_percentage,
      is_global: offer.is_global,
      start_date:
        offer.start_date?.split("T")[0],
      end_date:
        offer.end_date?.split("T")[0],
      product_ids:
        offer.product_offers?.map(
          (p) => p.product.id
        ) || [],
    })
  }

  const handleDelete = async (
    id: string
  ) => {
    const confirmDelete = confirm(
      "حذف العرض؟"
    )

    if (!confirmDelete) return

    await deleteOffer(id)
    loadData()
  }

  return (
    <div dir="rtl">
      <h2 className="fw-bold mb-4">
        إدارة العروض
      </h2>

      {/* FORM */}

      <div className="card shadow-sm border-0 rounded-4 mb-5">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">
                  عنوان العرض
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  نسبة الخصم %
                </label>

                <input
                  type="number"
                  className="form-control"
                  value={
                    form.discount_percentage
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      discount_percentage:
                        Number(e.target.value),
                    })
                  }
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  تاريخ البداية
                </label>

                <input
                  type="date"
                  className="form-control"
                  value={form.start_date}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      start_date:
                        e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  تاريخ النهاية
                </label>

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
                  required
                />
              </div>

              <div className="col-12">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={form.is_global}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        is_global:
                          e.target.checked,
                      })
                    }
                  />

                  <label className="form-check-label">
                    تطبيق على كل المنتجات
                  </label>
                </div>
              </div>

              {!form.is_global && (
                <div className="col-12">
                  <label className="form-label">
                    المنتجات
                  </label>

                  <select
                    multiple
                    className="form-select"
                    value={form.product_ids}
                    onChange={(e) => {
                      const values =
                        Array.from(
                          e.target.selectedOptions
                        ).map(
                          (option) =>
                            option.value
                        )

                      setForm({
                        ...form,
                        product_ids: values,
                      })
                    }}
                  >
                    {products.map((product) => (
                      <option
                        key={product.id}
                        value={product.id}
                      >
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="col-12 d-flex gap-2">
                <button className="btn btn-dark">
                  {editingId
                    ? "تحديث العرض"
                    : "إضافة عرض"}
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

      {/* OFFERS */}

      <div className="d-flex flex-column gap-4">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="card border-0 shadow-sm rounded-4"
          >
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
                <div>
                  <h5 className="fw-bold">
                    {offer.title}
                  </h5>

                  <p className="mb-1">
                    الخصم:
                    {" "}
                    {
                      offer.discount_percentage
                    }
                    %
                  </p>

                  <p className="mb-1">
                    البداية:
                    {" "}
                    {offer.start_date}
                  </p>

                  <p className="mb-1">
                    النهاية:
                    {" "}
                    {offer.end_date}
                  </p>

                  <span
                    className={`badge ${
                      offer.is_global
                        ? "bg-success"
                        : "bg-primary"
                    }`}
                  >
                    {offer.is_global
                      ? "كل المنتجات"
                      : "منتجات محددة"}
                  </span>

                  {!offer.is_global && (
                    <div className="mt-3 d-flex flex-wrap gap-2">
                      {offer.product_offers?.map(
                        (p) => (
                          <span
                            key={
                              p.product.id
                            }
                            className="badge bg-light text-dark border"
                          >
                            {
                              p.product.name
                            }
                          </span>
                        )
                      )}
                    </div>
                  )}
                </div>

                <div className="d-flex gap-2">
                  <button
                    className="btn btn-warning"
                    onClick={() =>
                      handleEdit(offer)
                    }
                  >
                    تعديل
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      handleDelete(
                        offer.id
                      )
                    }
                  >
                    حذف
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}