import ApiService from "../core/api.service";
import { Activity } from "../shared/interfaces/Activity.interface";


export const ActivityService = {
    getAll(): Promise<Array<Activity>|undefined> {
        console.log("getAll");
        const resp =ApiService.get<Array<Activity>>("activities");
        console.log("resp", resp);
        return resp;
    },
    getById(id:string) {
        return ApiService.get(`sports/${id}`);
    },
};



