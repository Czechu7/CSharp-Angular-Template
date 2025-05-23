export interface ILog {
  id: string;
  timestamp: string;
  userId: string;
  ipAddress: string;
  action: string;
  resource: string;
  resourceId: string;
  result: string;
  statusCode: number;
  message: string;
  additionalData: string;
}

export interface IErrorLog {
  id: string;
  timestamp: string;
  userId: string;
  context: string;
  exceptionType: string;
  exceptionMessage: string;
  stackTrace: string;
}

export type LogType = ILog | IErrorLog;

export function isErrorLog(log: LogType): log is IErrorLog {
  return (
    log &&
    'exceptionType' in log &&
    'stackTrace' in log &&
    !('action' in log) &&
    !('resource' in log)
  );
}
