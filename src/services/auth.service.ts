import ApiService from "../core/api.service";
import { User } from "../shared/interfaces/entities/User.interface";


export const AuthService = {
    login(user:Partial<User>): Promise<User> {
        return ApiService.post<User>("users/login", user);
    },
    
    getCurrentUser(): Promise<User> {
        return ApiService.get<User>("user");
    },
    
    getUserByUsername(username: string): Promise<User> {
    
        const resp =  ApiService.get<User>(`profiles/${username}`);
        console.log("resp:", resp);
        return resp;
    },
    
    register(user:Partial<User>): Promise<User> {
        return ApiService.post<User>("users/register", user);
    },

};


