FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json yarn.lock ./

RUN npm i -g yarn && yarn install --frozen-lockfile --prod && yarn cache clean

COPY . .

RUN yarn build && yarn cache clean

FROM node:24-alpine

WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY package.json yarn.lock ./

RUN npm i -g yarn && yarn install --frozen-lockfile --prod && yarn cache clean

COPY --from=build /app/dist ./dist
COPY --from=build /app/.env.production .env

ENV NODE_ENV=production
EXPOSE 5002

USER appuser

CMD ["node", "dist/app.js"]
