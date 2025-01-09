import ApiService from "../core/api.service";
import { Sports } from "../shared/interfaces/entities/Sport.interface";

export const SportService = {
    getAll(): Promise<Sports> {
        return ApiService.get<Sports>("sports");
    },
    getById(id:string) {
        return ApiService.get(`sports/${id}`);
    },
};




