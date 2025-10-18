FROM node:24-alpine AS build

WORKDIR /app

RUN corepack enable && corepack prepare yarn@4.3.0 --activate

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:24-alpine

WORKDIR /app

RUN corepack enable && corepack prepare yarn@4.3.0 --activate

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=true

COPY --from=build /app/dist ./dist
COPY --from=build /app/.env.production .env

ENV NODE_ENV=production
EXPOSE 5002

USER appuser

CMD ["node", "dist/app.js"]
