import api from "./API";
import TokenManager from "./TokenManager";

const BookingAPI = {
    postBooking: async (booking) => {
        try {
          const response = await api.post(`/bookings`, {
            "user_id": booking.user_id,
            "flight_code": booking.flight_code,
            "flight_class": booking.flight_class,
            "luggage": booking.luggage,
            "seats": booking.seats,
            "passengers": booking.passengers,
            "payment": booking.payment
          }, {
            headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
          });
          
          return response
        } catch (error) {
          console.error("Error creating booking:", error);
          throw error;
        }
      },
    getBookingsByUserID: async () => {
      try {
        const response = await api.get(`/bookings/`, {
          headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
        });
        return response.data;
      } catch (error) {
        console.error(`Error fetching bookings by userID`, error);
        throw error;
      }
    },
    deleteBookingByID: async (id) => {
      try {
        const success = await api.delete(`/bookings/${id}`, {
          headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
        })
        return success
      } catch (error) {
        console.error(`Error deleting booking by ID: ${id}`, error)
      }
    }
};

export default BookingAPI;