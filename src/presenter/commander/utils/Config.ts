import { CommanderStatic } from 'commander';
import { LoggerInstance } from 'winston';
import Service from '../../../service/utils/Service';

interface Config {
  readonly service: Service;
  readonly commander: CommanderStatic;
  readonly logger: LoggerInstance;
}

export default Config;
