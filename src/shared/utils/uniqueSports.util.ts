import { Sport } from "../interfaces/entities/Sport.interface";

export const uniqueSports = (sports: Array<Sport>): Array<Sport> => {

    const unique_sports = new Array<Sport>();
    
    sports.forEach(sport => {
        if (!unique_sports.some(s => s.id_sport === sport.id_sport)) {
            unique_sports.push(sport);
        }
    });
    
    return unique_sports;
}