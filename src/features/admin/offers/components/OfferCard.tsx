export const OfferCard = ({
  offer,
  handleEdit,
  handleDelete,
}: any) => {
  return (
    <div className="card border-0 shadow-sm rounded-4">
      <div className="card-body">

        <h5 className="fw-bold">
          {offer.title}
        </h5>

        <p>
          خصم: {offer.discount_percentage}%
        </p>

        <p>
          {offer.start_date} → {offer.end_date}
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

        <div className="d-flex gap-2 mt-3">
          <button
            className="btn btn-warning"
            onClick={() => handleEdit(offer)}
          >
            تعديل
          </button>

          <button
            className="btn btn-danger"
            onClick={() => handleDelete(offer.id)}
          >
            حذف
          </button>
        </div>

      </div>
    </div>
  )
}