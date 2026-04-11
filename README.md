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
