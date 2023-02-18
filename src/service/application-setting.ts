import { ISettingsData } from '../types/settings';
import axiosIntsance from './api';
import { urls } from './apiUrl';

const {
  applicationSettings: { endPoint }
} = urls;

export const addApplicationSettingData = async (data: ISettingsData) => {
  try {
    const response = await axiosIntsance.post(endPoint, data);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};
