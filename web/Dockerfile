FROM node:22-alpine@sha256:a8fcab85f4420cd3cc2f872e99cdfb4dd6ad4d36b5fc737b8c8a630432bb4cd9

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app

COPY dist dist/
COPY server server/

WORKDIR server

EXPOSE 8080

CMD ["npm", "run", "start"]
