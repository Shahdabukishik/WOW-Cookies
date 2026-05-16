export const OrderFilters = ({
  statusFilter,
  setStatusFilter,
  STATUS_OPTIONS,
}: any) => {
  return (
    <div className="d-flex flex-wrap gap-2 mb-4">
      <button
        className={`btn ${
          statusFilter === "all"
            ? "btn-dark"
            : "btn-outline-dark"
        }`}
        onClick={() => setStatusFilter("all")}
      >
        الكل
      </button>

      {STATUS_OPTIONS.map((s: any) => (
        <button
          key={s.value}
          className={`btn ${
            statusFilter === s.value
              ? `btn-${s.color}`
              : `btn-outline-${s.color}`
          }`}
          onClick={() => setStatusFilter(s.value)}
        >
          {s.label}
        </button>
      ))}
    </div>
  )
}