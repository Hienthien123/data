export interface LocationModel{
    id: number,
    name: string;
    code: number;
    codeName: string;
    type: number;
    parentId?: number
}

export interface LocationSpecificModel{
    id?: number;
    provinceId: number;
    districtId: number;
    wardId: number;
    specificLocation: string;
}