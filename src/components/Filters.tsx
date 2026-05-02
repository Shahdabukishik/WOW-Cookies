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
    <div className="filter-controls">

      {/* Categories */}
      <div className="filter-group" role="group">
        <button
          type="button"
          className={`filter-button ${isActive("cookie") ? "active" : ""}`}
          onClick={() => onToggleCategory("cookie")}
        >
          كوكيز
        </button>

        <button
          type="button"
          
          className={`filter-button ${isActive("box") ? "active" : ""}`}
          onClick={() => onToggleCategory("box")}
        >
          بوكس
        </button>
      </div>

      {/* Sort */}
      <div className="filter-group" role="group" aria-label="Sort options">
        <button
          type="button"
          
          className={`filter-button ${sortOrder === "price-asc" ? "active" : ""}`}
          onClick={() => onSortChange("price-asc")}
        >
          ↑
        </button>

        <button
          type="button"
          
          className={`filter-button ${sortOrder === "price-desc" ? "active" : ""}`}
          onClick={() => onSortChange("price-desc")}
        >
          ↓
        </button>
      </div>
    </div>
  )
}
