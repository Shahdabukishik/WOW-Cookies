from sqlalchemy.orm import Session
from sqlalchemy import func, case, desc
from models import Product, UserInteraction, OrderItem, Order

def get_recommendations_for_user(db: Session, user_id, limit=5):

    # -----------------------------
    # 1) Get category scores
    # -----------------------------

    interaction_scores = (
        db.query(
            Product.category,
            func.sum(
                case(
                    (UserInteraction.type == "click", 3),
                    (UserInteraction.type == "view", 1),
                    else_=0
                )
            ).label("score")
        )
        .join(Product, Product.id == UserInteraction.product_id)
        .filter(UserInteraction.user_id == user_id)
        .group_by(Product.category)
    )

    purchase_scores = (
        db.query(
            Product.category,
            func.sum(5).label("score")
        )
        .join(OrderItem, OrderItem.product_id == Product.id)
        .join(Order, Order.id == OrderItem.order_id)
        .filter(Order.user_id == user_id)
        .group_by(Product.category)
    )

    # Merge both queries
    combined_scores = {}

    for row in interaction_scores:
        combined_scores[row.category] = combined_scores.get(row.category, 0) + row.score

    for row in purchase_scores:
        combined_scores[row.category] = combined_scores.get(row.category, 0) + row.score

    if not combined_scores:
        # fallback
        return (
            db.query(Product)
            .filter(Product.is_active == True)
            .limit(limit)
            .all()
        )

    # -----------------------------
    # 2) Get top categories
    # -----------------------------
    sorted_categories = sorted(
        combined_scores.items(),
        key=lambda x: x[1],
        reverse=True
    )

    top_categories = [c[0] for c in sorted_categories[:2]]

    # -----------------------------
    # 3) Exclude already used products
    # -----------------------------
    used_products = (
        db.query(UserInteraction.product_id)
        .filter(UserInteraction.user_id == user_id)
        .distinct()
        .all()
    )

    used_products = [p[0] for p in used_products]

    # -----------------------------
    # 4) Recommend
    # -----------------------------
    recommendations = (
        db.query(Product)
        .filter(Product.category.in_(top_categories))
        .filter(Product.is_active == True)
        .filter(~Product.id.in_(used_products))
        .limit(limit)
        .all()
    )

    return recommendations