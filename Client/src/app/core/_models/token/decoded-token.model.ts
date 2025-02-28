export interface DecodedToken {
  sub: string;
  name: string;
  iat: number;
  exp: number;
  roles: string[];
}
