FROM node:16 as ts-compiler 

WORKDIR /usr/src/app

COPY package*.json ./

COPY tsconfig*.json ./

RUN npm install

COPY . ./

RUN npm run build

FROM node:16-alpine as ts-remover

WORKDIR /usr/src/app

COPY --from=ts-compiler /usr/src/app/package*.json ./

COPY --from=ts-compiler /usr/src/app/dist ./

RUN npm install --only=production

FROM node:16-alpine

WORKDIR /usr/src/app

COPY --from=ts-remover /usr/src/app ./

USER node

ENV SECRET=token

CMD ["node","index.js"]