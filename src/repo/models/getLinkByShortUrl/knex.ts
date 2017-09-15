import NoModel from 'jscommons/dist/errors/NoModel';
import Config from '../utils/KnexConfig';
import Signature, { Result } from './Signature';

export default (config: Config): Signature => {
  return async (opts) => {
    const result: Result|undefined = await Promise.resolve(
      config.db('links')
        .where('shortUrl', opts.shortUrl)
        .select('clientId', 'longUrl')
        .first(),
    );

    if (result === undefined) {
      throw new NoModel('link');
    }

    return result;
  };
};
