import { AdminFields } from "./Admin.interface";
import { ClientFields } from "./Client.interface";
import { InstructorFields } from "./Instructor.intervace";

export interface User {
    id_user?: number;
    img_user: string;
    email: string;
    username: string;
    password: string;
    type_user: string;
    name: string;
    birthday?: Date;
    surname: string;
    is_active: boolean;
    is_deleted: boolean;
    token?: string;
    client?: ClientFields;
    instructor?: InstructorFields;
    admin?: AdminFields;
    bio?: string;
}