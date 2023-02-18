export interface IYearlyVoilatorsType {
  years: string;
  public_repos_count: string;
  public_gist_count: string;
  violators_count: string;
  violations_count: string;
}
export interface IMonthlyVoilatorsType {
  months: string;
  years: string;
  public_repo_count: string;
  public_gist_count: string;
  violators_count: string;
  violatons_count: string;
}

// export interface IVoilatorsAndVoilationsFixedType {
//   Year: string;
//   publicrepocount: string;
//   publicgistcount: string;
//   violatorscount: string;
//   prevyear_gistscount: string;
//   prevyear_repocount: string;
//   prevyear_violatorscount: string;
//   violationscount: string;
//   prevyearviolationcount: string;
//   totalviolationadded: string;
//   totalviolationfixed: string;
//   totalviolatorsfixed: string;
//   totalviolatorsadded: string;
// }
export interface IVoilatorsAndVoilationsFixedType {
  max_violations_count: string;
  max_violators_count: string;
  total_violations_added: string;
  total_violations_fixed: string;
  total_violators_added: string;
  total_violators_fixed: string;
  violations_count: string;
  violators_count: string;
  years: string;
}
// export const initialVoilatorsAndVoilationsFixedData = {
//   Year: String(new Date().getFullYear()),
//   publicrepocount: '0',
//   publicgistcount: '0',
//   violatorscount: '0',
//   prevyear_gistscount: '0',
//   prevyear_repocount: '0',
//   prevyear_violatorscount: '0',
//   violationscount: '0',
//   prevyearviolationcount: '0',
//   totalviolationadded: '0',
//   totalviolationfixed: '0',
//   totalviolatorsfixed: '0',
//   totalviolatorsadded: '0'
// };
export const initialVoilatorsAndVoilationsFixedData = {
  max_violations_count: '0',
  max_violators_count: '0',
  total_violations_added: '0',
  total_violations_fixed: '0',
  total_violators_added: '0',
  total_violators_fixed: '0',
  violations_count: '0',
  violators_count: '0',
  years: String(new Date().getFullYear())
};
