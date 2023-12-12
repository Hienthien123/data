
import { PaginatingQueryModel } from "./paginating-query.model";
import { QueryModel } from "./queries.model";

export interface StudentQueryModel {
    organizationId?: number;
    fullName?: string;
    doBFrom?: Date;
    doBTo?: Date;
    registerFrom?: Date;
    registerTo?: Date;
    provinceId?: number;
    districtId?: number;
    wardId?: number;
}