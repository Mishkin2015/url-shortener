import Config from '../utils/KnexConfig';
import Signature from './Signature';

export default (config: Config): Signature => {
  return async (opts) => {
    await config.db('links').insert([opts], 'id');
  };
};
