import axiosIntsance from './api';
import { urls } from './apiUrl';

const {
  jobHistory: { endPoint }
} = urls;

export const getAllJobs = async () => {
  try {
    const response = await axiosIntsance.get(endPoint);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
