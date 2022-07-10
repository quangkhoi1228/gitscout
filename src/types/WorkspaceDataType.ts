import { CompanyDataType } from './CompanyDataType';

export interface WorkspaceDataType {
  count: number;
  current_page: number;
  data: CompanyDataType[];
  per_page: number;
  total: number;
  total_pages: number;
}
