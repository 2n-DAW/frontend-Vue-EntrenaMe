import { CourtHour } from "./CourtHour.interface";
import { User } from "./User.interface";

export interface Booking {
    id_booking: number;
    id_user: string;
    id_count_hours: number;
    date: string;
    is_deleted: boolean;
    slug_booking: string;
    user?: User;
    court_hour?: {
        id_court_hour: number;
        n_court: string;
        slot_hour: string;
        n_month: string;
        day_number: number;
        year: number;
        slug_court_hour: string | null;
        available: number;
    };
}

export interface BookingCreate {
    id_count_hours: number;
}

export interface Bookings{
    bookings: Booking[];
}