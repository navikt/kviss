FROM gcr.io/distroless/nodejs22-debian12@sha256:f390937d3c60a9c806068870ee3c1a01ce2ab1e75ebe0ca5e7f63beac074ccc0

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app
COPY dist dist/
COPY server server/

WORKDIR server
EXPOSE 8080
CMD ["dist/index.js"]