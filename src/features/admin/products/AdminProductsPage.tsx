import { useState } from "react"
import { useProducts } from "@/hooks/useProducts"
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/services/admin.products.service"

import {
  uploadProductImage,
  deleteProductImage,
} from "@/services/storage.service"

import { ProductModal } from "./components/ProductModal"
import { ProductsTable } from "./components/ProductsTable"
import { toPayload, toFormValues } from "./utils/product.mapper"
import type { Product } from "@/types/database.types"

export const AdminProductsPage = () => {
  const { products, loading, refreshProducts } = useProducts({ includeInactive: true })

  const [mode, setMode] = useState<"create" | "edit" | null>(null)
  const [editing, setEditing] = useState<Product | null>(null)

  const [form, setForm] = useState<any>({
    name: "",
    price: "",
    description: "",
    image_url: "",
    Ingredients: "",
    category: "cookie",
    is_active: true,
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [error, setError] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const openCreate = () => {
    setMode("create")
    setForm({
      name: "",
      price: "",
      description: "",
      image_url: "",
      Ingredients: "",
      category: "cookie",
      is_active: true,
    })
  }

  const openEdit = (p: Product) => {
    setMode("edit")
    setEditing(p)
    setForm(toFormValues(p))
  }

  const handleImageSelect = (file: File) => {
    setImageFile(file)
    const preview = URL.createObjectURL(file)
    setForm((prev: any) => ({ ...prev, image_url: preview }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsSaving(true)

    let imageUrl = form.image_url

    if (imageFile) {
      const { url, error } = await uploadProductImage(imageFile)

      if (error) {
        setError(error.message)
        setIsSaving(false)
        return
      }

      imageUrl = url!

      if (mode === "edit" && editing?.image_url) {
        const oldPath = editing.image_url.split("/products/")[1]
        await deleteProductImage(oldPath)
      }
    }

    const payload = toPayload({ ...form, image_url: imageUrl })

    if (mode === "create") {
      await createProduct(payload)
    } else if (editing) {
      await updateProduct(editing.id, payload)
    }

    await refreshProducts()
    setMode(null)
    setImageFile(null)
    setIsSaving(false)
  }

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <h2>المنتجات</h2>
        <button className="btn btn-primary" onClick={openCreate}>
           اضافة منتج + 
        </button>
      </div>

      <ProductsTable
        products={products}
        loading={loading}
        onEdit={openEdit}
        onDelete={deleteProduct}
      />

      {mode && (
        <ProductModal
          mode={mode}
          form={form}
          isSaving={isSaving}
          error={error}
          onChange={(e: any) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
          onImageSelect={handleImageSelect}
          onClose={() => setMode(null)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  )
}