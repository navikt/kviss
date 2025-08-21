FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:22

ENV NODE_ENV production
ENV NPM_CONFIG_CACHE /tmp

WORKDIR /app

COPY dist dist/
COPY server server/

EXPOSE 8080
CMD ["server/dist/index.js"]
