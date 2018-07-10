FROM node:8.11.3-alpine

WORKDIR /usr/src/app/

COPY package.json /usr/src/app/

RUN npm install

COPY . /usr/src/app/

EXPOSE 2106

CMD [ "npm", "start" ]