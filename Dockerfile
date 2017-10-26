FROM node:8@sha256:4de59fca8c16a9a10fddc5df69c5e22f8a5695b1275d8e33f58a87e6bb6b3a8d
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
