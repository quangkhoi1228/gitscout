import { LogTimeTrackingItemDataType } from './LogTimeTrackingItemDataType';

export interface LogTimeTrackingDataType {
  count: number;
  current_page: number;
  data: { data: LogTimeTrackingItemDataType[] };

  resume: any;
  stats: any;

  per_page: number;
  total: number;
  total_pages: number;
}
