FROM node:22-alpine@sha256:d6ae24aa6617d87813d48dbf54be14a0ba64d00f21d053288ea0bc20c47a55fd

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app

COPY dist dist/
COPY server server/

WORKDIR server

EXPOSE 8080

CMD ["npm", "run", "start"]
