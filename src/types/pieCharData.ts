export const statsData = {
  employeecount: 0,
  violatorscount: 0,
  publicrepocount: 0,
  publicgistcount: 0
};
export interface IStatsData {
  id?: string;
  employeecount: number;
  violatorscount: number;
  publicrepocount: number;
  publicgistcount: number;
}
export interface IPieChartData {
  type: string;
  value: number;
}
