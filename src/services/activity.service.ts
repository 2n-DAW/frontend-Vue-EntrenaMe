import ApiService from "../core/api.service";
import { Activities } from "../shared/interfaces/Activity.interface";
import qs from 'qs';

export const ActivityService = {
    getAll(): Promise<Activities|undefined> {
        return ApiService.get<Activities>("activities");
    },
    getById(id:string) {
        return ApiService.get(`sports/${id}`);
    },
    
    getAllFiltered(filters: any): Promise<Activities|undefined> {
        const resp =  ApiService.get<Activities>("activities/instructors&sports/filtered", {params: filters});
        return resp;
    },
};



