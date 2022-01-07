FROM node:16.13.1-alpine3.14

WORKDIR /app

RUN apk update

COPY ./frontend/package*.json ./

RUN yarn install

COPY ./frontend/ ./

ENV HOST 0.0.0.0

EXPOSE 3000

CMD yarn dev