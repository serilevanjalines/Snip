# Snip — URL Shortener

A full-stack URL shortening service built as a learning project.

## Features
- Shorten long URLs to short codes
- JWT authentication (register/login)
- Redis caching for fast redirects
- Rate limiting on URL creation
- Click tracking

## Tech Stack
- Node.js + Express
- PostgreSQL
- Redis
- Docker + Docker Compose
- JWT + bcrypt

## API Endpoints
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | /auth/register | No | Create account |
| POST | /auth/login | No | Get JWT token |
| POST | /urls | Yes | Shorten a URL |
| GET | /urls | Yes | Get your URLs |
| GET | /:code | No | Redirect to original URL |

## Run Locally
```bash
git clone <repo>
cd url
cp .env.example .env
docker-compose up --build
```
## Live Demo
- Frontend: https://snip-frontend-two.vercel.app
- Backend: https://snip-omzp.onrender.com
## Environment Variables
Copy `.env.example` to `.env` and fill in your values.
```bash
cp .env.example .env
```
