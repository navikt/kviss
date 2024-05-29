FROM node:22-alpine@sha256:3bb8914774985da457e08ca85654fecc062a206807d6225ede5b9b4e7465e733

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app

COPY dist dist/
COPY server server/

WORKDIR server

EXPOSE 8080

CMD ["npm", "run", "start"]
