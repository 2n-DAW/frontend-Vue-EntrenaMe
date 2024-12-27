import ApiService from "../core/api.service";
import { Activities } from "../shared/interfaces/entities/Activity.interface";

export const ActivityService = {
    getAll(): Promise<Activities> {
        return ApiService.get<Activities>("activities/instructors&sports");
    },
    getById(id:string) {
        return ApiService.get(`sports/${id}`);
    },
    
    getAllFiltered(filters: any): Promise<Activities> {
        const resp =  ApiService.get<Activities>("activities/instructors&sports/filtered", {params: filters});
        return resp;
    },
};



