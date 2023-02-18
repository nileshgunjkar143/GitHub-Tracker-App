import {themeType} from './context';

export interface IEmployee {
  id?: string;
  github_username: string;
  employeeName: string;
  officeEmail: string;
  public_repos?: number;
  public_gists?: number;
  avatar_url?: string;
  html_url?: string;
  followers?: number;
  following?: number;
  public_repos_details?: any[];
  public_gists_details?: any[];
  checked?: boolean;
}
export interface IEmployeeMonthlyAndYearlyCount {
  employee_monthly_count: string;
  employee_yearly_count: string;
  total_employee_count: string;
}
export const employeeMontlyAndYearlyInitialData = {
  employee_monthly_count: '',
  employee_yearly_count: '',
  total_employee_count: '',
};

export interface ScanEmpPropType {
  employees: IEmployee[];
  handleSubmitSearch: () => void;
  clearFilter: () => void;
  handleCheckBoxChange: any;
  handleSearchChange: any;
  scanGitManually: () => void;
  theme: themeType;
  searchValue: string | undefined;
  setSearchValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}
