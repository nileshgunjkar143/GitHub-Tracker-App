export const baseUrl = process.env.REACT_APP_BASE_URL;
export const urls = {
  auth: {
    login: '/auth/signin',
    signup: '/auth/signup',
  },
  employee: {
    endPoint: '/employee',
    search: (searchData: string) => `/employee?search=${searchData}`,
    deleteEmp: (employeeId: string) => `/employee/${employeeId}`,
    employeeCount: '/employee/search/employeecount',
    voilators: 'employee/search/violatorsList',
    uploadEmp: 'employee/uploadcsv',
    // scanGit: (userId: string) => `/employee/search/scangit/${userId}`,
    scanGit: (userId: string) => `/employee/search/filteredScan/${userId}`,
    employeeById: (id: string) => `employee/${id}`,
    employeeMonthAndYearCountApi: (month: number, year: number) =>
    `/employee/search/monthlyemployeecount/${month}/${year}`,
  },
  employeeGithubHistory: {
    endPoint: '/employee-github-history',
    voilatorsByMonth: (year: number) =>
      `employee-github-history/dashboard/violators/monthly/${year}`,
    voilatorsTillYear: (year: number) =>
      `/employee-github-history/dashboard/violators/yearly/${year}`,
    voilatorsAndVoilationFixes: (fromYear: string, toYear: string) =>
      `employee-github-history/dashboard/violatorsFixed/yearly/${fromYear}/${toYear}`,
    empHistoryByEmpId: (id: string) => `employee/${id}/employee-github-history`,
  },
  jobHistory: {
    endPoint: '/job-queue',
  },
  applicationSettings: {
    endPoint: '/application-setting',
  },
  users: {
    userByName: (userName: string) => `/users/${userName}`,
    profile: '/user-profile',
    individualProfile: '/user/profile',
  },
};
