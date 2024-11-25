import ApiService from "../core/api.service";
import { Sports } from "../shared/interfaces/Sport.interface";

export const SportService = {
    getAll(): Promise<Sports|undefined> {
        console.log("getAll");
        const resp =ApiService.get<Sports>("sports");
        console.log("resp", resp);
        return resp;
    },
    getById(id:string) {
        return ApiService.get(`sports/${id}`);
    },
};




