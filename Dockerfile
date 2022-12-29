FROM node:16

WORKDIR /usr/app

COPY package.json ./

RUN npm install

RUN npm install pm2 -g

COPY . .
