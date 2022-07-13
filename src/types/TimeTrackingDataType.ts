import TimeTrackingResponse from './TimeTrackingResponse';

export interface TimeTrackingDataType {
  startDate: string;
  endDate: string;
  loading?: boolean;
  value: TimeTrackingResponse;
  detail?: { [project: string]: TimeTrackingResponse };
}
