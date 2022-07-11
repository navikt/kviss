FROM node:14.17.0

WORKDIR /app

COPY package.json .

RUN yarn

RUN yarn build

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]