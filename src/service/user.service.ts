import { IUserType } from './../types/user';
import axiosIntsance from './api';
import { urls } from './apiUrl';
const {
  users: { profile, individualProfile }
} = urls;

export const getUserProfiles = async () => {
  try {
    const response = await axiosIntsance.get(profile);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const getIndividualProfile = async () => {
  try {
    const response = await axiosIntsance.get(individualProfile);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const addUserProfile = async (data: IUserType) => {
  try {
    const response = await axiosIntsance.post(individualProfile, data);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};
