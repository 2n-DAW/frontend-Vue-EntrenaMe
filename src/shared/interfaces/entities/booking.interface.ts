export interface Booking {
    id_booking: number;
    id_user: string;
    id_count_hours: number;
    date: string;
    is_deleted: boolean;
    slug_booking: string;
}

export interface BookingCreate {
    id_count_hours: number;
}