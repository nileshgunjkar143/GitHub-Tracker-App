import {urls} from './apiUrl';

import { default as axiosIntsance } from './api';
import { default as TokenService } from './token.service';

const {auth} = urls;

const login = async (username: string, password: string) => {
  try {
    const response = await axiosIntsance.post(auth.login, {
      username,
      password,
    });
    if (response.data.token) {
      TokenService.setUserToken(response.data.token);
    }
    return response;
  } catch (error) {
    Promise.reject(error);
  }
};

const signup = async (username: string, password: string) => {
  try {
    const response = await axiosIntsance.post(auth.signup, {
      username,
      password,
    });
    return response;
  } catch (error) {
    Promise.reject(error);
  }
};

const logout = () => TokenService.removeUser();

const getToken = () => TokenService.getLocalAccessToken();

const AuthService = {
  login,
  signup,
  logout,
  getToken,
};
export default AuthService;
