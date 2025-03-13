export interface IDecodedToken {
  sub: string;
  name: string;
  iat: number;
  exp: number;
  roles: string[];
}
