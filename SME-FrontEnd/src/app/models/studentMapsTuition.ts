import { ClassModel } from "./class.model";
import { StudentModel } from "./student.model";
import { TuitionModel } from "./tuition.model";

export interface StudentMapsTuition{
    id: number,
    studentId: number,
    student: StudentModel,
    classId:number,
    class: ClassModel,
    tuitionId: number,
    tuition: TuitionModel,
    discountPercentage: number,
    discountAmount: number,
    Note: string,
    appliedDate: Date,
    endDate: Date,
}

