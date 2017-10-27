FROM node:8@sha256:7cb612f0f8398069f48973269feb07adc9f0563424460918fb80af71d07e08e4
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
