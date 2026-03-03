# TMDB Movie App

A small full-stack movie browser using the TMDB API. The frontend is built with React + TypeScript and the backend is a NestJS “middle layer” that fetches and transforms TMDB data.

## Live demo
- https://tmdb-movie-app-frontend.vercel.app/

## Features
- Movie list (discover / vote_count sort)
- Search movies by title
- Filter movies by genre
- Recent searches (LIFO) persisted in localStorage
- Loading + error states
- Backend response transformation (trimmed/renamed fields, merged genre + language names)

## Tech stack
- Frontend: React, TypeScript, Redux Toolkit + RTK Query, styled-components, Vite
- Backend: NestJS, Axios/HttpModule, caching for genres/languages, class-validator DTOs

## API endpoints (backend)
- `GET /movies` (optional `genreId`)
- `GET /movies/search?title=...`
- `GET /genres`

## Running locally
```bash
cd frontend
npm install
npm run dev
cd backend
npm install
npm run start:dev