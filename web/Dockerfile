FROM node:22-alpine@sha256:609a983bfbc262ec900efca2d7e2df721065a264a8c7aa288a8383531e47dc8c

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app

COPY dist dist/
COPY server server/

WORKDIR server

EXPOSE 8080

CMD ["npm", "run", "start"]
