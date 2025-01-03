import { User } from "./User.interface";

export interface AdminFields {
    id_admin?: number;
    id_user?: string;
}

export interface Admin extends User {
    admin: AdminFields;
}