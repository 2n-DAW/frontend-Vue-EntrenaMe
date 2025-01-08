import { CourtHour } from "../entities/CourtHour.interface";
import { OptionSelect } from "../select/OptionSelect.interface";

export interface CourtsHoursState {
    courts_hours: CourtHour[];
    hours: OptionSelect[];
    months: OptionSelect[];
    courts: OptionSelect[];
    days: OptionSelect[];
    selected_courts_hours: CourtHour | null;
}