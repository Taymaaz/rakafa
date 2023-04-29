export interface baseFilterResult<T> {
  entityCount: number;
  currentPage: number;
  pageCount: number;
  startPage: number;
  endPage: number;
  take: number;
  has_next: boolean;
  has_previous: boolean;
  data: T[];
}
