import type { Product } from "@/types/database.types"

type Props = {
  selectedCategories: Product["category"][]
  sortOrder: "price-asc" | "price-desc"
  onToggleCategory: (c: Product["category"]) => void
  onSortChange: (c: "price-asc" | "price-desc" ) => void
}

export const Filters = ({
  selectedCategories,
  sortOrder,
  onToggleCategory,
  onSortChange,
}: Props) => {
  const isActive = (c: Product["category"]) =>
    selectedCategories.includes(c)

  return (
    <div className="d-flex flex-column align-items-center gap-3 my-4">

      {/* Categories */}
      <div style={{ display: "flex", gap: "10px" }} role="group">
        <button
          type="button" className="" style={{ backgroundColor: isActive("cookie") ? "#3AA4AD" : "transparent", color: isActive("cookie") ? "#fff" : "#3AA4AD", border: "1px solid #3AA4AD", borderRadius: "4px", padding: "8px 16px" }}
          onClick={() => onToggleCategory("cookie")}
        >
          كوكيز
        </button>

        <button
          type="button"
          
           style={{ backgroundColor: isActive("box") ? "#3AA4AD" : "transparent", color: isActive("box") ? "#fff" : "#3AA4AD", border: "1px solid #3AA4AD", borderRadius: "4px", padding: "8px 16px" }}
          onClick={() => onToggleCategory("box")}
        >
          بوكس
        </button>
      </div>

      {/* Sort */}
      <div className="btn-group" role="group" aria-label="Sort options">
        <button
          type="button"
          
           style={{ backgroundColor: sortOrder === "price-asc" ? "#3AA4AD" : "transparent", color: sortOrder === "price-asc" ? "#fff" : "#3AA4AD", border: "1px solid #3AA4AD", borderRadius: "4px", padding: "8px 16px" }}
          onClick={() => onSortChange("price-asc")}
        >
          ↑
        </button>

        <button
          type="button"
          
           style={{ backgroundColor: sortOrder === "price-desc" ? "#3AA4AD" : "transparent", color: sortOrder === "price-desc" ? "#fff" : "#3AA4AD", border: "1px solid #3AA4AD", borderRadius: "4px", padding: "8px 16px" }}
          onClick={() => onSortChange("price-desc")}
        >
          ↓
        </button>
      </div>
    </div>
  )
}