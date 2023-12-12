export interface GradeModel {
    id: number,
    name: string,
    code: string,
    isSeniorGrade : boolean,
    organizationId?: number
}