import { defaultTo } from 'ramda';
import Config from '../utils/Config';
import Signature from './Signature';

export default (config: Config): Signature => {
  return async ({ shortUrl, ipAddress }) => {
    const { longUrl, clientId } = await config.repo.getLinkByShortUrl({ shortUrl });
    const statement: any = {
      actor: {
        account: {
          homePage: 'https://github.com/LearningLocker/url-shortener',
          name: defaultTo('unknown', ipAddress),
        },
      },
      object: {
        definition: {
          extensions: {
            'http://github.com/LearningLocker/url-shortener/shortUrl': shortUrl,
          },
          type: 'http://activitystrea.ms/schema/1.0/page',
        },
        id: longUrl,
      },
      verb: {
        display: { en: 'experienced' },
        id: 'http://activitystrea.ms/schema/1.0/experience',
      },
    };
    const { lrsEndpoint, lrsKey, lrsSecret } = await config.repo.getClientById({ id: clientId });
    config.repo.sendStatement({ statement, lrsEndpoint, lrsKey, lrsSecret })
      .then(() => {
        /* istanbul ignore next */
        config.logger.debug(`Sent statement for "${shortUrl}"`);
      })
      .catch((err) => {
        /* istanbul ignore next */
        config.logger.error(err);
      });
    return { longUrl };
  };
};
