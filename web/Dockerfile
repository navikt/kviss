FROM node:22-alpine@sha256:94567107148ac59f1eb2ad9b7c1db03f1a1a12d28717b29eda0535aa3bd2f71e

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app

COPY dist dist/
COPY server server/

WORKDIR server

EXPOSE 8080

CMD ["npm", "run", "start"]
