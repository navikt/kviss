FROM node:22-alpine@sha256:1e847ddc61d073787aaca688e2a6568d77688b4eae561c806efeb39617caa53f

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app

COPY dist dist/
COPY server server/

WORKDIR server

EXPOSE 8080

CMD ["npm", "run", "start"]
