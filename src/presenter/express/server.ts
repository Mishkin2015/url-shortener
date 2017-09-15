import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import * as express from 'express';
import translator from 'jscommons/dist/translatorFactory/en';
import repoFacade from '../../repo/facade';
import serviceFacade from '../../service/facade';
import config from '../../utils/config';
import logger from '../../utils/logger';
import presenterFacade from './facade';

const app = express();

const handleExit = (event: string) => {
  return (error?: any) => {
    if (error !== undefined) {
      logger.error(error.stack);
    }
    logger.info(event);
    process.exit();
  };
};

const repo = repoFacade({
  knex: config.repo.knex,
  lrsRepoName: config.repo.lrsRepoName,
  modelsRepoName: config.repo.modelsRepoName,
});
const service = serviceFacade({
  logger,
  repo,
});
const presenter = presenterFacade({
  bodyParserLimit: config.express.bodyParserLimit,
  customRoute: '/status',
  customRouteText: 'ok',
  logger,
  morganDirectory: config.express.morganDirectory,
  service,
  translator,
});
app.use(presenter);

app.listen(config.express.port, () => {
  logger.info(`Listening on port ${config.express.port}`);
  if (process.send !== undefined) {
    logger.info('Process ready');
    process.send('ready');
  }
  process.on('exit', handleExit('exit'));
  process.on('SIGINT', handleExit('SIGINT'));
  process.on('SIGTERM', handleExit('SIGTERM'));
  process.on('uncaughtException', handleExit('uncaughtException'));
});
