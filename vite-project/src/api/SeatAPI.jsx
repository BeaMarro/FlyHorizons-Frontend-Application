import api from "./API";

const SeatAPI = {
    getSeatsByFlightCode: async (flightCode) => {
        try {
            const response = await api.get(`/bookings/seats/${flightCode}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching seats:", error);
            throw error;
        }
    }
};

export default SeatAPI;