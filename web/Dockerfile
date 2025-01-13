FROM gcr.io/distroless/nodejs22-debian12@sha256:d00edbf864c5b989f1b69951a13c5c902bf369cca572de59b5ec972552848e33

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app
COPY dist dist/
COPY server server/

WORKDIR server
EXPOSE 8080
CMD ["dist/index.js"]