
import { useRef } from "react"
import type { ProductFormValues } from "../utils/product.mapper"

type Props = {
    mode: "create" | "edit"
    form: ProductFormValues
    isSaving: boolean
    error: string
    onChange: any
    onImageSelect: (file: File) => void
    onClose: () => void
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export const ProductModal = ({
    mode,
    form,
    isSaving,
    error,
    onChange,
    onImageSelect,
    onClose,
    onSubmit,
}: Props) => {
    const fileRef = useRef<HTMLInputElement>(null)

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        if (file) onImageSelect(file)
    }

    return (
        <>
            <div className="modal fade show d-block">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        <form onSubmit={onSubmit}>
                            <div className="modal-header flex flex-row-reverse ">
                                <h5>{mode === "edit" ? "تعديل" : "إضافة"} المنتج</h5>
                                <button className="btn-close " onClick={onClose} />
                            </div>

                            <div className="modal-body">

                                {error && <div className="alert alert-danger">{error}</div>}

                                {/* Upload */}
                                <div
                                    className="border rounded p-4 text-center mb-3"
                                    onClick={() => fileRef.current?.click()}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={handleDrop}
                                    style={{ cursor: "pointer" }}
                                >
                                    <p>اسحب وأفلت الصورة أو انقر للاختيار</p>

                                    <input
                                        type="file"
                                        hidden
                                        ref={fileRef}
                                        accept="image/*"
                                        onChange={(e) =>
                                            e.target.files?.[0] && onImageSelect(e.target.files[0])
                                        }
                                    />

                                    {form.image_url && (
                                        <img src={form.image_url} style={{ width: 120 }} />
                                    )}
                                </div>


                                <label className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" checked={form.is_active} onChange={(e) => onChange({ target: { name: "is_active", value: e.target.checked } })} />
                                   <label className="form-check-label" htmlFor="checkNativeSwitch">الحالة</label>
                                </label>
                                <label className="form-label">اسم المنتج</label>
                                <input className="form-control mb-2" name="name" value={form.name} onChange={onChange} />
                                <label className="form-label">السعر</label>
                                <input className="form-control mb-2" name="price" value={form.price} onChange={onChange} />
                                <label className="form-label">الوصف</label>
                                <textarea className="form-control mb-2" name="description" value={form.description} onChange={onChange} />
                                <label className="form-label">المكونات</label>
                                <textarea className="form-control mb-2" name="Ingredients" value={form.Ingredients} onChange={onChange} />

                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={onClose}>إلغاء</button>
                                <button className="btn btn-primary" disabled={isSaving}>
                                    {isSaving ? "جاري الحفظ..." : "حفظ"}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

            <div className="modal-backdrop fade show" />
        </>
    )
}