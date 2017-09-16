import createClient from './createClient/command';
import createLink from './createLink/command';
import Config from './utils/Config';

export default (config: Config) => {
  config.commander
    .command('create-link <shortUrl> <longUrl> <clientId>')
    .alias('cl')
    .description('Creates a short link')
    .action(async (shortUrl, longUrl, clientId) => {
      await createLink(config)({ shortUrl, longUrl, clientId });
      process.exit();
    });

  config.commander
    .command('create-client <name> <lrsEndpoint> <lrsKey> <lrsSecret>')
    .alias('cc')
    .description('Creates a client')
    .action(async (name, lrsEndpoint, lrsKey, lrsSecret) => {
      await createClient(config)({ lrsEndpoint, lrsKey, lrsSecret, name });
      process.exit();
    });

  return config.commander;
};
