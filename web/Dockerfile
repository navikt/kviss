FROM gcr.io/distroless/nodejs22-debian12@sha256:ee4a35606ca4f0d4d9d376cb18a3e330dd84ebebf30215cd29e867b2bcd12132

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app

COPY dist dist/
COPY server server/

EXPOSE 8080
CMD ["server/dist/index.js"]
