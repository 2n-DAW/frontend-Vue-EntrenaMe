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
        return  ApiService.get<User>(`profiles/${username}`);
    },
    
    register(user:Partial<User>): Promise<User> {
        return ApiService.post<User>("users/register", user);
    },
    
    logout(): Promise<User> {
        return ApiService.post<User>("users/logout");
    },
    
    updateUser(user:Partial<User>): Promise<User> {
        return ApiService.put<User>("user", user);
    },

};


