import { Module } from 'vuex';
import { SportService } from '../services/sport.service';
import { CourtHour } from '../shared/interfaces/entities/CourtHour.interface';
import { CourtHourService } from '../services/courtHour.service';

export interface CourtsHoursState {
    courts_hours: Array<CourtHour>;
    selected_courts_hours: CourtHour | null;
}
const state: CourtsHoursState = {
    courts_hours: [],
    selected_courts_hours: null,
};

export const courtHour: Module<CourtsHoursState, any> = {
    namespaced: true,
    state,

    actions: {
        async initializeCourtsHours({ commit }) {
            try {
                const response = await CourtHourService.getAll();
                
                if (response){
                    console.log('response:', response);
                    commit('setCourtHours', response.courts_hours);
                }
                

            } catch (error) {
                console.error('Error loading sports:', error);
            }
        },
    },

    mutations: {
        setCourtHours(state, courts_hours: CourtHour[]) {
            state.courts_hours = courts_hours;
        },
    },
    getters: {
        allCourtHours(state): CourtHour[] {
            return state.courts_hours;
        },
    },
};
