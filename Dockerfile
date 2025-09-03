FROM node:20-alpine AS builder

WORKDIR /app
COPY . .
RUN npm install -g pnpm && pnpm install
RUN pnpm nx build api

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/dist/api ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install --prod

EXPOSE 3000
CMD ["node", "dist/main.js"]
