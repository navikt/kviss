FROM gcr.io/distroless/nodejs22-debian12@sha256:d80163bac77c543a02d32d812a598ca6e43c2e989bd5e4e8806b0aecbafd9a2a

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app
COPY dist dist/
COPY server server/

WORKDIR server
EXPOSE 8080
CMD ["dist/index.js"]