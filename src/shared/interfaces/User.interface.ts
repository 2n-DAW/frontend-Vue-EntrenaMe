export interface User {
    id_user: number;
    img_user: string;
    email: string;
    username: string;
    password: string;
    type_user: string;
    name: string;
    surname: string;
    is_active: boolean;
    is_deleted: boolean;
    token?: string;
}