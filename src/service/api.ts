import axios, {AxiosRequestConfig} from 'axios';
// import {baseUrl} from './apiUrl';
import TokenService from './token.service';

const axiosIntsance = axios.create({
  baseURL: 'http://192.168.1.108:5000',
});

axiosIntsance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    // console.log("sadfs")
    const token = await TokenService.getLocalAccessToken();
    // console.log(token);
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (  error: any) => Promise.reject(error),
);

axiosIntsance.interceptors.response.use(
  (  response: any) => response,
  async (error: any) => {
    // TokenService.removeUser();
    return Promise.reject(error);
  },
);

export default axiosIntsance;
