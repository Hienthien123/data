export interface PaginatingQueryModel {
  pageNumber?: number;
  pageSize?: number;
  sortOrder?: number;
}
export interface EmployeeQueryModel extends PaginatingQueryModel {
  organizationId?: number;
  fullName?: string;
  doBFrom?: Date;
  doBTo?: Date;
  provinceId?: number;
  districtId?: number;
  wardId?: number;
}
