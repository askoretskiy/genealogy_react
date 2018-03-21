FROM node:9-alpine

COPY package.json yarn.lock /home/

WORKDIR /home/

RUN yarn install
