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
        initializeSports({ commit }) {
            // Lógica para inicializar los deportes, por ejemplo, una llamada a una API
            const sports = ['Fútbol', 'Baloncesto', 'Tenis'];
            console.log("sports", sports);
            commit('setSports', sports);
        },





        // async initializeSports({ commit }) {
        //     try {
        //         const response = await SportService.getAll();
        //         commit('SET_SPORTS', response.data);
        //     } catch (error) {
        //         console.error('Error loading sports:', error);
        //     }
        // },
        // selectSport({ commit }, sportId: number) {
        //     commit('SET_SELECTED_SPORT', sportId);
        // },
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
            console.log("eeeeeeeeeeeeeeeeeeeeeeeee", state.sports);
            return state.sports;
        },
        selectedSport(state): Sport | null {
            return state.selectedSport;
        },
    },
};
