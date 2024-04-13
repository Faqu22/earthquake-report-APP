FROM node:20-alpine

WORKDIR /app

VOLUME /app

COPY package*.json ./

RUN npm install

COPY . . 

ENV PORT=8000

EXPOSE $PORT