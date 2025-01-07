import { Module } from 'vuex';
import { User } from '../shared/interfaces/entities/User.interface';
import { AuthService } from '../services/auth.service';
import Profile from '../views/Profile.vue';
import { ProfileService } from '../services/profile.service';
import { c } from 'vite/dist/node/types.d-aGj9QkWt';

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
                throw error;
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
        
        async follow({ commit, state }, username: string) {
            try {
                const response = await ProfileService.follow(username);
                if (response) {
                    const updated_followers = [...state.followers, username];
                    commit('setFollowings', updated_followers);
                }
            } catch (error) {
                throw error;
            }
        },
        async unFollow({ commit, state }, username: string) {
            try {
                const response = await ProfileService.unFollow(username);
                if (response) {
                    const updated_followers = state.followers.filter(
                        (follower) => follower.username !== username
                    );
                    commit('setFollowings', updated_followers);
                }
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
