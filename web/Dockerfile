FROM node:22-alpine@sha256:ba898e86c2cc720c8cf2ae05f8d2d4697fe0c8ca3e920d6fbf14a6cbf50bb9ca

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app

COPY dist dist/
COPY server server/

WORKDIR server

EXPOSE 8080

CMD ["npm", "run", "start"]