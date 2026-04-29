function EmptyCollectionState({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}) {
  return (
    <div className="glass-card empty-collection-card">
      <p className="section-kicker">لا يوجد محتوى حالياً</p>
      <h3>{title}</h3>
      <p>{description}</p>

      {actionLabel && onAction ? (
        <button className="primary-pill small" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </div>
  )
}

export default EmptyCollectionState