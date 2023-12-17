# ---- Base Node ----
FROM node:20-alpine AS base
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

# ---- Build ----
FROM base AS build
WORKDIR /app
COPY . .
RUN yarn build

# ---- Release ----
FROM node:20-alpine AS release
WORKDIR /app
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
RUN yarn install --production

# Expose the listening port
EXPOSE 3000

# Run yarn start script
CMD ["yarn", "start"]