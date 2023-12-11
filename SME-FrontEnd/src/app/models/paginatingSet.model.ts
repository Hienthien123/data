export interface PaginatingSetModel<T>{
    page: number;
    totalCount: number;
    totalPage: number;
    items: T[];
    count: number;
}