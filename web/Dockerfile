FROM gcr.io/distroless/nodejs22-debian12@sha256:7014cf59f23b79ae45e99a9e1c6556a8f0017ef24c5e44a482ff3e1f9c2de5ca

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app
COPY dist dist/
COPY server server/

WORKDIR server
EXPOSE 8080
CMD ["dist/index.js"]