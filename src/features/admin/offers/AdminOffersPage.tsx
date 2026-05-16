import { useEffect, useState } from "react"

import {
  createOffer,
  deleteOffer,
  getAllOffers,
  getProducts,
  updateOffer,
} from "@/services/admin.offers.service"

import { OffersHeader } from "./components/OffersHeader"
import { OfferForm } from "./components/OfferForm"
import { OfferCard } from "./components/OfferCard"

export const AdminOffersPage = () => {
  const [offers, setOffers] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)

  const [form, setForm] = useState({
    title: "",
    discount_percentage: 0,
    is_global: true,
    start_date: "",
    end_date: "",
    product_ids: [] as string[],
  })

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    const [o, p] = await Promise.all([
      getAllOffers(),
      getProducts(),
    ])

    setOffers(o)
    setProducts(p)
  }

  const resetForm = () => {
    setForm({
      title: "",
      discount_percentage: 0,
      is_global: true,
      start_date: "",
      end_date: "",
      product_ids: [],
    })

    setEditingId(null)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (editingId) {
      await updateOffer(editingId, form)
    } else {
      await createOffer(form)
    }

    resetForm()
    load()
  }

  const handleEdit = (offer: any) => {
  console.log("EDIT:", offer)

  setEditingId(offer.id)

  setForm({
    title: offer.title ?? "",
    discount_percentage: offer.discount_percentage ?? 0,
    is_global: offer.is_global ?? true,
    start_date: offer.start_date?.split("T")[0] ?? "",
    end_date: offer.end_date?.split("T")[0] ?? "",

    product_ids:
      offer.product_offers
        ?.map((p: any) => p.product_id) 
        .filter(Boolean) || [],
  })
}

  const handleDelete = async (id: string) => {
    await deleteOffer(id)
    load()
  }

  return (
    <div dir="rtl">

      <OffersHeader count={offers.length} />

      <OfferForm
        form={form}
        setForm={setForm}
        editingId={editingId}
        handleSubmit={handleSubmit}
        resetForm={resetForm}
        products={products}
      />

      <div className="d-flex flex-column gap-4">
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>

    </div>
  )
}