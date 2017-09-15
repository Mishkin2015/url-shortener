import Config from '../utils/KnexConfig';
import Signature from './Signature';

export default (config: Config): Signature => {
  return async (opts) => {
    const ids = await Promise.resolve(config.db('clients').insert([opts], 'id'));

    return {
      id: ids[0].toString(),
    };
  };
};
