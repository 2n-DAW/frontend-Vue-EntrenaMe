import { Module } from 'vuex';
import { Activity } from '../shared/interfaces/entities/Activity.interface';
import { ActivityService } from '../services/activity.service';
import { sortHours } from '../shared/utils/shortHours.util';
import { sortWeekDays } from '../shared/utils/shortWeekDays.util';
import { OptionSelect } from '../shared/interfaces/select/OptionSelect.interface';
import { Sport } from '../shared/interfaces/entities/Sport.interface';
import { uniqueSports } from '../shared/utils/uniqueSports.util';
import { ActivityState } from '../shared/interfaces/storeInterfaces/ActivityStore.interface';

const state: ActivityState = {
    activities: [],
    activitiesNames: [],
    filters: {
        days: [],
        hours: [],
        sports: [],
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
                const sports = new Array<Sport>();

                for (let i = 0; i < activities.length; i++) {
                    if (!days.includes(activities[i].week_day) && activities[i].week_day) {
                        days.push(activities[i].week_day);
                    }
                    if (!hours.includes(activities[i].slot_hour) && activities[i].slot_hour) {
                        hours.push(activities[i].slot_hour);
                    }
                    if (activities[i].sport && !sports.includes(activities[i].sport as Sport)) {
                        sports.push(activities[i].sport as Sport);
                    }
                }

                const days_sorted = sortWeekDays(days);
                const hours_sorted = sortHours(hours);
                const sports_unique = uniqueSports(sports);

                const days_label = days_sorted.map((day) => {
                    return { value: day, label: day };
                });
                const hours_label = hours_sorted.map((hour) => {
                    return { value: hour, label: hour };
                });
                
                const sports_label = sports_unique.map((sport) => {
                    return { value: sport.n_sport, label: sport.n_sport }; //Cambiar a slug_sport
                });
                
                const activities_names = activities.map((activity) => {
                    return activity.n_activity;
                });

                commit('setDays', days_label);
                commit('setHours', hours_label);
                commit('setActivities', activities);
                commit('setSports', sports_label);
                commit('setActivitiesNames', activities_names);

            } catch (error) {
                console.error('Error loading sports:', error);
            }
        },
        
        


    },

    mutations: {
        setActivities(state, activities: Activity[]) {
            state.activities = activities;
        },
        setDays(state, days: OptionSelect[]) {
            state.filters.days = days;
        },
        setHours(state, hours: OptionSelect[]) {
            state.filters.hours = hours;
        },
        setSports(state, sports: OptionSelect[]) {
            state.filters.sports = sports;
        },
        setActivitiesNames(state, activitiesNames: string[]) {
            state.activitiesNames = activitiesNames;
        },
        
    },
    getters: {
        allActivities(state): Activity[] {
            return state.activities;
        },
        getDays(state): OptionSelect[] {
            return state.filters.days;
        },
        getHours(state): OptionSelect[] {
            return state.filters.hours;
        },
        getSports(state): OptionSelect[] {
            return state.filters.sports;
        },
        getActivitiesNames(state): string[] {
            return state.activitiesNames;
        }
    },
};
