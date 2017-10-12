FROM node:8@sha256:0fb332fcdc38943b9adc929a70e7ec0b11b1194f5874a94883e4858e08e38642
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
