FROM node:lts-bookworm as base

FROM base as setup

ARG TARGETPLATFORM

RUN mkdir root-outputs

COPY docker/scripts/install-s6overlay.sh /tmp

RUN /tmp/install-s6overlay.sh "${TARGETPLATFORM}" /root-outputs

WORKDIR /app

RUN yarn global add turbo

COPY . .

RUN turbo prune --scope=@dload/aria --scope=@dload/server --scope=@dload/client --docker --out-dir=out

FROM base as installer

WORKDIR /app

COPY .gitignore .gitignore
COPY --from=setup /app/out/yarn.lock ./yarn.lock
COPY --from=setup /app/out/json/ .
RUN yarn config set registry https://registry.npmjs.org/
RUN yarn config set network-timeout 1200000
RUN yarn install

COPY --from=setup /app/out/full/ .
COPY turbo.json turbo.json

RUN yarn clean

RUN yarn build

FROM debian:bookworm AS runner

ENV \
  S6_CMD_WAIT_FOR_SERVICES_MAXTIME=0

RUN apt update && DEBIAN_FRONTEND=noninteractive apt install -y --no-install-recommends \
      ca-certificates \
      procps \
      gnupg \
      bash \
      curl \
      grep \
      git \
      nginx

RUN mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
    NODE_MAJOR=20  && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list && \
    apt update && apt install -y nodejs

COPY docker/root-fs /
COPY --from=setup /root-outputs /
COPY docker/nginx.conf /etc/nginx/nginx.conf

WORKDIR /app

COPY --from=installer /app .
COPY --from=installer /app/apps/client/dist /usr/share/nginx/html

RUN addgroup --system --gid 1000 dload
RUN adduser --system --uid 1000 dload

ENTRYPOINT [ "/init" ]
