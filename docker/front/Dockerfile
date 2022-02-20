FROM node:16.13.1-alpine3.14

ARG BASE_URL

ENV BASE_URL=${BASE_URL}

WORKDIR /app

RUN apk update

COPY ./frontend/package*.json ./

RUN yarn install

COPY ./frontend/ ./

# RUN yarn run build

ENV HOST 0.0.0.0

EXPOSE 3000

# CMD ["yarn", "start"]

CMD [ "yarn", "dev" ]