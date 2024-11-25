import { Module } from 'vuex';
// import { SportService } from '../services/sportService';
import { Activity } from '../shared/interfaces/Activity.interface';
import { ActivityService } from '../services/activity.service';
import { sortHours } from '../shared/utils/shortHours.util';
import { sortWeekDays } from '../shared/utils/shortWeekDays.util';

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
                
                if (response === undefined) return;
                
                const { activities } = response;
                const days = new Array<string>();
                const hours = new Array<string>();
                
                for (let i = 0; i < activities.length; i++) {
                    if (!days.includes(activities[i].week_day)&& activities[i].week_day) {
                        days.push(activities[i].week_day);
                    }
                    if (!hours.includes(activities[i].slot_hour) && activities[i].slot_hour) {
                        hours.push(activities[i].slot_hour);
                    }
                }
                
                
                
                commit('setDays', sortWeekDays(days));
                commit('setHours', sortHours(hours));
                commit('setActivities', activities);
                
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
        setDays(state, days: string[]) {
            console.log("setDays", days);
            state.filters.days = days;
        },
        setHours(state, hours: string[]) {
            console.log("setHours", hours);
            state.filters.hours = hours;
        },
    },
    getters: {
        allActivities(state): Activity[] {
            return state.activities;
        },
        getDays(state): string[] {
            return state.filters.days;
        },
        getHours(state): string[] {
            return state.filters.hours;
        },
    },
};
