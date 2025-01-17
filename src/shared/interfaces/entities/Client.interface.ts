import { User } from "./User.interface";

export interface ClientFields {
    id_client?: number;
    id_user?: string;
    tlf: string;
    nif: string;
}

export interface Client extends User {
    client: ClientFields;
}