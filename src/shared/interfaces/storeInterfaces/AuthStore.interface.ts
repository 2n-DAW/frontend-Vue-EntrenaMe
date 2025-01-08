import { User } from "../entities/User.interface";

export interface AuthState {
    user: User | null;
    followings: User[];
    followers: User[];
    isLogged: boolean;
}