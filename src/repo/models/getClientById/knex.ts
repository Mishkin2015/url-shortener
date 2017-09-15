import NoModel from 'jscommons/dist/errors/NoModel';
import Config from '../utils/KnexConfig';
import Signature, { Result } from './Signature';

export default (config: Config): Signature => {
  return async (opts) => {
    const result: Result|undefined = await Promise.resolve(
      config.db('clients')
        .where('id', parseInt(opts.id, 10)) // tslint:disable-line:no-magic-numbers
        .select('lrsEndpoint', 'lrsKey', 'lrsSecret')
        .first(),
    );

    if (result === undefined) {
      throw new NoModel('client');
    }

    return result;
  };
};
