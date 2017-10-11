FROM node:8@sha256:a8f7411582dd13c0f3cb2b168e89bc8ab2772553665b8269ba275cadaca38bdb
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist
COPY bin bin
RUN npm link

EXPOSE 80
CMD ["npm", "start"]
