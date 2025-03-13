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

export interface AuthTokensResponseDto {
  accessToken: IAccessToken;
  refreshToken: string;
  expiresIn: string;
}
