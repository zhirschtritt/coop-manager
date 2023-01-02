# BASE ------------------------------------
FROM node:16-alpine AS base
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN corepack enable && corepack prepare pnpm@7.7.0 --activate

# PRUNER -----------------------------------
FROM base as pruner
COPY . .
RUN pnpm dlx turbo prune --scope=@bikecoop/server --docker

# BUILDER ----------------------------------
FROM base as builder

COPY .gitignore .gitignore
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-*.yaml ./
# required for tsconfig base json
COPY --from=pruner /app/*.json ./

# Required for prisma generate command on alpine
# https://github.com/prisma/prisma/issues/14073
RUN apk add --update --no-cache openssl1.1-compat
RUN pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full .
COPY turbo.json turbo.json
RUN pnpm build

# RUNNER (SERVER) -----------------------------------
FROM node:alpine3.16 AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs

COPY --from=builder /app/apps/server/package.json .
COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder --chown=nodejs:nodejs /app/packages/common packages/common
COPY --from=builder --chown=nodejs:nodejs /app/apps/server apps/server

ENV PORT 5020
EXPOSE 5020

RUN npm run prisma:generate
CMD node apps/server/dist/src/main.js
