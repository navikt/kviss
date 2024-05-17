FROM node:22-alpine@sha256:9e8f45fc08c709b1fd87baeeed487977f57585f85f3838c01747602cd85a64bb

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app

COPY dist dist/
COPY server server/

WORKDIR server

EXPOSE 8080

CMD ["npm", "run", "start"]
