/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
export enum ApiEndpoints {
  // AUTH
  SIGN_IN = 'api/auth/login',
  SIGN_UP = 'api/auth/register',
  RESET_PASSWORD = '', // Not implemented
  CHANGE_PASSWORD = '', // Not implemented
  REFRESH_TOKEN = 'api/auth/refresh-token',
  REVOKE_TOKEN = 'api/auth/revoke-token',
  // USERS
  GET_USERS = 'api/users',
  GET_USER = 'api/users',
  // FILES
  GET_FILE = 'api/files',
  GET_FILES_LIST = 'api/files',
  SEND_FILE = 'api/files/upload',
  DOWNLOAD_FILE = 'api/files/download',
  EDIT_FILE = 'api/files',
  DELETE_FILE = 'api/files',
  GET_FILES_STATS = 'api/files/stats',
  KARMELKI = 'api/karmelki',
}
