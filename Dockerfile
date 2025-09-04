FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY package.json ./
RUN corepack enable && corepack prepare pnpm@latest --activate \
 && pnpm install --prod --no-frozen-lockfile

COPY dist/api ./dist/api

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/api/main.js"]
