import { Activity } from "./Activity.interface";
import { User } from "./User.interface";

export interface Inscription {
    id_inscription: number;
    id_user_client: string;
    id_activity: number;
    date: string;
    state: number;
    slug_inscription: string;
    user?: User;
    activity?: Activity;
}

export interface Inscriptions {
    inscriptions: Inscription[];
}
