import ApiService from "../core/api.service";
import { CourtsHours } from "../shared/interfaces/entities/CourtHour.interface";

export const CourtHourService = {
    getAll(): Promise<CourtsHours> {
        return ApiService.get<CourtsHours>("courtsHours/detailed");
    },
    // getById(id:string) {
    //     return ApiService.get(`sports/${id}`);
    // },
};




