# 🌟 Pokemon API - DevOps & Observability Project

API REST desarrollada con Node.js y Express para consultar información de Pokémon consumiendo la PokéAPI, integrando prácticas modernas de DevOps, CI/CD, Docker y observabilidad con OpenTelemetry + Grafana Cloud.

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
- **OpenTelemetry (SDK directo, sin collector local)**
- **Grafana Cloud**
- **Loki (Logs)**
- **Tempo (Traces)**
- **Prometheus/Mimir (Metrics)**

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
- ✅ Logs centralizados en Grafana Cloud (Loki)
- ✅ Traces distribuidos en Grafana Cloud (Tempo)
- ✅ Métricas en Grafana Cloud (Prometheus/Mimir)
- ✅ Dashboard unificado en Grafana
- ✅ Instrumentación con OpenTelemetry (SDK directo)

---

## 📁 Estructura del proyecto

```txt
.
├── .github/
│   └── workflows/
│       └── ci-cd.yml
│
├── grafana/
│   └── dashboard-1779399247265.json
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

**Levantar API:**
```bash
docker compose up -d --build
```

### 🔍 Servicios disponibles

| Servicio | URL |
|----------|-----|
| **API** | `http://localhost:3000` |

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

La aplicación está instrumentada con **OpenTelemetry** y envía telemetría **directo a Grafana Cloud** vía OTLP (sin collector local).

### ⚙️ Configurar Grafana Cloud
1. Crear un API Key con permisos para **Metrics/Logs/Traces**.
2. Tomar el **OTLP Endpoint** desde tu stack (sección OpenTelemetry).
3. Completar variables en `.env` usando la plantilla en `.env.example`.

### 📈 Generar tráfico

**1️⃣ Generar tráfico**
```bash
curl http://localhost:3000/health
curl http://localhost:3000/pokemon/pikachu
curl http://localhost:3000/error-test
```

**2️⃣ Ver traces (Tempo)**
- Grafana Cloud → `Explore` → `Tempo`
- TraceQL: `{resource.service.name="pokemon-api"}`

**3️⃣ Ver logs (Loki)**
- Grafana Cloud → `Explore` → `Loki`
- LogQL: `{service_name="pokemon-api"}`

**4️⃣ Ver métricas (Prometheus/Mimir)**
- Grafana Cloud → `Explore` → `Prometheus`
- Ejemplo: `sum(rate(http_requests_total[5m]))`
- p95: `histogram_quantile(0.95, sum by (le) (rate(http_request_duration_ms_bucket_total[5m])))`

### 📊 Dashboard unificado
Importá el dashboard incluido en [grafana/dashboard-1779399247265.json](grafana/dashboard-1779399247265.json) y seleccioná tus datasources de Grafana Cloud para Loki, Tempo y Prometheus.

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
OTEL_EXPORTER_OTLP_ENDPOINT=https://otlp-gateway-<region>.grafana.net/otlp
OTEL_EXPORTER_OTLP_HEADERS=Authorization=Basic <BASE64_INSTANCE_ID:API_KEY>
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