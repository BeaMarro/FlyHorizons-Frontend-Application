import api from "./API";
import TokenManager from "./TokenManager";

const FlightAPI = {
    getAllFlights: async () => {
        try {
            const response = await api.get("/flights");
            return response.data
        } catch (error) {
            console.error("Error fetching flights", error);
            throw error;
        }
    },
    filterFlightsByAll: async ({departureAirport, arrivalAirport, departureDate}) => {
        try {
            const response = await api.get(`/flights/filter?departureAirport=${departureAirport}&arrivalAirport=${arrivalAirport}&departureDate=${departureDate}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching filtered flights:", error);
            throw error;
        }
    },
    filterFlightsByDeparture: async (departure) => {
        try {
            console.log(`/flights/filter?departureAirport=${departure}`)
            const response = await api.get(`/flights/filter?departureAirport=${departure}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching filtered flights:", error);
            throw error;
        }
    },
    getByFlightCode: async (flightCode) => {
        try {
            const response = await api.get(`/flights/${flightCode}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching flight by flightCode:", error);
            throw error;
        }
    },
    postFlight: async (flight) => {
        try {  
            const response = await api.post(
                `/flights/`,
                {
                  "flight_code": flight.flight_code,
                  "departure": flight.departure,
                  "arrival": flight.arrival,
                  "duration_in_minutes": flight.duration_in_minutes,
                  "departure_time": flight.departure_time,
                  "departure_days": flight.departure_days,
                  "base_price": flight.base_price,
                },
                {
                  headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
                }
              );
              
              return response.data;
        } catch (error) {
            console.error("Error creating flight:", error);
            throw error;
        }
    },
    deleteFlightByFlightCode: async (flightCode) => {
        try {
          const success = await api.delete(`/flights/${flightCode}`, 
            {
                headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
            })
          return success
        } catch (error) {
          console.error(`Error deleting flight by flightCode: ${flightCode}`, error)
        }
    },
    putFlight: async (flight) => {
        try {
            const response = await api.put(`flights/`, flight, {
                headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
            })
            return response.data
        } catch (error) {
            console.error("Error updating flight:", error);
            throw error;
        }
    }
};

export default FlightAPI;