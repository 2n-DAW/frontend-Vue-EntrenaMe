import ApiService from "../core/api.service";
import { Booking, BookingCreate } from "../shared/interfaces/entities/booking.interface";

export const BookingService = {
    
    create(court_hour: BookingCreate): Promise<Booking> {
        console.log(court_hour);
        return ApiService.post("bookings/create", court_hour);
    },
    getAll(): Promise<{ bookings: Booking[] }> {
        return ApiService.get("bookings/detailed");
    },
    delete(slug: string): Promise<Booking> {
        return ApiService.put(`bookings/delete/${slug}`);
    },
    getUserBookings(): Promise<{ bookings: Booking[] }> {
        return ApiService.get("bookings/user");
    },
    
};




