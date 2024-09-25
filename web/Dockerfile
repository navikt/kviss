FROM gcr.io/distroless/nodejs22-debian12@sha256:d7ccebdf7617f225aa511c4a0e9c3bff2a8a65b22f8032ca982193d5a52c8ee9

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app
COPY dist dist/
COPY server server/

WORKDIR server
EXPOSE 8080
CMD ["dist/index.js"]