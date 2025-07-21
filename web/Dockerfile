FROM gcr.io/distroless/nodejs22-debian12@sha256:b765815eafacee5222bfa50179028f41dd8c642b68ad68ec4e6922d3b1ff2710

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app

COPY dist dist/
COPY server server/

EXPOSE 8080
CMD ["server/dist/index.js"]
