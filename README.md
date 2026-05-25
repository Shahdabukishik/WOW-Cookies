WOW Cookies 🍪
Arabic-first e-commerce platform for personalized cookie ordering, promotions, and store operations.

WOW Cookies is a full-stack web application built for a modern local bakery experience. It combines a customer-facing storefront, cart and checkout workflow, product offers, ratings, admin management, and a recommendation backend that personalizes the home-page product suggestion based on user behavior and product signals.

Overview
WOW Cookies helps customers browse cookies, boxes, drinks, and active offers through a responsive Arabic RTL interface. The platform supports authentication, cart management, checkout, product ratings, personalized recommendations, and admin tools for managing products, offers, and orders.

The project was developed as part of Innovate IT Hackathon 2026 at An-Najah National University, where software engineering, AI, business, and marketing students collaborated to build real-world digital products.

Problem Statement
Small food businesses often rely on social media messages or manual order handling, which makes it difficult to:

Present products professionally
Manage offers and discounts dynamically
Track customer demand and order status
Personalize product discovery
Build a scalable online ordering experience
Solution
WOW Cookies provides a dedicated digital storefront for cookie ordering with a complete operational layer for admins. Customers can explore products, receive mood-based suggestions, spin a cookie wheel, add items to cart, apply active offers, and place pickup or delivery orders.

Admins can manage products, upload images, create offers, track orders, and update fulfillment status from a protected dashboard.

Key Features
🍪 Arabic RTL storefront for WOW Cookies
Product catalog with cookies, boxes, and drinks
Product filtering and price sorting
Product details pages with image, description, ingredients, price, and rating
Cart management using Zustand state
Checkout flow with delivery and pickup options
Supabase authentication via email OTP and Google OAuth
Role-based admin route protection
Admin dashboard for product, order, and offer management
Product image upload using Supabase Storage
Active global and product-specific discounts
Product ratings
User interaction tracking for views, clicks, and add-to-cart events
Personalized hero recommendation service
Mood-based cookie recommendations
Interactive cookie wheel experience
Responsive design for desktop and mobile
Vercel SPA routing support
Tech Stack
Frontend

React 19
TypeScript
Vite
React Router
Zustand
Bootstrap
Bootstrap Icons
Tailwind CSS / Tailwind Vite plugin
Custom CSS with RTL layout support
Backend & Data

Supabase Auth
Supabase Database / PostgreSQL
Supabase Storage
Express.js recommendation backend
Node.js
pg for direct PostgreSQL access
Supabase service role fallback mode
Deployment

Vercel frontend deployment
SPA rewrite configuration via vercel.json
Separate Node.js backend deployment for recommendations
Architecture Overview
The project is split into a React frontend and a small Node.js recommendation backend.

The frontend handles the storefront, authentication, cart, checkout, admin dashboard, product management, offers, ratings, and user interaction tracking. Supabase is used as the main backend platform for auth, database tables, and product image storage.

The recommendation backend exposes:

GET /api/recommendations/hero?user_id=<optional-user-id>
It loads products, order items, and user interaction data, then scores products using:

User category affinity
Global popularity
Rating
Product freshness
Novelty
If no user history exists, the backend falls back to a cold-start trending strategy.

Folder Structure
WOW-blog/
├── backend/
│   ├── src/
│   │   ├── recommendation.js      # Product recommendation scoring model
│   │   └── server.js              # Express API server
│   ├── .env.example
│   ├── package.json
│   └── README.md
├── public/
├── src/
│   ├── assets/                    # Local images and brand assets
│   ├── components/                # Shared UI components
│   ├── components/cart/           # Cart and checkout UI
│   ├── components/layout/         # Layout-level UI
│   ├── features/admin/            # Admin dashboard, products, orders, offers
│   ├── features/products/         # Product filtering logic
│   ├── hooks/                     # Product, cart, checkout, auth, offers hooks
│   ├── layouts/                   # Main app layout
│   ├── lib/                       # Supabase client
│   ├── pages/                     # Route pages
│   ├── services/                  # Supabase and business logic services
│   ├── stores/                    # Zustand cart store
│   └── types/                     # Shared TypeScript types
├── index.html
├── package.json
├── vite.config.ts
├── vercel.json
└── tsconfig*.json
Setup & Installation
1. Clone the repository
git clone <repository-url>
cd WOW-blog
2. Install frontend dependencies
npm install
3. Configure frontend environment variables
Create a .env file in the project root:

VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
VITE_RECOMMENDATION_API_URL=http://localhost:4000
VITE_RECOMMENDATION_API_URL is optional. If it is not available, the frontend can still run without the external recommendation service.

4. Install backend dependencies
cd backend
npm install
5. Configure backend environment variables
Create backend/.env using backend/.env.example:

PORT=4000
FRONTEND_ORIGIN=http://localhost:5173
DATABASE_URL=postgresql://postgres:password@host:5432/postgres?sslmode=require
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
The backend supports two database modes:

DATABASE_URL for direct PostgreSQL access
SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY as a Supabase client fallback
Running Locally
Start the frontend
npm run dev
The frontend runs on:

http://localhost:5173
Start the recommendation backend
cd backend
npm run dev
The backend runs on:

http://localhost:4000
Health check:

GET http://localhost:4000/health
Deployment
The frontend is prepared for deployment on Vercel. The vercel.json file rewrites all routes to index.html, which allows React Router routes such as /products/:id, /cart, and /admin to work in production.

{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
Deployment requirements:

Add Supabase frontend environment variables in Vercel
Deploy the recommendation backend separately if personalization is required
Set VITE_RECOMMENDATION_API_URL to the deployed backend URL
Configure Supabase Auth redirect URLs for the production domain
Configure Supabase Storage bucket access for product images
Screenshots
Screenshots can be added after deployment or final UI capture.

Home Page


Products Page


Cart & Checkout


Admin Dashboard


Future Improvements
Persist cart items per authenticated user
Add dedicated customer order history
Add richer analytics cards for revenue, conversion, and best-selling products
Improve rating model with per-user ratings instead of updating product-level rating directly
Add inventory tracking and stock availability
Add payment gateway integration
Add automated tests for services, hooks, and checkout logic
Add full database migration/schema documentation
Add better Arabic text encoding consistency across all files
Add CI checks for linting and production builds
Team & Workflow
This project reflects a multidisciplinary hackathon workflow combining software engineering, AI-based personalization, product thinking, and brand presentation. The implementation separates customer experience, admin operations, data services, and recommendation logic into clear modules, making it easier for team members to collaborate across frontend, backend, and business-facing features.

Hackathon Context
WOW Cookies was developed during Innovate IT Hackathon 2026 at An-Najah National University, organized collaboratively by GDSC An-Najah National University and the Faculty of Business & Communication.

The hackathon brought together students from:

Computer Science
Artificial Intelligence
Information Technology
Computer Engineering
Business
Marketing
Over approximately three months, teams worked on real-world solutions that combined software engineering, AI innovation, business strategy, branding, and marketing, ending with final presentations in front of mentors, companies, and judges.
