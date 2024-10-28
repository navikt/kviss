FROM gcr.io/distroless/nodejs22-debian12@sha256:293fe0645ff801daf7a0f7c33477010a4342eb92a4b0289027f96014e68da4f7

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app
COPY dist dist/
COPY server server/

WORKDIR server
EXPOSE 8080
CMD ["dist/index.js"]