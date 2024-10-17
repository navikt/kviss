FROM gcr.io/distroless/nodejs22-debian12@sha256:6de83aa27d8cad62d2c429ab546512616f34c9a3da629e4af8d6ba12174e45ac

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app
COPY dist dist/
COPY server server/

WORKDIR server
EXPOSE 8080
CMD ["dist/index.js"]