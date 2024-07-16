FROM cgr.dev/chainguard/node:latest

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app

COPY dist dist/
COPY server server/

EXPOSE 8080

RUN npm ci --production

CMD ["/app/server/server.js"]
