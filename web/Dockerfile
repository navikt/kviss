FROM node:22-alpine@sha256:691f9990cad4749d7374159dab4ac0f633e4fc28c2f43d6f7cffe4ab90d3a8f9

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app

COPY dist dist/
COPY server server/

WORKDIR server

EXPOSE 8080

CMD ["npm", "run", "start"]