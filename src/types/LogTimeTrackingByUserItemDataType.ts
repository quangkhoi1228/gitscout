import { LogTimeTrackingItemDataType } from './LogTimeTrackingItemDataType';

export interface LogTimeTrackingByUserItemDataType {
  avatar: string;
  confirmed: boolean;
  headline: string;
  link: boolean;
  name: string;
  username: string;
  time: number;
  point: number;
  task: LogTimeTrackingItemDataType[];
}
