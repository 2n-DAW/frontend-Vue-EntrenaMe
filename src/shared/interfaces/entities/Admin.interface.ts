import { User } from "./User.interface";

export interface AdminFields {
    id_admin?: number;
    id_user?: number;
}

export interface Admin extends User {
    admin: AdminFields;
}