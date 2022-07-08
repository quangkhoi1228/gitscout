import Json from './Json';

export default interface ApiResponse {
  code: number;
  data: Json[];
  message?: string;
  meta: { count: number; size: number; totalPage: number; page: number };
  transactionTime?: string;
}
