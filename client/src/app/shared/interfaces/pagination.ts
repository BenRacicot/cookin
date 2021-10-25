import { SortOrder } from '../enums';

export interface IScrollingQuery {
    skip?: number;
    take?: number;
}

export interface IPagination {
    page?: number;
    size?: number;
    total?: number;
    sort?: string;
    sortOrder?: SortOrder;
}

export interface IPaginationResponse<T> extends IPagination {
    items: T[];
}
