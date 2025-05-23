import { LogType } from '../../core/_models/log.model';

export interface ILogItemProps {
  log: LogType;
  isError: boolean;
}
