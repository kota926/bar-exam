FROM node:16.13.1-alpine3.14

WORKDIR /node

RUN apk update

COPY ./api/package*.json ./

RUN npm install

EXPOSE 8080

CMD npm run dev