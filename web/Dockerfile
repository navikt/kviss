FROM gcr.io/distroless/nodejs22-debian12@sha256:f8a4967c040b6d189c4146e2e7219ca55cc1ade5bb9a0ea8ea6bc7fbaa18423f

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app
COPY dist dist/
COPY server server/

WORKDIR server
EXPOSE 8080
CMD ["dist/index.js"]