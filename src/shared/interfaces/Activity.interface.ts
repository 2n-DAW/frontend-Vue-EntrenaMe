import { Sport } from "./Sport.interface";
import { User } from "./User.interface";

export interface Activity {
    id_activity: number;
    n_activity: string;
    spots: number;
    description: string;
    img_activity: string;
    slot_hour: string;
    week_day: string;
    slug_activity: string;
    id_user_instructor: number;
    id_sport: number;
    sport?: Sport;
    instructor?: User;
}

export interface Activities {
    activities: Activity[];
}