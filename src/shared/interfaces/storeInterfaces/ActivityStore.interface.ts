import { Activity } from "../entities/Activity.interface";
import { OptionSelect } from "../select/OptionSelect.interface";

export interface ActivityState {
    activities: Activity[];
    activitiesNames: string[];
    
    filters: {
        days: OptionSelect[];
        hours: OptionSelect[];
        sports: OptionSelect[];
    }
}