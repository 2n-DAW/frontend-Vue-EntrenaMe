import ApiService from "../core/api.service";
import { Sport } from "../shared/interfaces/Sport.interface";

export const SportService = {
    getAll(): Promise<Array<Sport>|undefined> {
        console.log("getAll");
        const resp =ApiService.get<Array<Sport>>("sports");
        console.log("resp", resp);
        return resp;
    },
    getById(id:string) {
        return ApiService.get(`sports/${id}`);
    },
};




