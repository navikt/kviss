FROM gcr.io/distroless/nodejs22-debian12@sha256:8d54996fc549a9f6d8af41e0540ecf7ee75f31189e788a738cfcbf2f58903404

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app

COPY dist dist/
COPY server server/

EXPOSE 8080
CMD ["server/dist/index.js"]
