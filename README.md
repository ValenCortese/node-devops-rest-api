# PokeAPI REST API

REST API built with Node.js and Express consuming data from PokéAPI.

This project was developed as part of a DevOps/backend assignment and includes:

- REST API
- Automated testing
- Docker multi-stage builds
- Docker Compose
- Error handling
- Observability-ready architecture
- CI/CD with GitHub Actions
- Docker Hub publishing
- Continuous deployment

Future improvements:
- OpenTelemetry integration
- Grafana stack (Loki, Tempo, Prometheus)

---

# 🚀 Tech Stack

- Node.js
- Express
- Axios
- pnpm
- Jest
- Supertest
- Docker
- Docker Compose

---

# 📁 Project Structure

```txt
project/
│
├── src/
│   ├── app.js
│   ├── server.js
│   │
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── middlewares/
│
├── tests/
│
├── Dockerfile
├── docker-compose.yml
├── package.json
├── pnpm-lock.yaml
└── README.md
```

---

# 📡 API Endpoints

## Healthcheck

```http
GET /health
```

Response:

```json
{
  "status": "ok"
}
```

---

## Get Pokémon by name

```http
GET /pokemon/:name
```

Example:

```http
GET /pokemon/pikachu
```

Response:

```json
{
  "name": "pikachu",
  "height": 4,
  "weight": 60,
  "types": ["electric"]
}
```

---

## Random Pokémon

```http
GET /pokemon/random
```

Returns a random Pokémon from PokéAPI.

---

## Error Testing Endpoint

```http
GET /error-test
```

This endpoint intentionally throws an error for observability and monitoring testing.

Response:

```json
{
  "error": "Internal Server Error"
}
```

---

# 🛠️ Local Development

## Install dependencies

```bash
pnpm install
```

---

## Start development server

```bash
pnpm dev
```

---

## Run tests

```bash
pnpm test
```

---

# 🧪 Testing

This project uses:

- Jest
- Supertest

Test coverage includes:

- Health endpoint
- Pokémon endpoints
- Error handling
- HTTP status validation

---

# 🐳 Docker

## Build production image

```bash
docker build --target production -t pokemon-api .
```

---

## Run container

```bash
docker run -p 3000:3000 pokemon-api
```

---

# 🐳 Docker Compose

## Start services

```bash
docker compose up
```

---

## Run in detached mode

```bash
docker compose up -d
```

---

## Stop services

```bash
docker compose down
```

---

# 🧱 Multi-Stage Docker Build

The project uses a multi-stage Docker build:

- Base stage
- Dependencies stage
- Test stage
- Production stage

This approach reduces image size and separates development/testing dependencies from production runtime.

---

# 🔥 Observability (Planned)

The project is prepared for future observability integration using:

- OpenTelemetry
- Grafana
- Loki
- Tempo
- Prometheus

---

# 📦 CI/CD

CI/CD pipeline with GitHub Actions includes:

- Automated tests
- Docker image builds
- Docker Hub publishing
- Continuous deployment

---

# 🌐 External API

This project consumes:

- https://pokeapi.co

---

# 📄 License

Educational project.