import ApiService from "../core/api.service";
import { Booking, BookingCreate } from "../shared/interfaces/entities/booking.interface";

export const BookingService = {
    
    create(court_hour: BookingCreate): Promise<Booking> {
        console.log(court_hour);
        return ApiService.post("bookings/create", court_hour);
    }
};




