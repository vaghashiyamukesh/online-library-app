# Online Library Web Application

Fresh full-stack scaffold built from the PPTX requirements.

## Tech Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Auth: JWT + bcrypt

## Project Structure
- `client/` React frontend (home, dashboard, detail, auth)
- `server/` Express API (auth, books CRUD, dashboard)

## Setup
1. Start MongoDB locally (`mongodb://127.0.0.1:27017/online_library`) or provide your own URI.
2. Copy `server/.env.example` to `server/.env` and update values.
3. Install dependencies (already scaffolded during setup).

## Run Backend
```bash
cd server
npm run dev
```

## Run Frontend
```bash
cd client
npm run dev
```

## API Highlights
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/books`
- `GET /api/books/:id`
- `POST /api/books` (auth)
- `PUT /api/books/:id` (auth)
- `DELETE /api/books/:id` (auth)
- `GET /api/dashboard` (auth)
- `POST /api/dashboard/library` (auth)

The backend auto-seeds sample books on first run.

## Free Hosting Deployment Guide

Recommended setup:
- Frontend: Netlify (free)
- Backend API: Render Web Service (free tier availability depends on Render account/region)
- Database: MongoDB Atlas M0 (free)

### 1) Deploy MongoDB (Atlas)
1. Create a free cluster on MongoDB Atlas.
2. Create a database user and add your IP access settings.
3. Copy the connection string and use it as `MONGO_URI` in Render.

### 2) Deploy Backend (Render)
1. Push this project to GitHub.
2. In Render, create a new Web Service from your repo.
3. Service settings:
	- Root Directory: `server`
	- Build Command: `npm install`
	- Start Command: `npm start`
4. Add environment variables in Render:
	- `PORT` = `10000`
	- `NODE_ENV` = `production`
	- `MONGO_URI` = your Atlas URI
	- `JWT_SECRET` = long random secret
	- `CORS_ORIGIN` = your Netlify site URL (example: `https://your-site.netlify.app`)
5. Deploy and verify health endpoint:
	- `https://your-render-service.onrender.com/api/health`

### 3) Deploy Frontend (Netlify)
1. In Netlify, create a site from your GitHub repo.
2. Build settings:
	- Base directory: `client`
	- Build command: `npm run build`
	- Publish directory: `client/dist`
3. Add environment variable:
	- `VITE_API_URL` = `https://your-render-service.onrender.com/api`
4. Deploy site.

Note:
- SPA routing refresh is supported with `client/public/_redirects`.

### 4) Verify End-to-End
1. Open the Netlify URL.
2. Register/login.
3. Browse books and open details.
4. Test Dashboard routes (authenticated).

If requests fail with CORS, confirm:
- `CORS_ORIGIN` exactly matches your Netlify URL
- No trailing slash mismatch
