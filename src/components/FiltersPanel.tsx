import type { Product } from "@/types/database.types"

type Props = {
  filtersOpen: boolean
  setFiltersOpen: (v: boolean) => void
  selectedCategories: Product["category"][]
  categoryOptions: Product["category"][]
  sortOrder: "price-asc" | "price-desc"
  onToggleCategory: (c: Product["category"]) => void
  onSortChange: (v: "price-asc" | "price-desc") => void
  onReset: () => void
}

export const FiltersPanel = ({
  filtersOpen,
  setFiltersOpen,
  selectedCategories,
  categoryOptions,
  sortOrder,
  onToggleCategory,
  onSortChange,
  onReset,
}: Props) => {
  const activeCount =
    selectedCategories.length + (sortOrder === "price-desc" ? 1 : 0)

  return (
    <aside className={`glass-card filters-panel ${filtersOpen ? "is-open" : ""}`}>
      <button
        className="filters-toggle"
        onClick={() => setFiltersOpen(!filtersOpen)}
      >
        <span>الفلاتر {activeCount ? `(${activeCount})` : ""}</span>
        <strong>{filtersOpen ? "−" : "+"}</strong>
      </button>

      {filtersOpen && (
        <div className="filters-panel-body">
          <div className="row-between">
            <h2>تخصيص العرض</h2>
            <button className="link-button" onClick={onReset}>
              إعادة ضبط
            </button>
          </div>

          <div className="filter-group">
            <h3>الفئات</h3>
            {categoryOptions.map((c) => (
              <label key={c} className="checkbox-row">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(c)}
                  onChange={() => onToggleCategory(c)}
                />
                <span>{c}</span>
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h3>ترتيب السعر</h3>
            <div className="sort-arrow-group">
              <button
                className={`sort-arrow-button ${sortOrder === "price-asc" ? "active" : ""}`}
                onClick={() => onSortChange("price-asc")}
              >
                ↑
              </button>
              <button
                className={`sort-arrow-button ${sortOrder === "price-desc" ? "active" : ""}`}
                onClick={() => onSortChange("price-desc")}
              >
                ↓
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}