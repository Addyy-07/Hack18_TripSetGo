# TripSetGo — AI-Powered Travel Planner

A full-stack MERN application that uses Gemini AI to generate personalised travel itineraries with live budget tracking, interactive maps, social trip discovery, group expense splitting, and a real-time AI Copilot.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 8, Redux Toolkit, Tailwind CSS v4, Mapbox GL, Framer Motion, Recharts, Lucide React |
| Backend | Node.js, Express 5, Mongoose 9, Socket.io 4 |
| Database | MongoDB Atlas |
| Search | Elasticsearch 9 (optional — full-text hotel/restaurant/attraction search) |
| Cache | Redis via ioredis (optional — request-level caching) |
| AI | Google Gemini 2.0 Flash (`@google/generative-ai`) with deterministic fallback planner |
| Auth | JWT (15 min access token) + rotating refresh token (7 d, httpOnly cookie) + Google OAuth One-Tap |
| Payments | Razorpay (Free / Pro subscription tiers) |
| Storage | Cloudinary (avatar uploads via Multer + streamifier) |
| Email | Nodemailer / SMTP (OTP verification, password reset) |
| Real-time | Socket.io (notifications, collaborative trip presence) |
| Security | Helmet, CORS, express-rate-limit, CSRF middleware, Joi validation, XSS sanitizer, bcryptjs |
| Logging | Winston + Morgan |

## Project Structure

```
TripSetGo/
├── frontend/                       # React 19 + Vite 8 (runs on :3000)
│   └── src/
│       ├── App.jsx                 # Root — GoogleOAuthProvider, socket, toasts
│       ├── main.jsx
│       ├── index.css
│       ├── app/                    # Redux store
│       ├── assets/
│       ├── components/
│       │   ├── common/             # Avatar, Badge, Button, ErrorBoundary, Input, Loader, Modal, Toast
│       │   ├── layout/             # DashboardLayout (sidebar + nav)
│       │   └── map/                # Mapbox GL components
│       ├── features/               # Redux slices
│       │   ├── admin/
│       │   ├── auth/               # authSlice (login, signup, fetchMe, Google OAuth)
│       │   ├── discover/           # discoverSlice
│       │   ├── expenses/
│       │   ├── notifications/
│       │   ├── planner/
│       │   ├── subscription/       # subscriptionSlice
│       │   └── trips/              # tripsSlice
│       ├── hooks/
│       │   ├── useDebounce.js
│       │   ├── useMapbox.js
│       │   ├── useSocket.js
│       │   └── useTripCollaboration.js
│       ├── pages/
│       │   ├── Home/               # Landing page
│       │   ├── Auth/               # Login, Signup, VerifyOTP, ForgotPassword, ResetPassword
│       │   ├── Dashboard/
│       │   │   ├── index.jsx       # Dashboard home
│       │   │   ├── Planner.jsx     # AI trip planner (36 KB — main feature)
│       │   │   ├── Copilot.jsx     # Streaming AI chat assistant
│       │   │   ├── MyTrips.jsx     # User trip list + actions
│       │   │   ├── Discover.jsx    # Public trip feed
│       │   │   ├── Expenses.jsx    # Group expense tracker (Splitwise-style)
│       │   │   ├── Analytics.jsx   # Personal travel analytics
│       │   │   ├── Map.jsx         # Interactive Mapbox map
│       │   │   ├── Subscription.jsx # Free/Pro plan management
│       │   │   ├── Notifications.jsx
│       │   │   ├── Profile.jsx
│       │   │   └── Admin/          # Admin: Analytics, Users, Reviews, Destinations, Reports
│       │   ├── TripDetail/         # Public shared trip view
│       │   └── NotFound.jsx
│       ├── router/
│       │   └── index.jsx           # React Router v7 routes + PrivateRoute, PublicOnly, AdminRoute guards
│       └── services/               # Axios instance with JWT refresh interceptor
│
└── backend/                        # Express 5 API (runs on :5000)
    ├── server.js
    └── src/
        ├── app.js                  # Express app, Socket.io, CORS, middleware chain
        ├── config/
        │   ├── db.js               # MongoDB Atlas connection
        │   ├── redis.js            # ioredis client (optional)
        │   └── elasticsearch.js    # Elasticsearch client (optional)
        ├── controllers/            # 13 controllers
        │   ├── auth.controller.js
        │   ├── trip.controller.js
        │   ├── planner.controller.js
        │   ├── copilot.controller.js
        │   ├── discover.controller.js
        │   ├── expense.controller.js
        │   ├── notification.controller.js
        │   ├── recommendation.controller.js
        │   ├── review.controller.js
        │   ├── search.controller.js
        │   ├── subscription.controller.js
        │   ├── user.controller.js
        │   └── admin.controller.js
        ├── middleware/
        │   ├── auth.middleware.js
        │   ├── cache.middleware.js
        │   ├── csrf.middleware.js
        │   ├── errorHandler.middleware.js
        │   └── validate.middleware.js
        ├── models/                 # 17 Mongoose models
        │   ├── User.model.js
        │   ├── Trip.model.js
        │   ├── OTP.model.js
        │   ├── RefreshToken.model.js
        │   ├── Notification.model.js
        │   ├── Subscription.model.js
        │   ├── Conversation.model.js
        │   ├── Message.model.js
        │   ├── Expense.model.js
        │   ├── Group.model.js
        │   ├── Bookmark.model.js
        │   ├── Review.model.js
        │   ├── Hotel.model.js
        │   ├── Restaurant.model.js
        │   ├── Attraction.model.js
        │   ├── AuditLog.model.js
        │   └── UserActivity.model.js
        ├── planning/
        │   └── fallbackPlanner.js  # Deterministic planner (used when Gemini is unavailable)
        ├── routes/                 # 15 route files
        │   ├── auth.routes.js
        │   ├── trip.routes.js
        │   ├── planner.routes.js
        │   ├── copilot.routes.js
        │   ├── discover.routes.js
        │   ├── expense.routes.js
        │   ├── notification.routes.js
        │   ├── recommendation.routes.js
        │   ├── review.routes.js
        │   ├── search.routes.js
        │   ├── subscription.routes.js
        │   ├── user.routes.js
        │   ├── admin.routes.js
        │   ├── cache.routes.js
        │   └── index.js
        ├── scripts/
        │   ├── esIndex.js          # Seeds Elasticsearch index from MongoDB
        │   └── promote.js          # CLI to promote user to admin role
        ├── services/
        │   ├── gemini.service.js   # Gemini 2.0 Flash AI integration
        │   ├── recommendation.service.js # Personalised destination recommendations
        │   ├── elasticsearch.service.js  # Full-text search (hotels, restaurants, attractions)
        │   ├── notification.service.js   # Socket.io notification delivery
        │   ├── cache.service.js          # Redis + node-cache hybrid caching
        │   ├── cloudinary.service.js     # Avatar upload
        │   ├── email.service.js          # OTP & password reset emails
        │   └── es.sync.js               # Elasticsearch sync utilities
        ├── utils/
        │   ├── asyncHandler.js
        │   ├── auditLogger.js
        │   ├── jwt.js
        │   ├── logger.js           # Winston logger
        │   ├── response.js
        │   ├── sanitizer.js        # XSS + NoSQL injection sanitizer
        │   ├── totp.js             # OTP generation / verification
        │   └── transaction.js      # MongoDB session transaction helper
        └── validators/             # Joi schemas
            ├── auth.validator.js
            ├── expense.validator.js
            ├── review.validator.js
            ├── trip.validator.js
            └── user.validator.js
```

## Quick Start

### Prerequisites
- Node.js ≥ 18
- MongoDB Atlas cluster (free tier works)
- Google Gemini API key (optional — deterministic fallback is built-in)

### 1. Clone & install

```bash
git clone <repo-url>
cd TripSetGo
npm run install:all
```

### 2. Configure environment

Create `backend/.env`:

```env
# Required
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/tripsetgo
JWT_SECRET=<32-char-random-string>
REFRESH_TOKEN_SECRET=<different-32-char-random-string>
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000   # comma-separated for multiple origins

# Optional — features degrade gracefully without these
GEMINI_API_KEY=
GOOGLE_CLIENT_ID=

# Email (OTP + password reset)
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=

# File storage
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Payments
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# Search (optional)
ELASTICSEARCH_URL=
ELASTICSEARCH_API_KEY=

# Cache (optional)
REDIS_URL=
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000
VITE_MAPBOX_TOKEN=<your-mapbox-public-token>
VITE_GOOGLE_CLIENT_ID=<same-as-backend-GOOGLE_CLIENT_ID>
```

### 3. Run development

```bash
npm run dev          # starts both frontend (:3000) and backend (:5000) concurrently
# — or individually —
npm run dev:frontend
npm run dev:backend
```

### 4. Build for production

```bash
npm run build        # builds frontend to frontend/dist/
```

### 5. Seed Elasticsearch (optional)

```bash
cd backend
npm run es:seed      # indexes existing MongoDB Hotel, Restaurant, Attraction docs into Elasticsearch
```

### 6. Promote a user to admin

```bash
cd backend
node src/scripts/promote.js <user-email>
```

## API Overview

### Auth
| Method | Route | Description |
|---|---|---|
| POST | `/api/v1/auth/signup` | Register + send email OTP |
| POST | `/api/v1/auth/verify-otp` | Verify email OTP |
| POST | `/api/v1/auth/login` | Login → access + refresh token |
| POST | `/api/v1/auth/refresh` | Rotate refresh token |
| POST | `/api/v1/auth/logout` | Revoke refresh token |
| POST | `/api/v1/auth/google-token` | Google OAuth One-Tap |
| POST | `/api/v1/auth/forgot-password` | Send password reset email |
| POST | `/api/v1/auth/reset-password` | Reset password with token |

### Trips
| Method | Route | Description |
|---|---|---|
| POST | `/api/v1/trips` | Generate AI trip plan |
| GET | `/api/v1/trips/my-trips` | Paginated user trips |
| GET | `/api/v1/trips/:id` | Public trip detail (optionalAuth) |
| PUT | `/api/v1/trips/:id` | Update trip |
| DELETE | `/api/v1/trips/:id` | Delete trip |
| POST | `/api/v1/trips/:id/share` | Make public + return share URL |
| POST | `/api/v1/trips/:id/clone` | Clone public trip |
| POST | `/api/v1/trips/:id/like` | Like / unlike |
| POST | `/api/v1/trips/:id/bookmark` | Bookmark / unbookmark |
| GET/POST/DELETE | `/api/v1/trips/:id/drafts` | Save / list / delete planner drafts |

### Planner
| Method | Route | Description |
|---|---|---|
| POST | `/api/v1/planner/generate` | Detailed AI plan (standalone) |
| POST | `/api/v1/planner/regenerate-day` | Regenerate single itinerary day |

### Copilot
| Method | Route | Description |
|---|---|---|
| POST | `/api/v1/copilot/chat` | Streaming SSE AI copilot reply |
| GET | `/api/v1/copilot/conversations` | List conversations |
| GET | `/api/v1/copilot/conversations/:id` | Get conversation with messages |
| DELETE | `/api/v1/copilot/conversations/:id` | Delete conversation |

### Discover
| Method | Route | Description |
|---|---|---|
| GET | `/api/v1/discover` | Public trip feed (paginated) |

### Search (Elasticsearch)
| Method | Route | Description |
|---|---|---|
| GET | `/api/v1/search` | Unified search across trips, hotels, restaurants, attractions |
| GET | `/api/v1/search/hotels` | Search hotels |
| GET | `/api/v1/search/restaurants` | Search restaurants |
| GET | `/api/v1/search/attractions` | Search attractions |

### Recommendations
| Method | Route | Description |
|---|---|---|
| GET | `/api/v1/recommendations` | AI-personalised destination recommendations |
| GET | `/api/v1/recommendations/trending` | Trending destinations |

### Reviews
| Method | Route | Description |
|---|---|---|
| POST | `/api/v1/reviews` | Create review |
| GET | `/api/v1/reviews/:targetType/:targetId` | Get reviews for entity |
| PUT | `/api/v1/reviews/:id` | Update review |
| DELETE | `/api/v1/reviews/:id` | Delete review |

### Groups & Expenses
| Method | Route | Description |
|---|---|---|
| GET/POST | `/api/v1/groups` | List / create expense groups |
| GET/PUT/DELETE | `/api/v1/groups/:id` | Get / update / delete group |
| POST | `/api/v1/groups/:id/members` | Add member |
| DELETE | `/api/v1/groups/:id/members/:userId` | Remove member |
| GET/POST | `/api/v1/groups/:id/expenses` | List / add expense |
| DELETE | `/api/v1/groups/:id/expenses/:expenseId` | Delete expense |
| GET | `/api/v1/groups/:id/settle` | Calculate minimal-transaction settlements |

### Notifications
| Method | Route | Description |
|---|---|---|
| GET | `/api/v1/notifications` | List notifications |
| PUT | `/api/v1/notifications/:id/read` | Mark as read |
| PUT | `/api/v1/notifications/read-all` | Mark all as read |
| DELETE | `/api/v1/notifications/:id` | Delete notification |

### Subscriptions
| Method | Route | Description |
|---|---|---|
| GET | `/api/v1/subscriptions` | Get current subscription |
| POST | `/api/v1/subscriptions/checkout` | Create Razorpay order |
| POST | `/api/v1/subscriptions/verify` | Verify payment & activate Pro |

### Users
| Method | Route | Description |
|---|---|---|
| GET | `/api/v1/users/me` | Get own profile |
| PUT | `/api/v1/users/me` | Update profile |
| POST | `/api/v1/users/me/avatar` | Upload avatar (Cloudinary) |

### Admin
| Method | Route | Description |
|---|---|---|
| GET | `/api/v1/admin/analytics` | Platform-wide analytics |
| GET | `/api/v1/admin/users` | List all users |
| PUT | `/api/v1/admin/users/:id` | Update user (role, ban, etc.) |
| GET | `/api/v1/admin/reviews` | List all reviews |
| DELETE | `/api/v1/admin/reviews/:id` | Delete review |
| GET | `/api/v1/admin/destinations` | Manage destinations |
| GET | `/api/v1/admin/reports` | Platform reports |

### Misc
| Method | Route | Description |
|---|---|---|
| GET | `/api/v1/health` | Health check + uptime |

## Key Features

- **AI Trip Planning** — Gemini 2.0 Flash generates transport options, hotel tiers, food plans, day-by-day itineraries, weather notes, and a packing list. Inputs include destination, dates, budget, pace (relaxed/balanced/packed), and interests. Falls back to a deterministic engine when Gemini is unavailable.
- **Hero Planner Controls** — Regenerate any single day with AI (avoids repeating other days), lock days to preserve them, and save/compare multiple selection drafts side-by-side.
- **AI Copilot** — Context-aware travel assistant with streaming (SSE) replies, grounded in the user's current trip, budget, and recent destinations. Conversations are persisted in MongoDB.
- **Live Budget Tracker** — Redux selector recomputes live spend as you select transport, hotel, food, and activities.
- **Social Discovery** — Public trip feed with like, save, clone, and share-link features.
- **Interactive Map** — Mapbox GL renders trip routes and nearby hotels/restaurants/attractions, themed to match the app.
- **AI Recommendations** — Personalised destination recommendations based on `UserActivity` (search history, trip history, interests). Trending destinations powered by `recommendation.service.js`.
- **Full-Text Search** — Elasticsearch-backed search across hotels, restaurants, and attractions with geo-distance scoring. Falls back to MongoDB text indexes when Elasticsearch is unavailable.
- **Real-time Notifications** — Socket.io broadcasts like/comment/collaboration events to the trip owner. Collaborative trip presence (who is currently viewing a trip).
- **Group Expenses** — Splitwise-style expense groups with per-person splits and minimal-transaction settlement algorithm.
- **Subscriptions** — Razorpay-backed Free/Pro tiers with daily AI generation limits enforced server-side.
- **Reviews** — Star ratings and text reviews on hotels, restaurants, and attractions.
- **Admin Panel** — Platform analytics, user management, review moderation, destination management, and audit logs.

## Real-time (Socket.io) Events

| Event | Direction | Description |
|---|---|---|
| `join` | Client → Server | Register user socket for notifications |
| `join_trip` | Client → Server | Join collaborative trip room |
| `leave_trip` | Client → Server | Leave collaborative trip room |
| `presence_change` | Server → Client | Updated list of users in a trip room |
| `notification` | Server → Client | Real-time notification delivery |

## Security Hardening

- NoSQL injection protection — all auth inputs Joi-validated as strings (blocks `{"$gt":""}` attacks)
- XSS sanitizer on user-generated content
- JWT access token (15 min) + rotating refresh token (7 d, httpOnly, Secure, SameSite=Strict)
- CSRF middleware protecting all `/api` routes
- Helmet, CORS, express-rate-limit (global 1000 req/15 min; auth routes stricter)
- `trust proxy 1` set for correct IP behind Nginx/reverse proxy
- Audit logging for sensitive admin actions
- Fail-fast boot validation — server exits with a clear error if critical env vars are missing

## Environment Variables Reference

See `.env` template in the Quick Start section above. The server logs a warning at startup for any missing optional integration keys but continues running with graceful degradation.

### Optional Services Behaviour

| Service | Behaviour when absent |
|---|---|
| Gemini API | Falls back to `fallbackPlanner.js` deterministic engine |
| Elasticsearch | Falls back to MongoDB text search |
| Redis | Falls back to `node-cache` in-memory cache |
| Cloudinary | Avatar upload endpoint returns error |
| Razorpay | Subscription upgrade endpoints return error |
| SMTP | OTP / password-reset emails fail silently |
