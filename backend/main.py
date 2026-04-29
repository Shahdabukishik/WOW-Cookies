from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from uuid import UUID

from database import get_db
from models import Product
from recommendation import get_recommendations_for_user

app = FastAPI()

@app.get("/test")
def test(db: Session = Depends(get_db)):
    products = db.query(Product).limit(3).all()
    return [
        {
            "id": str(p.id),
            "name": p.name,
            "category": p.category,
            "price": float(p.price) if p.price is not None else None
        }
        for p in products
    ]

@app.get("/recommend/{user_id}")
def recommend(user_id: UUID, db: Session = Depends(get_db)):
    products = get_recommendations_for_user(db, user_id)

    return [
        {
            "id": str(p.id),
            "name": p.name,
            "category": p.category,
            "price": float(p.price) if p.price is not None else None
        }
        for p in products
    ]