import { config } from 'dotenv';
config();

import getBooleanOption from 'jscommons/dist/config/getBooleanOption';
import getNumberOption from 'jscommons/dist/config/getNumberOption';
import getStringOption from 'jscommons/dist/config/getStringOption';
import * as os from 'os';

const DEFAULT_EXPRESS_PORT = 80;
const DEFAULT_KNEX_PORT = 3306;

const storageDir = `${process.cwd()}/storage`;
const accessLogsDir = `${storageDir}/accessLogs`;

export default {
  express: {
    bodyParserLimit: getStringOption(process.env.EXPRESS_BODY_PARSER_LIMIT, '5mb'),
    morganDirectory: getStringOption(process.env.EXPRESS_MORGAN_DIRECTORY, accessLogsDir),
    port: getNumberOption(process.env.EXPRESS_PORT, DEFAULT_EXPRESS_PORT),
  },
  lang: getStringOption(process.env.LANG, 'en'),
  repo: {
    knex: {
      client: getStringOption(process.env.KNEX_CLIENT, 'mysql'),
      connection: {
        database: getStringOption(process.env.KNEX_DATABASE, 'urlshortener'),
        host: getStringOption(process.env.KNEX_HOST, '127.0.0.1'),
        password: getStringOption(process.env.KNEX_PASSWORD, 'pword'),
        port: getNumberOption(process.env.KNEX_PORT, DEFAULT_KNEX_PORT),
        user: getStringOption(process.env.KNEX_USER, 'urlshortener'),
      },
    },
    lrsRepoName: getStringOption(process.env.LRS_REPO, 'fetch'),
    modelsRepoName: getStringOption(process.env.MODELS_REPO, 'knex'),
  },
  winston: {
    cloudWatch: {
      awsConfig: {
        accessKeyId: getStringOption(process.env.WINSTON_CLOUDWATCH_ACCESS_KEY_ID),
        region: getStringOption(process.env.WINSTON_CLOUDWATCH_REGION),
        secretAccessKey: getStringOption(process.env.WINSTON_CLOUDWATCH_SECRET_ACCESS_KEY),
      },
      enabled: getBooleanOption(process.env.WINSTON_CLOUDWATCH_ENABLED, false),
      level: getStringOption(process.env.WINSTON_CLOUDWATCH_LEVEL, 'info'),
      logGroupName: getStringOption(process.env.WINSTON_CLOUDWATCH_LOG_GROUP_NAME, 'xapi-state'),
      logStreamName: getStringOption(process.env.WINSTON_CLOUDWATCH_LOG_STREAM_NAME, os.hostname()),
    },
    console: {
      level: getStringOption(process.env.WINSTON_CONSOLE_LEVEL, 'info'),
    },
  },
};
