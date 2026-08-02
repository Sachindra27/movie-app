# Reel Log — MERN Movie CRUD App

A simple full-stack movie collection tracker built with MongoDB, Express, React, and Node. Supports creating, reading, updating, and deleting movies.

## Structure

```
movie-app/
  backend/     Express + Mongoose REST API
  frontend/    React UI (Create React App)
```

## Prerequisites

- Node.js 18+
- A MongoDB instance (local install, or a free cluster on MongoDB Atlas)

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
# edit .env and set MONGO_URI if you're not using a local default MongoDB
npm run dev
```

The API starts on `http://localhost:5000` by default. Endpoints:

| Method | Route              | Description        |
|--------|--------------------|---------------------|
| GET    | /api/movies        | List all movies     |
| GET    | /api/movies/:id     | Get one movie       |
| POST   | /api/movies        | Create a movie      |
| PUT    | /api/movies/:id     | Update a movie      |
| DELETE | /api/movies/:id     | Delete a movie      |

A movie document looks like:

```json
{
  "title": "Paddington",
  "director": "Paul King",
  "genre": "Comedy",
  "year": 2014,
  "rating": 8.5,
  "posterUrl": "https://...",
  "description": "A young Peruvian bear travels to London."
}
```

## 2. Frontend setup

Open a second terminal:

```bash
cd frontend
npm install
npm start
```

The app opens at `http://localhost:3000` and talks to the API at `http://localhost:5000/api/movies` by default.

To point the frontend at a different API URL, create a `frontend/.env` file:

```
REACT_APP_API_URL=http://localhost:5000/api/movies
```

## Notes

- No authentication — this is intentionally minimal, focused on CRUD only.
- Poster images are optional; a placeholder is shown if `posterUrl` is left blank.
- Deleting a movie asks for confirmation before removing it.
