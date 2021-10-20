export default interface PaginatedData<T> {
  items: T[];
  _meta: {
    page: number;
    per_page: number;
    total_pages: number;
    total_items: number;
  };
  _links: {
    self: string;
    next: string;
    prev: string;
  };
}

export interface PaginationArguments {
  page: number;
}
