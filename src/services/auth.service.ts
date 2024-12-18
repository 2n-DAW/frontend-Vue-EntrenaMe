import ApiService from "../core/api.service";
import ApiServiceAdmin from "../core/apiAdmin.service";
import { User } from "../shared/interfaces/User.interface";

export const AuthService = {
    login(user:Partial<User>): Promise<User> {
        return ApiServiceAdmin.post<User>("user/login", user);
    },
    
    getCurrentUser(): Promise<User> {
        return ApiServiceAdmin.get<User>("user/currentUser");
    },
    
    getUserByUsername(username: string): Promise<User> {
    
        const resp =  ApiService.get<User>(`profiles/${username}`);
        console.log("resp:", resp);
        return resp;
    }

};


