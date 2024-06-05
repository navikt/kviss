FROM node:22-alpine@sha256:8dec302f1453d78d629291dda2a0782506c4d62691de1d13e43e287fffe4387e

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app

COPY dist dist/
COPY server server/

WORKDIR server

EXPOSE 8080

CMD ["npm", "run", "start"]
