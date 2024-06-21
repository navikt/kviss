FROM node:22-alpine@sha256:546ca3e666432a162c1065a58ae7a2e50a18b15e2759a6dfe52bbeaeec0f555c

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app

COPY dist dist/
COPY server server/

WORKDIR server

EXPOSE 8080

CMD ["npm", "run", "start"]
