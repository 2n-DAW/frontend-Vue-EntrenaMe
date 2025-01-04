import { Court } from "./Court.interface";
import { Hour } from "./Hour.interface";
import { Month } from "./Month.interface";

export interface CourtHour {
    id_court_hour: number;
    id_court: number;
    id_hour: number;
    id_month: number;
    day: number;
    year: number;
    available: boolean;
    slug_court_hour: string;
    month?: Month;
    hour?: Hour;
    court?: Court;
}

export interface CourtsHours{
    courts_hours: CourtHour[];
}