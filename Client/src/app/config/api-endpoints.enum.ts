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
}
