export interface LoginModel {
  email: string;
  password: string;
}

export interface RegisterModel extends LoginModel {
  confirmPassword: string;
  firstName: string;
  lastName: string;
  username: string;
}
