FROM node:22-slim

WORKDIR /app

# Copiar el package.json y package-lock.json
COPY store-nextjs/package.json store-nextjs/package-lock.json ./

RUN npm ci

# Copiar el resto de la aplicación
COPY store-nextjs/app/ ./app/
COPY store-nextjs/public/ ./public/
COPY store-nextjs/eslint.config.mjs ./
COPY store-nextjs/next-env.d.ts ./
COPY store-nextjs/next.config.ts ./
COPY store-nextjs/postcss.config.mjs ./
COPY store-nextjs/tsconfig.json ./


ENV NEXT_TELEMETRY_DISABLED=1

CMD ["npm", "run", "dev"]