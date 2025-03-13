export interface IDecodedToken {
  sub: string;
  unique_name: string;
  email: string;
  security_stamp: string;
  role: string;
  nbf: number;
  exp: number;
  iat: number;
  iss: string;
  aud: string;
}
