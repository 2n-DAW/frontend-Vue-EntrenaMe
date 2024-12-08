import { Module } from 'vuex';
import { User } from '../shared/interfaces/User.interface';
import { AuthService } from '../services/auth.service';

export interface AuthState {
    user: User | null;
    isLogged: boolean;
}
const state: AuthState = {
    user: null,
    isLogged: false,
};

export const auth: Module<AuthState, any> = {
    namespaced: true,
    state,

    actions: {
        async getUser({ commit }) {
            try {
                const response = await AuthService.login();
                
                if (response !== null){
                    commit('setUser', response);
                    commit('setIsLogged', true);
                }else{
                    commit('setUser', null);
                    commit('setIsLogged', false);
                }
                

            } catch (error) {
                console.error('Error auth:' , error);
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
    },
    getters: {
        getUser(state): User | null {
            return state.user;
        },
        
        getIsLogged(state): boolean {
            return state.isLogged;
        },
    },
};
