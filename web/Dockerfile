FROM gcr.io/distroless/nodejs22-debian12@sha256:5bbfaef4976723a9574efdeea941ca4f2a30b271a8b9ad6a1036dbaae68f855d

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app

COPY dist dist/
COPY server server/

EXPOSE 8080
CMD ["server/dist/index.js"]
