import { ClassModel } from "./class.model";
import { StudentModel } from "./student.model";

export interface tuitionTransaction {
    id: number,
    studentId: number,
   // student: StudentModel,
    classId: number,
   // class: ClassModel,
    classMonth: number,
    classYear: number,
    note: string,
    amountOfMoney: number,
    transactionType: string,
    transactionCardNumber: string,
    transactionCardBrand: string,
    transactionBankCustomer: string,
    transactionDate: Date,
       
}