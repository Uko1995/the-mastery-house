# The Mastery House - Copilot Instructions

## Project Overview
The Mastery House is a private micro-school enrollment platform built with React + TypeScript + Vite, deployed on Vercel with serverless API functions and MongoDB Atlas for data storage.

## Tech Stack
- **Frontend**: React 19, TypeScript, Vite 7, Tailwind CSS 4
- **Backend**: Vercel Serverless Functions (Node.js)
- **Database**: MongoDB Atlas
- **Styling**: Tailwind CSS with custom brand colors
- **Animations**: Framer Motion
- **Form Validation**: libphonenumber-js (phone), validator (email)
- **Notifications**: react-hot-toast

## Brand Colors
- Primary (Dark Green): `#1f3d2b`
- Accent (Gold): `#b59a5b`
- Background (Cream): `#EFE6D8`

## Project Structure

```
the-mastery-house/
├── api/                      # Vercel serverless functions
│   ├── enroll.ts            # POST - enrollment form submission
│   ├── waiting-list.ts      # POST - waiting list submission
│   └── admin/               # Protected admin endpoints
│       ├── enrollments.ts   # GET - fetch enrollments (requires API key)
│       └── waiting-list.ts  # GET - fetch waiting list (requires API key)
├── lib/                      # Shared utilities for API
│   ├── mongodb.ts           # MongoDB connection management
│   └── validation.ts        # Input validation & rate limiting
├── src/
│   ├── components/          # Reusable React components
│   ├── pages/               # Page components
│   │   ├── LandingPage.tsx  # Main landing page
│   │   ├── EnrollForm.tsx   # Enrollment intention form
│   │   ├── WaitingList.tsx  # Waiting list form
│   │   ├── AdminLogin.tsx   # Admin login page
│   │   └── AdminDashboard.tsx # Admin dashboard
│   └── App.tsx              # Router configuration
├── public/                   # Static assets (served at root)
├── vercel.json              # Vercel deployment config
└── tsconfig.api.json        # TypeScript config for API files
```

## API Endpoints

### Public Endpoints
- `POST /api/enroll` - Submit enrollment form
- `POST /api/waiting-list` - Submit waiting list form

### Protected Admin Endpoints (require `Authorization: Bearer <API_KEY>`)
- `GET /api/admin/enrollments` - Fetch enrollments (paginated)
- `GET /api/admin/waiting-list` - Fetch waiting list entries (paginated)

Query parameters for pagination: `?page=1&limit=20`

## Environment Variables

### Required in Vercel Dashboard:
- `MONGO_URI` - MongoDB Atlas connection string
- `ADMIN_API_KEY` - Secret key for admin API access

## Development

### Local Development Setup
Run two terminals:
1. **API Server**: `vercel dev --listen 3001`
2. **Frontend**: `npm run dev`

Vite proxies `/api/*` requests to port 3001 (configured in `vite.config.ts`).

### Build & Deploy
```bash
npm run build        # Build frontend
vercel --prod        # Deploy to production
```

## Database Collections

### `enrollments`
Stores enrollment form submissions with fields:
- firstName, lastName, email, phone
- country, timezone, howHeard
- childName, childAge, schoolingStructure, ageBand
- promptInterest, formationAreas (array), childTemperament
- childAt25, parentInvolvement, structuredEnvironment
- faithValues, investmentReady, additionalInfo
- createdAt, ipAddress

### `waiting-list`
Stores waiting list entries with fields:
- firstName, lastName, email, phone
- childName, childAge, ageBand
- message (optional)
- createdAt, ipAddress

## Security Features
- Rate limiting: 3 submissions per hour per IP
- Server-side validation for all inputs
- Phone number validation with libphonenumber-js
- Email validation with validator library
- API key authentication for admin endpoints
- Duplicate email detection

## Routes
- `/` - Landing page
- `/enroll-form` - Enrollment intention form
- `/waiting-list` - Waiting list form
- `/admin` - Admin login
- `/admin/dashboard` - Admin dashboard (protected)

## Coding Guidelines
- Use TypeScript for all files
- Follow existing component patterns
- Use Tailwind CSS for styling
- Use brand colors consistently
- Add toast notifications for user feedback
- Validate inputs on both client and server
