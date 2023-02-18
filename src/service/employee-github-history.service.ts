// employee-github-history/dashboard/violators/monthly/1968

import axiosIntsance from './api';
import { urls } from './apiUrl';

const {
  employeeGithubHistory: {
    voilatorsByMonth,
    voilatorsTillYear,
    voilatorsAndVoilationFixes,
    empHistoryByEmpId
  }
} = urls;

export const getEmployeeGithubHistoryByEmployeeId = async (id: string) => {
  try {
    const response = await axiosIntsance.get(empHistoryByEmpId(id));
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const monthlyVoilators = async (year: number) => {
  try {
    const response = await axiosIntsance.get(voilatorsByMonth(year));
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const yearlyVoilators = async (year: number) => {
  try {
    const response = await axiosIntsance.get(voilatorsTillYear(year));
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getVoilatorsAndVoilationsFixesData = async (fromYear: string, toYear: string) => {
  try {
    const response = await axiosIntsance.get(voilatorsAndVoilationFixes(fromYear, toYear));
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
