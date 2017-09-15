import clearKnexRepo from 'jscommons/dist/knexRepo/clearRepo';
import migrateKnexRepo from 'jscommons/dist/knexRepo/migrate';
import rollbackKnexRepo from 'jscommons/dist/knexRepo/rollback';
import * as knex from 'knex';
import sendStatement from './lrs/sendStatement/fetch';
import FetchLrsConfig from './lrs/utils/FetchConfig';
import createClient from './models/createClient/knex';
import createLink from './models/createLink/knex';
import getClientById from './models/getClientById/knex';
import getLinkByShortUrl from './models/getLinkByShortUrl/knex';
import KnexModelsConfig from './models/utils/KnexConfig';
import Config from './utils/Config';
import Repo from './utils/Repo';

export default (config: Config): Repo => {
  const knexMigrationTableName = 'knex_migrations';
  const knexConfig: knex.Config = {
    ...config.knex,
    migrations: {
      directory: `${process.cwd()}/dist/repo/models/migrateKnex`,
      extension: 'js',
      tableName: knexMigrationTableName,
    },
  };
  const knexModelsConfig: KnexModelsConfig = {
    db: knex(knexConfig),
    migrationTableName: knexMigrationTableName,
    tableNames: ['clients', 'links'],
  };
  const fetchLrsConfig: FetchLrsConfig = {};
  return {
    clearRepo: clearKnexRepo(knexModelsConfig),
    createClient: createClient(knexModelsConfig),
    createLink: createLink(knexModelsConfig),
    getClientById: getClientById(knexModelsConfig),
    getLinkByShortUrl: getLinkByShortUrl(knexModelsConfig),
    migrate: migrateKnexRepo(knexModelsConfig),
    rollback: rollbackKnexRepo(knexModelsConfig),
    sendStatement: sendStatement(fetchLrsConfig),
  };
};
