# 🌟 Pokemon API - DevOps & Observability Project

API REST desarrollada con Node.js y Express para consultar información de Pokémon consumiendo la PokéAPI, integrando prácticas modernas de DevOps, CI/CD, Docker y observabilidad con OpenTelemetry + Grafana Stack.

---

## 🚀 Tecnologías utilizadas

### 💻 Backend
- **Node.js 22**
- **Express**
- **Axios**

### 🧪 Testing
- **Jest**
- **Supertest**

### 📝 Logging
- **Pino**
- **Pino HTTP**

### 👁️ Observabilidad
- **OpenTelemetry**
- **Grafana**
- **Loki**
- **Tempo**
- **Prometheus**
- **OpenTelemetry Collector**

### 🛠️ DevOps
- **Docker**
- **Docker Compose**
- **GitHub Actions**
- **Docker Hub**
- **Render**

---

## 📦 Características

- ✅ API REST con Express
- ✅ Consumo de PokéAPI
- ✅ Endpoint de healthcheck
- ✅ Endpoint de error intencional para observabilidad
- ✅ Tests unitarios e integración
- ✅ Docker multi-stage build
- ✅ Docker Compose
- ✅ CI/CD con GitHub Actions
- ✅ Publicación automática de imágenes en Docker Hub
- ✅ Deploy automático en Render
- ✅ Logs centralizados con Loki
- ✅ Traces distribuidos con Tempo
- ✅ Métricas con Prometheus
- ✅ Dashboards con Grafana
- ✅ Instrumentación con OpenTelemetry

---

## 📁 Estructura del proyecto

```txt
.
├── .github/
│   └── workflows/
│       └── ci-cd.yml
│
├── observability/
│   ├── grafana/
│   │   ├── dashboards/
│   │   └── provisioning/
│   │
│   ├── loki/
│   │   └── local-config.yaml
│   │
│   ├── otel/
│   │   └── otel-collector-config.yaml
│   │
│   ├── prometheus/
│   │   └── prometheus.yml
│   │
│   └── tempo/
│       └── tempo.yaml
│
├── src/
│   ├── lib/
│   ├── middlewares/
│   ├── routes/
│   ├── app.js
│   ├── server.js
│   └── tracing.js
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

## ⚙️ Instalación local

**1️⃣ Clonar repositorio**
```bash
git clone https://github.com/TU_USUARIO/node-devops-rest-api.git
cd node-devops-rest-api
```

**2️⃣ Instalar dependencias**
```bash
pnpm install
```

**3️⃣ Ejecutar aplicación**
```bash
pnpm dev
```
*Servidor disponible en: http://localhost:3000*

---

## 🧪 Ejecutar tests

```bash
pnpm test
```

**Tests implementados:**
- Health endpoint
- Pokémon endpoint
- Error endpoint

---

## 🐳 Docker

**Build de imagen**
```bash
docker build -t pokemon-api .
```

**Ejecutar contenedor**
```bash
docker run -p 3000:3000 pokemon-api
```

---

## 🐳 Docker Compose

**Levantar stack completo:**
```bash
docker compose up -d --build
```

### 🔍 Servicios disponibles

| Servicio | URL |
|----------|-----|
| **API** | `http://localhost:3000` |
| **Grafana** | `http://localhost:3001` |
| **Prometheus** | `http://localhost:9090` |
| **Loki** | `http://localhost:3100` |
| **Tempo** | `http://localhost:3200` |

---

## 📡 Endpoints API

### Healthcheck
```http
GET /health
```

**Respuesta:**
```json
{
  "status": "ok"
}
```

### Obtener Pokémon
```http
GET /pokemon/:name
```

**Ejemplo:**
`GET /pokemon/pikachu`

### Endpoint de error intencional
```http
GET /error-test
```
*Utilizado para demostrar logs, traces, monitoreo y observabilidad.*

---

## 📊 Observabilidad

La aplicación está instrumentada utilizando **OpenTelemetry**.

### 🔥 Stack de observabilidad
- **Grafana**: Visualización de dashboards.
- **Loki**: Almacenamiento y consulta de logs.
- **Tempo**: Almacenamiento de traces distribuidos.
- **Prometheus**: Recolección de métricas.
- **OpenTelemetry Collector**: Recepción y exportación de telemetría.

### 📈 Cómo probar observabilidad

**1️⃣ Generar tráfico**
```bash
curl http://localhost:3000/health
curl http://localhost:3000/pokemon/pikachu
curl http://localhost:3000/error-test
```

**2️⃣ Ver traces**
- Ingresar a Grafana: `http://localhost:3001`
- Ir a: `Explore -> Tempo`

**3️⃣ Ver logs**
- En Grafana ir a: `Explore -> Loki`
- Query: `{}`

**4️⃣ Ver métricas**
- En Grafana ir a: `Explore -> Prometheus`
- Ejemplo: `http_server_duration_bucket`

---

## 🔄 CI/CD

Pipeline implementado con GitHub Actions.

**✅ El pipeline realiza:**
- Instalación de dependencias
- Ejecución de tests
- Build Docker
- Push a Docker Hub
- Deploy automático en Render

### 🐳 Docker Hub
Las imágenes se publican automáticamente en: `docker.io/TU_USUARIO/node-devops-rest-api`

### ☁️ Deploy
Aplicación desplegada en Render utilizando:
- Docker image
- Deploy Hook
- Integración con GitHub Actions

---

## 🔐 Variables de entorno

### API
```env
PORT=3000
NODE_ENV=production
LOG_LEVEL=info
```

### OpenTelemetry
```env
OTEL_SERVICE_NAME=pokemon-api
OTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4318/v1/traces
```

---

## 🚀 GitHub Actions

**Secrets utilizados:**

| Secret | Descripción |
|--------|-------------|
| `DOCKERHUB_USERNAME` | Usuario Docker Hub |
| `DOCKERHUB_TOKEN` | Token Docker Hub |
| `RENDER_DEPLOY_HOOK` | Deploy hook Render |

---

## 📌 Comandos útiles

**Ver logs**
```bash
docker logs pokemon-api
```

**Ver containers**
```bash
docker ps
```

**Reiniciar stack**
```bash
docker compose down
docker compose up -d --build
```

---

## 🧠 Conceptos aplicados
- REST APIs & Testing
- Docker multi-stage builds
- CI/CD & Infrastructure as Code
- Observabilidad (Distributed Tracing, Logging centralizado, Métricas)
- DevOps básico & Contenedores

---

## 👨‍💻 Autor

Proyecto realizado con fines educativos y de práctica DevOps / Backend / Observabilidad.