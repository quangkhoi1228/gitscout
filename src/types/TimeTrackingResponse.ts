export interface TimeTrackingDataItem {
  time: { seconds: number; formatted: string };

  user: {
    name: string;
    username: string;
    avatar: string;
    confirmed: true;
    headline: string;
    link: true;
  };
}

export interface TimeTrackingResume {
  period_end: string;
  period_start: string;
  time_total: number;
  worked_hours: string;
}

export default interface TimeTrackingResponse {
  data: TimeTrackingDataItem[];
  resume: TimeTrackingResume;
}
