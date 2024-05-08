FROM node:20-alpine@sha256:fac6f741d51194c175c517f66bc3125588313327ad7e0ecd673e161e4fa807f3

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app

COPY dist dist/
COPY server server/

WORKDIR server

EXPOSE 8080

CMD ["npm", "run", "start"]
