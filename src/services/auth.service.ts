import ApiServiceAdmin from "../core/api.service";
import ApiService from "../core/api.service";
import { User } from "../shared/interfaces/User.interface";

export const AuthService = {
    login(): Promise<Partial<User>> {
        return ApiServiceAdmin.post<User>("sports");
    },

};

