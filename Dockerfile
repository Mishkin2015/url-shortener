FROM node:8@sha256:2eb63a7203600020de1831ee2e7c0111db1e637edc922bee9a8c7ae516024430
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
