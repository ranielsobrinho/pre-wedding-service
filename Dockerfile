FROM node:24-alpine AS build

WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:24-alpine

WORKDIR /app

RUN corepack enable

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production && yarn cache clean

COPY --from=build /app/dist ./dist
COPY --from=build /app/.env.production .env

RUN chown -R appuser:appgroup /app

ENV NODE_ENV=production
EXPOSE 5002

USER appuser

CMD ["node", "dist/app.js"]
