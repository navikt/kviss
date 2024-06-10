FROM node:22-alpine@sha256:04867ddd82db7d0691ee88947d81e32026dc993728311bba9e3ada30d1001ef3

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app

COPY dist dist/
COPY server server/

WORKDIR server

EXPOSE 8080

CMD ["npm", "run", "start"]
