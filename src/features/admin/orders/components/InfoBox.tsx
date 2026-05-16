export const InfoBox = ({
  label,
  value,
}: {
  label: string
  value: string | number
}) => {
  return (
    <div className="col-md-4">
      <div className="bg-light rounded-3 p-3 h-100">
        <small className="text-muted d-block mb-1">
          {label}
        </small>
        <strong>{value || "-"}</strong>
      </div>
    </div>
  )
}