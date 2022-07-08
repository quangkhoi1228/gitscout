import Json from './Json';

export class DataPaginationEmpty {
  data: Json[];
  meta: { count: number; size: number; totalPage: number; page: number };
  constructor() {
    this.data = [];
    this.meta = { count: 0, size: 0, totalPage: 0, page: 0 };
  }
}

export default interface DataPagination {
  data: Json[];
  meta: { count: number; size: number; totalPage: number; page: number };
}
