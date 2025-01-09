import { Sport } from "../entities/Sport.interface";

export interface SportState {
    sports: Sport[];
    selectedSport: Sport | null;
}