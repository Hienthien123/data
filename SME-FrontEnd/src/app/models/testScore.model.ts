import { ClassModel } from "./class.model";
import { StudentModel } from "./student.model";

export interface TestScoreModel {
    id: number;
    studentId: number;
    classId: number;
    testScore: string;
    isNumber: boolean;
    weight1: number;
    weight2: number;
    weight3: number;
    weight4: number;

    student?: StudentModel;
    class?: ClassModel;
}