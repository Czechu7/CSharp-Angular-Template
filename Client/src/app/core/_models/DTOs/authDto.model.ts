import { IAccessToken } from '../tokens.model';

export interface ILoginDto {
  email: string;
  password: string;
}

export interface IRegisterDto extends ILoginDto {
  confirmPassword: string;
  firstName: string;
  lastName: string;
  username: string;
}

export interface IAuthTokensResponseDto {
  accessToken: IAccessToken;
  refreshToken: string;
  expiresAt: string;
}

export interface IAuthRefreshTokensRequestDto {
  accessToken: string;
  refreshToken: string;
}

export interface IRevokeTokenRequestDto {
  refreshToken: string;
}
