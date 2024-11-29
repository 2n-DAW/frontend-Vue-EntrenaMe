import ApiService from "../core/api.service";
import { Sports } from "../shared/interfaces/Sport.interface";

export const SportService = {
    getAll(): Promise<Sports|undefined> {
        return ApiService.get<Sports>("sports");
    },
    getById(id:string) {
        return ApiService.get(`sports/${id}`);
    },
};




