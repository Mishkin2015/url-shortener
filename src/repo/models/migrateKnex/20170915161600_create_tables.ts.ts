import * as knex from 'knex';

export const up = async (db: knex): Promise<any> => {
  await Promise.resolve(
    db.schema.createTableIfNotExists('clients', (table: knex.CreateTableBuilder) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('lrsEndpoint').notNullable();
      table.string('lrsKey').notNullable();
      table.string('lrsSecret').notNullable();
    }),
  );
  await Promise.resolve(
    db.schema.createTableIfNotExists('links', (table: knex.CreateTableBuilder) => {
      table.increments('id').primary();
      table.string('longUrl').notNullable();
      table.string('shortUrl').notNullable().unique();
      table.integer('clientId').unsigned().notNullable();
      table.foreign('clientId').references('clients.id');
    }),
  );
};

export const down = async (db: knex): Promise<any> => {
  await Promise.resolve(
    db.schema
      .raw('SET FOREIGN_KEY_CHECKS=0;')
      .dropTableIfExists('links')
      .dropTableIfExists('clients')
      .raw('SET FOREIGN_KEY_CHECKS=1;'),
  );
};
