FROM gcr.io/distroless/nodejs22-debian12@sha256:b0df7917d86c254e76d0855775679d9ee4ec7c307503259d92f431b618393a4d

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app

COPY dist dist/
COPY server server/

EXPOSE 8080
CMD ["server/dist/index.js"]
