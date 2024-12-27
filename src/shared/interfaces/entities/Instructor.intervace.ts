import { User } from "./User.interface";

export interface InstructorFields {
    id_instructor?: number;
    id_user?: number;
    nif: string;
    tlf: string;
    address: string;
}

export interface Instructor extends User {
    instructor: InstructorFields;
}

