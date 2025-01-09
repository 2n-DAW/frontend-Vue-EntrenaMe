import { Module } from "vuex";
import { Booking } from "../shared/interfaces/entities/booking.interface";
import { BookingService } from "../services/booking.service";
import { BookingsState } from "../shared/interfaces/storeInterfaces/BookingsStore.interface";

const state: BookingsState = {
    bookings: [],
    selectedBooking: null,
};

export const booking: Module<BookingsState, any> = {
    namespaced: true,
    state,

    actions: {
        async initializeBookings({ commit }) {
            try {
                const response = await BookingService.getUserBookings();
                
                if (response){
                    commit('setBookings', response.bookings);
                }
                

            } catch (error) {
                console.error('Error loading bookings:', error);
            }
        },
        
        async deleteBooking({ commit }, slug: string) {
            try {
                await BookingService.delete(slug);
                commit('deleteBooking', slug);
            } catch (error) {
                console.error('Error deleting booking:', error);
            }
        },
        
    },

    mutations: {
        setBookings(state, bookings: Booking[]) {
            state.bookings = bookings;
        },
        deleteBooking(state, slug: string) {
            state.bookings = state.bookings.filter((booking) => booking.slug_booking !== slug);
        },
    },
    getters: {
        allBookings(state): Booking[] {
            return state.bookings;
        },
    },
};