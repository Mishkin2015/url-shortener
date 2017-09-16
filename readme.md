# xAPI URL Shortener
> A server for xAPI URL shortener

[![Build Status](https://travis-ci.org/LearningLocker/url-shortener.svg?branch=master)](https://travis-ci.org/LearningLocker/url-shortener)
[![Greenkeeper badge](https://badges.greenkeeper.io/LearningLocker/url-shortener.svg)](https://greenkeeper.io/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Join the chat at https://gitter.im/LearningLocker/learninglocker](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/LearningLocker/learninglocker?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)


### Installation
1. Clone the repository `git clone git@github.com:LearningLocker/url-shortener.git`.
1. Install dependencies `npm install`.
1. Build the code `npm run build`.
1. Run migrations `npm run migrate`.
1. Start the server `npm start`.

### Development
1. Follow [the installation procedure](#installation).
1. Make your changes to the "src" directory.
1. Build the code `npm run build`.
1. Test the code `npm test`.
1. Run the server `npm start`.
1. Use the CLI `npm link` and `xus --help`.

### Docker
You can use the steps below to install and run the xAPI URL Shortener.

- Create a ".env" file using the ".env.example" file in this Github repository.
- Pull the image from DockerHub `docker pull learninglocker/url-shortener:master`.
- Run the image in a container `docker run -d -p 8080:80 --name xus --env-file .env learninglocker/url-shortener:master`.

To use the CLI you can use the steps below.

- Enter the container `docker exec -it xus bash`.
- Use the CLI `xus --help`.
