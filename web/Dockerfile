FROM node:20-alpine

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app

COPY dist dist/
COPY server server/

WORKDIR server

EXPOSE 8080

CMD ["npm", "run", "start"]
