FROM gcr.io/distroless/nodejs22-debian12@sha256:e36aabe0394465699ebdb68544f6f3b618a654af85f6fa1b55e8fc4e567b3250

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app

COPY dist dist/
COPY server server/

EXPOSE 8080
CMD ["server/dist/index.js"]
