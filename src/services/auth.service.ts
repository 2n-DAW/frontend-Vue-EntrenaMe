import ApiServiceAdmin from "../core/apiAdmin.service";
import { User } from "../shared/interfaces/User.interface";

export const AuthService = {
    login(user:Partial<User>): Promise<User> {
        return ApiServiceAdmin.post<User>("user/login", user);
    },
    
    getCurrentUser(): Promise<User> {
        return ApiServiceAdmin.get<User>("user/currentUser");
    },

};


