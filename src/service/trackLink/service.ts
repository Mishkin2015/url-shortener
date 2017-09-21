import { defaultTo } from 'ramda';
import Config from '../utils/Config';
import Signature from './Signature';

const HOME_PAGE = 'https://github.com/LearningLocker/url-shortener';

export default (config: Config): Signature => {
  return async ({ shortUrl, ipAddress, userAgent }) => {
    const { longUrl, clientId } = await config.repo.getLinkByShortUrl({ shortUrl });
    const statement: any = {
      actor: {
        account: {
          homePage: HOME_PAGE,
          name: defaultTo('unknown', ipAddress),
        },
      },
      context: {
        extensions: {
          [`${HOME_PAGE}/useragent/source`]: userAgent.source,
          [`${HOME_PAGE}/useragent/device/family`]: userAgent.device.family,
          [`${HOME_PAGE}/useragent/device/patch`]: userAgent.device.patch,
          [`${HOME_PAGE}/useragent/device/minor`]: userAgent.device.minor,
          [`${HOME_PAGE}/useragent/device/major`]: userAgent.device.major,
          [`${HOME_PAGE}/useragent/os/family`]: userAgent.os.family,
          [`${HOME_PAGE}/useragent/os/patch`]: userAgent.os.patch,
          [`${HOME_PAGE}/useragent/os/minor`]: userAgent.os.minor,
          [`${HOME_PAGE}/useragent/os/major`]: userAgent.os.major,
        },
      },
      object: {
        definition: {
          extensions: {
            [`${HOME_PAGE}/shortUrl`]: shortUrl,
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
