import Config from '../utils/Config';
import Signature from './Signature';

export default (config: Config): Signature => {
  return async (opts) => {
    return config.repo.createLink(opts);
  };
};
