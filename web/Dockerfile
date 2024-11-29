FROM gcr.io/distroless/nodejs22-debian12@sha256:d2bf966afe785153974fdd2663c7181dbfdf407d229b5df4adef185ca134da04

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app
COPY dist dist/
COPY server server/

WORKDIR server
EXPOSE 8080
CMD ["dist/index.js"]