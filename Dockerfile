FROM node:lts-bookworm as base

FROM base as builder

WORKDIR /app

RUN yarn global add turbo

COPY . .

RUN turbo prune --scope=@dload/aria --scope=@dload/server --scope=@dload/client --docker --out-dir=out

FROM base as installer

WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/yarn.lock ./yarn.lock
COPY --from=builder /app/out/json/ .
RUN yarn install

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN yarn clean

RUN yarn build

FROM base AS runner

WORKDIR /app

RUN apt update && DEBIAN_FRONTEND=noninteractive apt install -y --no-install-recommends nginx

COPY --from=installer /app .
COPY --from=installer /app/apps/client/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

CMD nginx && yarn start
