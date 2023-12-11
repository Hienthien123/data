import { EGenders } from "./enums/genders.enum";
import { LocationSpecificModel } from "./location.model";

export interface StudentModel{
    id: number,
    fullName: string;
    code: string;
    lastName: string;
    firstName: string;
    gender: EGenders,
    dateOfBirth: Date;
    addressId?: number;
    address?: LocationSpecificModel;
    addressString?: string;
    email: string;
    phoneNumber: string;
    ethnicity: string;
    status: number;
    religion: string;
    identificationNumber: string;
    taxIdentificationNumber: string;
    nationality: string;
    emergencyContactName: string;
    emergencyContactJob: string;
    emergencyContactNumber: string;
    emergencyContactYearOfBirth: string;
    emergencyContactAddressId?: number;
    emergencyContactAddress?: LocationSpecificModel;
    emergencyContactAddressString?: string;
    organizationId?: number;    
    // organization?: any;    
    isChecked?:boolean;    
}