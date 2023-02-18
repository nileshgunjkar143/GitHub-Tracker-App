export interface UserType {
  username: string;
  password: string;
}

export interface SignUpdataType {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  accessToken: string;
  refreshToken: string;
}
