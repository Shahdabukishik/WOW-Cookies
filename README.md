# WOW Cookies 🍪

A full-stack e-commerce platform built for a cookie business, featuring personalized product recommendations, recommendation analytics, customer management, and admin operations.

The project goes beyond a traditional online store by measuring whether recommendations actually influence customer behavior and purchasing decisions.

---

## 🚀 Live Demo [https://wow-cookies.vercel.app/]


---

## 📸 Preview

### Home Page

![Home](https://github.com/Shahdabukishik/WOW-Cookies/blob/f02245731999ae335d6ec0f1866fa9735cf1de43/src/assets/home.png)

### Recommendation Section

![Recommendations](https://github.com/Shahdabukishik/WOW-Cookies/blob/ea7031cc3c97ecd74ab1ad788023ef61f8609aa3/src/assets/recommendations.png)

### Admin Dashboard

#### Analytics Dashboard

![Analytics](https://github.com/Shahdabukishik/WOW-Cookies/blob/ea7031cc3c97ecd74ab1ad788023ef61f8609aa3/src/assets/analytics.png)

#### Product Management
![productManagement](https://github.com/Shahdabukishik/WOW-Cookies/blob/ea7031cc3c97ecd74ab1ad788023ef61f8609aa3/src/assets/productManagement.png)

#### Order Management
![orderManagement](https://github.com/Shahdabukishik/WOW-Cookies/blob/ea7031cc3c97ecd74ab1ad788023ef61f8609aa3/src/assets/orderManagement.png)

#### Offers Management
![offersMangement](https://github.com/Shahdabukishik/WOW-Cookies/blob/ea7031cc3c97ecd74ab1ad788023ef61f8609aa3/src/assets/offersManagement.png)


---

## 🎯 Key Features

### Customer Experience

* User authentication with Email OTP and Google OAuth
* Product catalog and detailed product pages
* Shopping cart and checkout flow
* Product ratings and reviews
* Offers and discounts
* Mood-based browsing experience
* Responsive Arabic-first UI

### Personalized Recommendation Engine

* Behavioral recommendation system
* Category affinity scoring
* Session-aware recommendations
* Cold-start handling for new users
* Popularity, freshness, rating, novelty, and diversity signals
* Explainable recommendation reasons
* Recommendation confidence scoring

### Recommendation Analytics

Track recommendation performance through:

* Recommendation impressions
* Recommendation clicks
* Recommendation purchases
* Click Through Rate (CTR)
* Conversion Rate
* Purchase Rate

This allows recommendations to be evaluated using measurable business metrics rather than assumptions.

### Admin Dashboard

* Product management
* Order management
* Offer management
* Customer analytics
* Revenue analytics
* Recommendation performance analytics

---

## 🧠 Recommendation System

The recommendation engine uses a weighted scoring model that combines multiple signals:

| Signal            | Purpose                               |
| ----------------- | ------------------------------------- |
| User Behavior     | Learn customer interests              |
| Category Affinity | Identify preferred product categories |
| Popularity        | Recommend trending products           |
| Rating            | Promote highly rated products         |
| Freshness         | Surface newer products                |
| Novelty           | Reduce repetition                     |
| Diversity         | Increase recommendation variety       |
| Session Activity  | Adapt to current browsing behavior    |

Unlike black-box systems, recommendations are explainable and transparent.

Each recommendation includes:

* Recommendation type
* Recommendation reason
* Confidence score

---

## 📊 Analytics Dashboard

The analytics system measures business impact through:

### Business Metrics

* Revenue
* Orders
* Average Order Value
* Active Customers
* Returning Customers

### Product Metrics

* Most Viewed Products
* Most Added-To-Cart Products
* Most Purchased Products
* Highest Rated Products

### Recommendation Metrics

* Recommendation Impressions
* Recommendation Clicks
* Recommendation Purchases
* CTR
* Conversion Rate
* Purchase Rate

---

## 🏗️ Architecture

```mermaid
flowchart LR

User[Customer/Admin]
Frontend[React + TypeScript]
Backend[Express API]
Supabase[(Supabase PostgreSQL)]

User --> Frontend
Frontend --> Backend
Frontend --> Supabase
Backend --> Supabase
```

---

## 🛠️ Tech Stack

### Frontend

* React 19
* TypeScript
* Vite
* React Router
* Zustand
* Bootstrap

### Backend

* Node.js
* Express

### Database & Services

* Supabase PostgreSQL
* Supabase Auth
* Supabase Storage

### Analytics & Visualization

* Recharts

---

## ⚙️ Installation

### Clone Repository

```bash
git clone <repository-url>
cd WOW-blog
```

### Install Dependencies

```bash
npm install
```

### Frontend Environment

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_RECOMMENDATION_API_URL=http://localhost:4000
```

### Run Frontend

```bash
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

---

## 📂 Project Structure

```text
src/
├── components/
├── features/
├── hooks/
├── pages/
├── services/
├── stores/
├── utils/

backend/
├── recommendation.js
├── recommendation-explainer.js
├── diversity.js
└── server.js
```

---

## 💡 Engineering Highlights

### Explainable Recommendations

Recommendations are not only generated but also explained to users through recommendation reasons and confidence scores.

### Data-Driven Personalization

Every recommendation can be measured using clicks, purchases, CTR, and conversion metrics.

### Separation of Concerns

Recommendation logic is isolated inside a dedicated backend service, allowing independent development and future scalability.

---

## 🔮 Future Improvements

* Collaborative Filtering
* A/B Testing for recommendation strategies
* Customer segmentation
* Inventory-aware recommendations
* Online payment integration
* Automated testing
* CI/CD pipeline

Arabic-first e-commerce platform for personalized cookie ordering, promotions, and store operations.

WOW Cookies is a full-stack web application built for a modern local bakery experience. It combines a customer-facing storefront, cart and checkout workflow, product offers, ratings, admin management, and a recommendation backend that personalizes homepage product suggestions based on user behavior and product signals.

---

# Overview

WOW Cookies helps customers browse cookies, boxes, drinks, and active offers through a responsive Arabic RTL interface. The platform supports authentication, cart management, checkout, product ratings, personalized recommendations, and admin tools for managing products, offers, and orders.

The project was developed as part of the **Innovate IT Hackathon 2026** at :contentReference[oaicite:0]{index=0}, where software engineering, AI, business, and marketing students collaborated to build real-world digital products.

---

# Problem Statement

Small food businesses often rely on social media messages or manual order handling, making it difficult to:

- Present products professionally
- Manage offers and discounts dynamically
- Track customer demand and order status
- Personalize product discovery
- Build a scalable online ordering experience

---

# Solution

WOW Cookies provides a dedicated digital storefront for cookie ordering with a complete operational layer for admins.

Customers can:

- Explore products
- Receive mood-based suggestions
- Spin a cookie wheel
- Add items to cart
- Apply active offers
- Place pickup or delivery orders

Admins can:

- Manage products
- Upload images
- Create offers
- Track orders
- Update fulfillment status from a protected dashboard

---

# Key Features

- 🍪 Arabic RTL storefront for WOW Cookies
- Product catalog with cookies, boxes, and drinks
- Product filtering and price sorting
- Product details pages with image, description, ingredients, price, and rating
- Cart management using Zustand state
- Checkout flow with delivery and pickup options
- Supabase authentication via email OTP and Google OAuth
- Role-based admin route protection
- Admin dashboard for product, order, and offer management
- Product image upload using Supabase Storage
- Active global and product-specific discounts
- Product ratings
- User interaction tracking for views, clicks, and add-to-cart events
- Personalized hero recommendation service
- Mood-based cookie recommendations
- Interactive cookie wheel experience
- Responsive design for desktop and mobile
- Vercel SPA routing support

---

# Tech Stack

## Frontend

- React 19
- TypeScript
- Vite
- React Router
- Zustand
- Bootstrap
- Bootstrap Icons
- Tailwind CSS
- Tailwind Vite Plugin
- Custom CSS with RTL support

## Backend & Data

- Supabase Auth
- Supabase Database / PostgreSQL
- Supabase Storage
- Express.js recommendation backend
- Node.js
- pg (PostgreSQL driver)
- Supabase service role fallback mode

## Deployment

- Vercel frontend deployment
- SPA rewrite configuration via `vercel.json`
- Separate Node.js backend deployment for recommendations

---

# Architecture Overview

The project is split into two main parts:

1. React frontend
2. Node.js recommendation backend

The frontend handles:

- Storefront experience
- Authentication
- Cart and checkout
- Admin dashboard
- Product management
- Offers and ratings
- User interaction tracking

Supabase is used as the primary backend platform for:

- Authentication
- Database tables
- Product image storage

The recommendation backend exposes:

```http
GET /api/recommendations/hero?user_id=<optional-user-id>
```

The recommendation engine scores products using:

- User category affinity
- Global popularity
- Product ratings
- Product freshness
- Novelty scoring

If no user history exists, the backend falls back to a cold-start trending strategy.

---

# Folder Structure

```bash
WOW-blog/
├── backend/
│   ├── src/
│   │   ├── recommendation.js
│   │   └── server.js
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── components/cart/
│   ├── components/layout/
│   ├── features/admin/
│   ├── features/products/
│   ├── hooks/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   ├── services/
│   ├── stores/
│   └── types/
│
├── index.html
├── package.json
├── vite.config.ts
├── vercel.json
└── tsconfig*.json
```

---

# Setup & Installation

## 1. Clone the Repository

```bash
git clone <repository-url>
cd WOW-blog
```

---

## 2. Install Frontend Dependencies

```bash
npm install
```

---

## 3. Configure Frontend Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
VITE_RECOMMENDATION_API_URL=http://localhost:4000
```

> `VITE_RECOMMENDATION_API_URL` is optional.  
> The frontend can still run without the external recommendation service.

---

## 4. Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 5. Configure Backend Environment Variables

Create `backend/.env` using `backend/.env.example`:

```env
PORT=4000
FRONTEND_ORIGIN=http://localhost:5173

DATABASE_URL=postgresql://postgres:password@host:5432/postgres?sslmode=require

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

The backend supports two database modes:

- `DATABASE_URL` for direct PostgreSQL access
- `SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY` as a Supabase fallback mode

---

# Running Locally

## Start Frontend

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

## Start Recommendation Backend

```bash
cd backend
npm run dev
```

Backend runs on:

```txt
http://localhost:4000
```

Health check endpoint:

```http
GET http://localhost:4000/health
```

---

# Deployment

The frontend is configured for deployment on Vercel.

`vercel.json` rewrites all routes to `index.html`, allowing React Router paths such as:

- `/products/:id`
- `/cart`
- `/admin`

to work correctly in production.

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Deployment Requirements

- Add Supabase frontend environment variables in Vercel
- Deploy the recommendation backend separately if personalization is required
- Set `VITE_RECOMMENDATION_API_URL` to the deployed backend URL
- Configure Supabase Auth redirect URLs
- Configure Supabase Storage bucket access

---

# Screenshots

## Home Page

_Add screenshot here_

---

## Products Page

_Add screenshot here_

---

## Cart & Checkout

_Add screenshot here_

---

## Admin Dashboard

_Add screenshot here_

---

# Future Improvements

- Persist cart items per authenticated user
- Add dedicated customer order history
- Add richer analytics dashboards
- Improve rating model with per-user ratings
- Add inventory tracking and stock availability
- Add payment gateway integration
- Add automated tests for services and hooks
- Add database migration/schema documentation
- Improve Arabic text encoding consistency
- Add CI/CD checks for linting and production builds

---

# Team & Workflow

This project reflects a multidisciplinary hackathon workflow combining:

- Software engineering
- AI-based personalization
- Product thinking
- Brand presentation

The implementation separates customer experience, admin operations, data services, and recommendation logic into clear modules, enabling collaboration across frontend, backend, AI, and business-focused team members.

---

# Hackathon Context

WOW Cookies was developed during the **Innovate IT Hackathon 2026** at :contentReference[oaicite:1]{index=1}, organized collaboratively by:

- GDSC An-Najah National University
- Faculty of Business & Communication

The hackathon brought together students from:

- Computer Science
- Artificial Intelligence
- Information Technology
- Computer Engineering
- Business
- Marketing

Over approximately three months, teams worked on real-world solutions combining:

- Software engineering
- AI innovation
- Business strategy
- Branding
- Marketing

The event concluded with final presentations in front of mentors, companies, and judges.

---

# License

This project was developed for educational and hackathon purposes.
