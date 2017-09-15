import commonService from 'jscommons/dist/service';
import createClient from './createClient/service';
import createLink from './createLink/service';
import trackLink from './trackLink/service';
import Config from './utils/Config';
import Service from './utils/Service';

export default (config: Config): Service => {
  return {
    createClient: createClient(config),
    createLink: createLink(config),
    trackLink: trackLink(config),
    ...commonService(config),
  };
};
