export const OffersHeader = ({
  count,
}: {
  count: number
}) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2 className="fw-bold">إدارة العروض</h2>

      <span className="badge bg-dark">
        {count}
      </span>
    </div>
  )
}