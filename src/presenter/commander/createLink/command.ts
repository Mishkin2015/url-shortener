import Config from '../utils/Config';

interface Opts {
  readonly clientId: string;
  readonly longUrl: string;
  readonly shortUrl: string;
}

export default (config: Config) => {
  return async ({ clientId, longUrl, shortUrl }: Opts) => {
    await config.service.createLink({ clientId, longUrl, shortUrl });
    config.logger.info('Successfully created link');
  };
};
