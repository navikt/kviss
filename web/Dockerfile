FROM gcr.io/distroless/nodejs22-debian12@sha256:fd90468f47e91d0d3c9bc055c8c09edbf0c225c3c795d0c266e2ca94b3ba17e3

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app

COPY dist dist/
COPY server server/

EXPOSE 8080
CMD ["server/dist/index.js"]
