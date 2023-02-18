export const frequency = [
  {
    value: 'MONTHLY',
    option: 'Month',
  },
  {
    value: 'WEEKLY',
    option: 'Week',
  },
];

export const freq = {
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
};

export const scope = {
  application: 'application',
  user: 'user',
};

export const settingKeyAndValues = {
  SUMMARY_EMAIL_JOB_FREQUENCY: 'SUMMARY_EMAIL_JOB_FREQUENCY',
  SUMMARY_EMAIL_SCHEDULE_DAY_OF_MONTH: 'SUMMARY_EMAIL_SCHEDULE_DAY_OF_MONTH',
  SUMMARY_EMAIL_SCHEDULE_DAY_OF_WEEK: 'SUMMARY_EMAIL_SCHEDULE_DAY_OF_WEEK',
  GITHUB_JOB_FREQUENCY: 'GITHUB_JOB_FREQUENCY',
  GITHUB_JOB_SCHEDULE_DAY_OF_MONTH: 'GITHUB_JOB_SCHEDULE_DAY_OF_MONTH',
  GITHUB_JOB_SCHEDULE_DAY_OF_WEEK: 'GITHUB_JOB_SCHEDULE_DAY_OF_WEEK',
};

export const weekData = [
  {
    value: '1',
    option: 'Monday',
  },
  {
    value: '2',
    option: 'Tuesday',
  },
  {
    value: '3',
    option: 'Wednesday',
  },
  {
    value: '4',
    option: 'Thursday',
  },
  {
    value: '5',
    option: 'Friday',
  },
  {
    value: '6',
    option: 'Saturday',
  },
  {
    value: '7',
    option: 'Sunday',
  },
];
export const monthData = () => {
  const arr = [];
  for (let i = 1; i <= 31; i++) {
    arr.push(i);
  }
  return arr;
};
