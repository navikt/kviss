FROM gcr.io/distroless/nodejs22-debian12@sha256:176a1a417bd00cf01952c2854a3ff0b11bfb118ff91a7ab0b7307899df239d4e

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app

COPY dist dist/
COPY server server/

EXPOSE 8080
CMD ["server/dist/index.js"]
