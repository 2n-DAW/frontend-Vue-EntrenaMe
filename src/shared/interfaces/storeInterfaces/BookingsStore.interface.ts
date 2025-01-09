import { Booking } from "../entities/booking.interface";

export interface BookingsState {
    bookings: Booking[];
    selectedBooking: Booking | null;
}