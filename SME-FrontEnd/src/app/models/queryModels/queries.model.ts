import { PaginatingQueryModel } from "./paginating-query.model";

export interface QueryModel{    
    filter: any;
}

export interface QueryWithPaginationModel extends QueryModel, PaginatingQueryModel{

}