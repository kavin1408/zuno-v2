# Production Stage
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY package.json package-lock.json* ./
RUN npm install --production

COPY . .

# Build the application
RUN npm run build

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]
