FROM node:14.17.0

ENV API_URL=https://kviss-api.dev.nav.no
ENV WS_URL=ws://kviss-api.dev.nav.no

COPY . .

RUN yarn

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]