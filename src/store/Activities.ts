import { Module } from 'vuex';
// import { SportService } from '../services/sportService';
import { Activity } from '../shared/interfaces/Activity.interface';
import { ActivityService } from '../services/activity.service';

export interface ActivityState {
    activities: Array<Activity>;
    filters: {
        days: Array<string>;
        hours: Array<string>;
    }
}

const state: ActivityState = {
    activities: [],
    filters: {
        days: [],
        hours: [],
    },
};

export const activity: Module<ActivityState, any> = {
    namespaced: true,
    state,

    actions: {
        async initializeActivities({ commit }) {
            try {
                const response = await ActivityService.getAll();
                
                commit('setSports', response);
                console.log("response", response);
            } catch (error) {
                console.error('Error loading sports:', error);
            }
        },
    },

    mutations: {
        setActivities(state, activities: Activity[]) {
            console.log("setActivities", activities);
            state.activities = activities;
        },
    },
    getters: {
        allActivities(state): Activity[] {
            return state.activities;
        },
    },
};
