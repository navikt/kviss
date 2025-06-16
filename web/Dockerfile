FROM gcr.io/distroless/nodejs22-debian12@sha256:3bbb76acb752a4ed1275fd337d005e37cd35706a4f97f916ee1d65a30b486915

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app

COPY dist dist/
COPY server server/

EXPOSE 8080
CMD ["server/dist/index.js"]
