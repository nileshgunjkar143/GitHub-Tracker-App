import axios, {CancelTokenSource} from 'axios';
import {ScanDataType} from '../types/jobHistory';
import {IEmployee} from './../types/employee';
import axiosIntsance from './api';
import {urls} from './apiUrl';

const {
  employee: {
    endPoint,
    search,
    deleteEmp,
    employeeCount,
    voilators,
    uploadEmp,
    scanGit,
    employeeById,
    employeeMonthAndYearCountApi,
  },
} = urls;

export const getAllEmployees = async () => {
  try {
    const response = await axiosIntsance.get(endPoint);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const getEmployeeById = async (id: string) => {
  try {
    const response = await axiosIntsance.get(employeeById(id));
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addEmployee = async (employee: IEmployee) => {
  try {
    const response = await axiosIntsance.post(endPoint, employee);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

let cancelToken: CancelTokenSource;
export const getEmployeeBySearch = async (searchData: string) => {
  if (typeof cancelToken !== typeof undefined) {
    cancelToken.cancel('Operation canceled due to new request.');
  }
  //Save the cancel token for the current request
  cancelToken = axios.CancelToken.source();
  try {
    const response = await axiosIntsance.get(search(searchData), {
      cancelToken: cancelToken.token,
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteEmployee = async (employeeId: string) => {
  try {
    const response = await axiosIntsance.delete(deleteEmp(employeeId));
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getEmployeeCount = async () => {
  try {
    const response = await axiosIntsance.get(employeeCount);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllVoilators = async () => {
  try {
    const response = await axiosIntsance.get(voilators);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const uploadEmployeeData = async (employeeFile: FormData) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  try {
    const response = await axiosIntsance.post(uploadEmp, employeeFile, {
      headers: headers,
    });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const scanGithub = async (
  userId: string,
  filteredArray: ScanDataType[],
) => {
  try {
    const response = await axiosIntsance.post(scanGit(userId), filteredArray);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const employeeMonthAndYearCount = async (
  month: number,
  year: number,
) => {
  try {
    const response = await axiosIntsance.get(
      employeeMonthAndYearCountApi(month, year),
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
