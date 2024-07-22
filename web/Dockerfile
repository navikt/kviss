FROM node:22-alpine@sha256:c06bea602e410a3321622c7782eb35b0afb7899d9e28300937ebf2e521902555

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app

COPY dist dist/
COPY server server/

WORKDIR server

EXPOSE 8080

CMD ["npm", "run", "start"]