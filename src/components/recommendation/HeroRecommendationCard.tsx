import type { RecommendationProduct } from "@/types/database.types"
import { recommendationTypeLabels } from "@/utils/recommendation-explainer"

type Props = {
  recommendation: RecommendationProduct
  onClick: (product: RecommendationProduct) => void
}

export const HeroRecommendationCard = ({ recommendation, onClick }: Props) => {
  const confidence = Math.max(0, Math.min(100, recommendation.confidence_score))

  return (
    <div className="offer-card recommendation-card h-100">
      <div className="offer-badge">موصى به لك</div>
      <h5 className="fw-bold mb-2">{recommendation.name}</h5>
      <p className="recommendation-reason">{recommendation.recommendation_reason}</p>
      <div className="recommendation-meta" aria-label="Recommendation details">
        <span>{recommendationTypeLabels[recommendation.recommendation_type]}</span>
        <span>{confidence}% الثقة</span>
      </div>
      <button className="offer-btn" onClick={() => onClick(recommendation)}>
        جرّب الآن
      </button>
    </div>
  )
}
