# BASE ------------------------------------
FROM node:16-alpine AS base
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN corepack enable && corepack prepare pnpm@7.7.0 --activate

# PRUNER -----------------------------------
FROM base as pruner
COPY . .
RUN pnpm dlx turbo prune --scope=@bikecoop/web --docker

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

# RUNNER (WEB) -----------------------------------
FROM node:16-alpine AS web
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/apps/web/next.config.js .
COPY --from=builder /app/apps/web/package.json .

COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone .
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXT_PUBLIC_ENV dev
ENV NEXT_PUBLIC_NHOST_PLATFORM false

ENV PORT 3000
EXPOSE 3000

CMD node ./apps/web/server.js
