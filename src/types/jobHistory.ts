export interface JobHistoryType {
  id: string;
  job: string;
  date: string;
  status: string;
  userId: string;
  job_type: string;
  triggered_by: string;
}

export interface ScanDataType {
  github_username?: string;
  id?: string;
}

