FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable && corepack prepare pnpm@latest --activate \
 && pnpm install --frozen-lockfile --prod

COPY dist/api ./dist/api

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/api/main.js"]
