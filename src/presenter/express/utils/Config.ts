import CommonConfig from 'jscommons/dist/expressPresenter/Config';
import Service from '../../../service/utils/Service';

interface Config extends CommonConfig {
  readonly service: Service;
}

export default Config;
