import { LoggerInstance } from 'winston';
import Repo from '../../repo/utils/Repo';

export default interface Config {
  readonly repo: Repo;
  readonly logger: LoggerInstance;
}
