export interface IAltchaStatus {
  state: 'unverified' | 'verifying' | 'verified' | 'error';
  payload: string;
}
