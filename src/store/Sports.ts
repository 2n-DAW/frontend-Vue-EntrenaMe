import { Module } from 'vuex';
import { SportService } from '../services/sportService';

export interface SportState {
    sports: Array<Sport>;
    selectedSport: Sport | null;
}

export interface Sport {
    id: number;
    name: string;
}

const state: SportState = {
    sports: [],
    selectedSport: null,
};

export const sport: Module<SportState, any> = {
    namespaced: true,
    state,

    actions: {
        async initializeSports({ commit }) {
            try {
                const response = await SportService.getAll();
                
                commit('setSports', response.data);
                console.log("response", response.data);
            } catch (error) {
                console.error('Error loading sports:', error);
            }
        },
        selectSport({ commit }, sportId: number) {
            commit('SET_SELECTED_SPORT', sportId);
        },
    },

    mutations: {
        setSports(state, sports: Sport[]) {
            console.log("setSports", sports);
            state.sports = sports;
        },
        SET_SELECTED_SPORT(state, sportId: number) {
            state.selectedSport = state.sports.find(sport => sport.id === sportId) || null;
        },
    },
    getters: {
        allSports(state): Sport[] {
            return state.sports;
        },
        selectedSport(state): Sport | null {
            return state.selectedSport;
        },
    },
};
