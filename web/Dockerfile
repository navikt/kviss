FROM gcr.io/distroless/nodejs22-debian12@sha256:f71f4b7976f952df9c72b4d2ce82e09f0f57d398a25c0c3ebd63557e973f1ee7

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app
COPY dist dist/
COPY server server/

WORKDIR server
EXPOSE 8080
CMD ["dist/index.js"]