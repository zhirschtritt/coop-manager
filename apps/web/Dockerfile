# PRUNER -----------------------------------
FROM node:16-alpine AS pruner
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@7.7.0 --activate
COPY . .
RUN pnpm dlx turbo prune --scope=@bikecoop/web --docker

# BUILDER ----------------------------------
FROM node:alpine AS builder

RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@7.7.0 --activate

ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXT_PUBLIC_ENV dev
ENV NEXT_PUBLIC_NHOST_PLATFORM false

COPY .gitignore .gitignore
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-*.yaml ./
COPY --from=pruner /app/*.json ./
RUN pnpm install --frozen-lockfile

# Build the project
COPY --from=pruner /app/out/full .
COPY turbo.json turbo.json
RUN pnpm build

# RUNNER -----------------------------------
FROM node:alpine AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/apps/web/next.config.js .
COPY --from=builder /app/apps/web/package.json .
# COPY --from=builder /app/node_modules .

COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone .
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

ENV PORT 3000
EXPOSE 3000

CMD node ./apps/web/server.js
