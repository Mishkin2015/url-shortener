export default interface Config {
  readonly knex: {
    readonly client: string;
    readonly connection: {
      readonly database: string;
      readonly host: string;
      readonly password: string;
      readonly port: number;
      readonly user: string;
    };
  };
  readonly lrsRepoName: string;
  readonly modelsRepoName: string;
}
