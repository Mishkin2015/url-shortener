import 'mocha'; // tslint:disable-line:no-import-side-effect
import config from '../../utils/config';
import repoFacade from '../facade';

const repo = repoFacade({
  knex: config.repo.knex,
  lrsRepoName: config.repo.lrsRepoName,
  modelsRepoName: config.repo.modelsRepoName,
});

export default () => {
  beforeEach(repo.rollback);
  beforeEach(repo.migrate);
  beforeEach(repo.clearRepo);
  return { repo };
};
