FROM gcr.io/distroless/nodejs22-debian12@sha256:3c90d20cfa08093504ee4795fae9e2571b605dd975b3992e1ef8ccf8b146388a

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app

COPY dist dist/
COPY server server/

EXPOSE 8080
CMD ["server/dist/index.js"]
