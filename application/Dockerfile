FROM node:22-alpine3.19

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

COPY --chown=node:node . .

RUN npm install

EXPOSE 3033
CMD [ "node", "index.js" ]