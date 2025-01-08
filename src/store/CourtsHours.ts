import { Module } from 'vuex';
import { CourtHour } from '../shared/interfaces/entities/CourtHour.interface';
import { CourtHourService } from '../services/courtHour.service';
import { OptionSelect } from '../shared/interfaces/select/OptionSelect.interface';
import { sortMonths } from '../shared/utils/shortMonths.util';
import { sortHours } from '../shared/utils/shortHours.util';
import { CourtsHoursState } from '../shared/interfaces/storeInterfaces/CourtHourStore.interface';

const state: CourtsHoursState = {
    courts_hours: [],
    hours: [],
    months: [],
    courts: [],
    days: [],
    selected_courts_hours: null,
};

export const courtHour: Module<CourtsHoursState, any> = {
    namespaced: true,
    state,

    actions: {
        async initializeCourtsHours({ commit }) {
            try {
                const response = await CourtHourService.getAll();

                if (response) {
                    console.log('response:', response);
                    commit('setCourtHours', response.courts_hours);
                }
                
                const { courts_hours } = response;
                const days = new Array<number>();
                const hours = new Array<string>();
                const months = new Array<string>();
                const courts = new Array<string>();

                for (let i = 0; i < courts_hours.length; i++) {
                    if (!days.includes(courts_hours[i].day_number) && courts_hours[i].day_number) {
                        days.push(courts_hours[i].day_number);
                    }
                    if (!hours.includes(courts_hours[i].hour!.slot_hour) && courts_hours[i].hour!.slot_hour) {
                        hours.push(courts_hours[i].hour!.slot_hour);
                    }
                    if (!months.includes(courts_hours[i].month!.n_month) && courts_hours[i].month!.n_month) {
                        months.push(courts_hours[i].month!.n_month);
                    }
                    if (!courts.includes(courts_hours[i].court!.n_court) && courts_hours[i].court!.n_court) {
                        courts.push(courts_hours[i].court!.n_court);
                    }
                }
                
                const days_sorted = days.sort((a, b) => a - b);
                const hours_sorted = sortHours(hours);
                const months_sorted = sortMonths(months);

                const days_label = days_sorted.map((day) => {
                    return { value: day, label: day };
                });
                
                const hours_label = hours_sorted.map((hour) => {
                    return { value: hour, label: hour };
                });
                
                const months_label = months_sorted.map((month) => {
                    return { value: month, label: month };
                });
                
                const courts_label = courts.map((court) => {
                    return { value: court, label: court };
                });                
                commit('setDays', days_label);
                commit('setHours', hours_label);
                commit('setMonths', months_label);
                commit('setCourts', courts_label);

            } catch (error) {
                console.error('Error loading sports:', error);
            }
        },
    },

    mutations: {
        setCourtHours(state, courts_hours: CourtHour[]) {
            state.courts_hours = courts_hours;
        },
        setDays(state, days: OptionSelect[]) {
            state.days = days;
        },
        setHours(state, hours: OptionSelect[]) {
            state.hours = hours;
        },
        setMonths(state, months: OptionSelect[]) {
            state.months = months;
        },
        setCourts(state, courts: OptionSelect[]) {
            state.courts = courts;
        },
        setSelectedCourtHour(state, court_hour: CourtHour) {
            state.selected_courts_hours = court_hour
        }
    },
    getters: {
        allCourtHours(state): CourtHour[] {
            return state.courts_hours;
        },
        allDays(state): OptionSelect[] {
            return state.days;
        },
        allHours(state): OptionSelect[] {
            return state.hours;
        },
        allMonths(state): OptionSelect[] {
            return state.months;
        },
        allCourts(state): OptionSelect[] {
            return state.courts;
        },
        getSelectedCourtHour(state): CourtHour | null {
            return state.selected_courts_hours;
        }
        
    },
};
