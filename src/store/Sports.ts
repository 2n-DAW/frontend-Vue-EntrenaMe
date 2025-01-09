import { Module } from 'vuex';
import { SportService } from '../services/sport.service';
import { Sport } from '../shared/interfaces/entities/Sport.interface';
import { SportState } from '../shared/interfaces/storeInterfaces/SportStore.interface';


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
                
                if (response){
                    commit('setSports', response.sports);
                }
                

            } catch (error) {
                console.error('Error loading sports:', error);
            }
        },
    },

    mutations: {
        setSports(state, sports: Sport[]) {
            state.sports = sports;
        },
    },
    getters: {
        allSports(state): Sport[] {
            return state.sports;
        },
    },
};
