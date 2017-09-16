import Config from '../utils/Config';

interface Opts {
  readonly lrsEndpoint: string;
  readonly lrsKey: string;
  readonly lrsSecret: string;
  readonly name: string;
}

export default (config: Config) => {
  return async ({ lrsEndpoint, lrsKey, lrsSecret, name }: Opts) => {
    const { id } = await config.service.createClient({ lrsEndpoint, lrsKey, lrsSecret, name });
    config.logger.info(`Successfully created client "${id}"`);
  };
};
