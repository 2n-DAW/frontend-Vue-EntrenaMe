import { Module } from 'vuex';
import { User } from '../shared/interfaces/entities/User.interface';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';

export interface AuthState {
    user: User | null;
    followings: User[];
    followers: User[];
    isLogged: boolean;
}
const state: AuthState = {
    user: null,
    followings: [],
    followers: [],
    isLogged: false,
};

export const auth: Module<AuthState, any> = {
    namespaced: true,
    state,

    actions: {
        async initialize({ commit }, user: { email: string; password: string }) {
            try {
                const response = await AuthService.login(user);
                localStorage.setItem('token', response.token as string);
                const response_followings = await ProfileService.getFollowings(response.username);
                const response_followers = await ProfileService.getFollowers(response.username);
                if (response !== null){
                    localStorage.setItem('token', response.token as string);
                    commit('setUser', response);
                    commit('setIsLogged', true);
                    commit('setFollowings', response_followings.profiles);
                    commit('setFollowers', response_followers.profiles);
                }else{
                    commit('setUser', null);
                    commit('setIsLogged', false);
                    commit('setFollowings', []);
                    commit('setFollowers', []);
                }
                

            } catch (error) {
                commit('setUser', null);
                commit('setIsLogged', false);
                commit('setFollowings', []);
                commit('setFollowers', []);
                
                throw error;
                
            }
        },
        
        async currentUser({ commit }) {
            try {
                const response = await AuthService.getCurrentUser();
                const response_followings = await ProfileService.getFollowings(response.username);
                const response_followers = await ProfileService.getFollowers(response.username);
                
                if (response !== null){
                    commit('setUser', response);
                    commit('setIsLogged', true);
                    commit('setFollowings', response_followings.profiles);
                    commit('setFollowers', response_followers.profiles);
                }else{
                    commit('setUser', null);
                    commit('setIsLogged', false);
                    commit('setFollowings', []);
                    commit('setFollowers', []);
                }
            } catch (error) {
                commit('setUser', null);
                commit('setIsLogged', false);
                commit('setFollowings', []);
                commit('setFollowers', []);
            }
        },
        
        async logout({ commit }) {
            try {
                await AuthService.logout();
                
            } catch (error) {
                throw error;
            }finally{
                localStorage.removeItem('token');
                commit('setIsLogged', false);
                commit('setUser', null);
                commit('setFollowings', []);
                commit('setFollowers', []);
            }
        },
        async updateUser({ commit }, user: Partial<User>) {
            try {
                const response = await AuthService.updateUser(user);
                commit('setUser', response);
            } catch (error) {
                throw error;
            }
        },
        
        async follow({ commit }, { username, loggedUser }: { username: string; loggedUser: string }) {
            try {
                await ProfileService.follow(username);
                const response_followings = await ProfileService.getFollowings(loggedUser);
                commit('setFollowings', response_followings.profiles);
                
            } catch (error) {
                throw error;
            }
        },
        
        async unFollow({ commit }, { username, loggedUser }: { username: string; loggedUser: string }) {
            try {
                await ProfileService.unFollow(username);
                const response_followings = await ProfileService.getFollowings(loggedUser);
                commit('setFollowings', response_followings.profiles);
            } catch (error) {
                throw error;
            }
        },
        
        
        
    },
    

    mutations: {
        setUser(state, user: User) {
            state.user = user;
        },
        
        setIsLogged(state, isLogged: boolean) {
            state.isLogged = isLogged;
        },
        setFollowings(state, followings: User[]) {
            state.followings = followings;
        },
        setFollowers(state, followers: User[]) {
            state.followers = followers;
        }
    },
    getters: {
        getUser(state): User | null {
            return state.user;
        },
        
        getIsLogged(state): boolean {
            return state.isLogged;
        },
        getFollowings(state): User[] {
            return state.followings;
        },
        getFollowers(state): User[] {
            return state.followers;
        }
    },
};
