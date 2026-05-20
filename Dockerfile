# =========================
# Stage 1 - Base
# =========================
FROM node:22-alpine AS base

WORKDIR /app

RUN corepack enable
RUN corepack prepare pnpm@9.15.9 --activate

COPY package.json pnpm-lock.yaml ./

# =========================
# Stage 2 - Dependencies
# =========================
FROM base AS dependencies

RUN pnpm install --frozen-lockfile

COPY . .

# =========================
# Stage 3 - Test
# =========================
FROM dependencies AS test

CMD ["pnpm", "test"]

# =========================
# Stage 4 - Production
# =========================
FROM base AS production

ENV NODE_ENV=production

RUN pnpm install --prod --frozen-lockfile

COPY --from=dependencies /app ./

EXPOSE 3000

CMD ["node", "src/server.js"]