FROM gcr.io/distroless/nodejs22-debian12@sha256:2378e6cc601c8e19364316527a7a39d3cb7bf1f45902bcad3a1fa0f7d05cb682

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app
COPY dist dist/
COPY server server/

WORKDIR server
EXPOSE 8080
CMD ["dist/index.js"]