import ApiService from "../core/api.service";
import { User } from "../shared/interfaces/entities/User.interface";


export const ProfileService = {
    follow(username: string): Promise<User> {
        return ApiService.post<User>(`profiles/${username}/follow`);
    },
    unFollow(username: string): Promise<User> {
        return ApiService.post<User>(`profiles/${username}/unfollow`);
    },
    getFollowings(username: string): Promise<{ profiles: User[] }> {
        return ApiService.get<{ profiles: User[] }>(`profiles/${username}/followings`);
    },

    getFollowers(username: string): Promise<{ profiles: User[] }> {
        return ApiService.get<{ profiles: User[] }>(`profiles/${username}/followers`);
    },
};

