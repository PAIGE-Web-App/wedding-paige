# Build stage
FROM node:24-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy workspace files
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY apps/web-orchestration/package.json ./apps/web-orchestration/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY apps/web-orchestration ./apps/web-orchestration
COPY tsconfig.json ./

# Build the application
WORKDIR /app/apps/web-orchestration
RUN pnpm build

# Production stage
FROM node:24-alpine AS runner

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 bff

# Copy package files for production install
COPY --from=builder /app/pnpm-workspace.yaml /app/pnpm-lock.yaml /app/package.json ./
COPY --from=builder /app/apps/web-orchestration/package.json ./apps/web-orchestration/

# Install production dependencies only
RUN pnpm install --frozen-lockfile --prod

# Copy built application
COPY --from=builder --chown=bff:nodejs /app/apps/web-orchestration/dist ./apps/web-orchestration/dist

USER bff

EXPOSE 4000

ENV PORT=4000
ENV NODE_ENV=production

CMD ["node", "apps/web-orchestration/dist/index.js"]
