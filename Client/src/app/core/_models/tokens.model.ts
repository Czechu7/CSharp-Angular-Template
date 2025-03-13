export interface ITokens {
  accessToken: IAccessToken;
  refreshToken: IRefreshToken;
}

export type IAccessToken = string;
export interface IRefreshToken {
  refreshToken: string;
  expiresAt: string;
}
