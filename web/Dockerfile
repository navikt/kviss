FROM gcr.io/distroless/nodejs22-debian12@sha256:0e04a0b2aba2cf0d007e260f82edb146cff6cd34bd13b213a203f8092a7218ae

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app
COPY dist dist/
COPY server server/

WORKDIR server
EXPOSE 8080
CMD ["dist/index.js"]