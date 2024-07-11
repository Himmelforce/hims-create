ARG NODE_VERSION

FROM node:${NODE_VERSION}-alpine

RUN apk --no-cache add curl

WORKDIR /usr/src/app

COPY package.json .

RUN yarn install

COPY . .

ARG FRONTEND_SERVICE_PORT

EXPOSE ${FRONTEND_SERVICE_PORT}

CMD ["npm", "run", "dev"]