# Recommendation Backend

This backend provides a recommendation endpoint for the home hero card.

## What it does

- Reads product, interactions, and order signals from Supabase.
- Scores products with a weighted model:
  - User category affinity
  - Global popularity
  - Rating
  - Freshness
  - Novelty (prefers items user did not already interact with)
- Returns one best product for the home page card.

## Setup

1. Copy env:

```bash
cp .env.example .env
```

2. Fill values in `.env`:

- Prefer `DATABASE_URL` (recommended), or use:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
- `FRONTEND_ORIGIN` (default: `http://localhost:5173`)
- `PORT` (default: `4000`)

3. Install and run:

```bash
npm install
npm run dev
```

Server starts on `http://localhost:4000`.
`/health` will show mode: `postgres` when using `DATABASE_URL`, otherwise `supabase`.

## Endpoint

`GET /api/recommendations/hero?user_id=<optional-user-id>`

Response includes:

- `recommended_product_id`
- `product`
- `score`
- `reasons`
- `generated_at`

## Frontend wiring

Set in root `.env`:

```env
VITE_RECOMMENDATION_API_URL=http://localhost:4000
```

If backend is unavailable, frontend falls back to local recommendation.
