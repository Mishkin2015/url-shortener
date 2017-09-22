import * as iplocation from 'iplocation';
import { defaultTo } from 'ramda';
import Config from '../utils/Config';
import Signature from './Signature';

const HOME_PAGE = 'https://github.com/LearningLocker/url-shortener';

export default (config: Config): Signature => {
  return async ({ shortUrl, ipAddress, userAgent }) => {
    const { longUrl, clientId } = await config.repo.getLinkByShortUrl({ shortUrl });
    const location = await iplocation(ipAddress);
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
          [`${HOME_PAGE}/useragent/device/source`]: userAgent.device.toString(),
          [`${HOME_PAGE}/useragent/device/version`]: Number(userAgent.device.major),
          [`${HOME_PAGE}/useragent/os/family`]: userAgent.os.family,
          [`${HOME_PAGE}/useragent/os/source`]: userAgent.os.toString(),
          [`${HOME_PAGE}/useragent/os/version`]: Number(userAgent.os.major),
          [`${HOME_PAGE}/useragent/location/countryCode`]: location.country_code,
          [`${HOME_PAGE}/useragent/location/countryName`]: location.country_name,
          [`${HOME_PAGE}/useragent/location/regionCode`]: location.region_code,
          [`${HOME_PAGE}/useragent/location/regionName`]: location.region_name,
          [`${HOME_PAGE}/useragent/location/city`]: location.city,
          [`${HOME_PAGE}/useragent/location/zipCode`]: location.zip_code,
          [`${HOME_PAGE}/useragent/location/timeZone`]: location.time_zone,
          [`${HOME_PAGE}/useragent/location/latitude`]: location.latitude,
          [`${HOME_PAGE}/useragent/location/longitude`]: location.longitude,
          [`${HOME_PAGE}/useragent/location/metroCode`]: location.metro_code,
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
    /* console.log(JSON.stringify(statement, null, 2)); */
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
