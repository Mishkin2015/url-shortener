import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import * as commander from 'commander';
import repoFacade from '../../repo/facade';
import serviceFacade from '../../service/facade';
import config from '../../utils/config';
import logger from '../../utils/logger';
import presenterFacade from './facade';

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
  commander,
  logger,
  service,
});

presenter.parse(process.argv);

process.on('exit', handleExit('exit'));
process.on('SIGINT', handleExit('SIGINT'));
process.on('SIGTERM', handleExit('SIGTERM'));
process.on('uncaughtException', handleExit('uncaughtException'));
