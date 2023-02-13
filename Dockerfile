FROM node:19-alpine3.15 as dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install

FROM node:19-alpine3.15 as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:19-alpine3.15 as prod
EXPOSE 3000
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
CMD [ "node","build/index.js"]