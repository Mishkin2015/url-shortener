import * as express from 'express';
import setupService from 'jscommons/dist/tests/utils/setupService';
import translator from 'jscommons/dist/translatorFactory/en';
import 'mocha'; // tslint:disable-line:no-import-side-effect
import * as supertest from 'supertest';
import repoFacade from '../../../repo/facade';
import serviceFacade from '../../../service/facade';
import config from '../../../utils/config';
import logger from '../../../utils/logger';
import presenterFacade from '../facade';

const app = express();

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
  customRoute: 'status',
  customRouteText: 'ok',
  logger,
  morganDirectory: config.express.morganDirectory,
  service,
  translator,
});

app.use(presenter);

const setup = setupService(service);

export default () => {
  setup();
  return { service, supertest: supertest(app) };
};
