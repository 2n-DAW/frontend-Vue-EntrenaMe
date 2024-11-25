import ApiService from "../core/api.service";
import { Activities } from "../shared/interfaces/Activity.interface";


export const ActivityService = {
    getAll(): Promise<Activities|undefined> {
        console.log("getAll");
        const resp =ApiService.get<Activities>("activities");
        console.log("resp", resp);
        return resp;
    },
    getById(id:string) {
        return ApiService.get(`sports/${id}`);
    },
};



