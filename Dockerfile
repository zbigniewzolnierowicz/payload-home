FROM node:20 as base

LABEL org.opencontainers.image.source https://github.com/zbigniewzolnierowicz/payload-home
RUN npm install -g pnpm

FROM base as builder

WORKDIR /app
COPY package*.json ./ 
COPY pnpm-lock.yaml ./

COPY . .
RUN pnpm install
RUN pnpm build

FROM base as runtime

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js

WORKDIR /app
COPY package*.json ./ 
COPY pnpm-lock.yaml ./

RUN pnpm install --production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/build ./build

EXPOSE 3000

CMD ["node", "dist/server.js"]
