import api from "./API";
import TokenManager from "./TokenManager";

const AirportAPI = {
    getAll: async () => {
        try {
            const response = await api.get("/airports");            
            return response.data
        } catch (error) {
            throw error;
        }
    },

    getByIATACode: async (IATACode) => {
        try {
            const response = await api.get(`/airports/${IATACode}`)
            return response.data
        } catch (error) {
            console.error(`Error fetching airport by IATA Code: ${IATACode}`, error);
            throw error;
        }
    },
    postAirport: async (airport) => {
        try {  
            const response = await api.post(
                `/airports/`,
                {
                    "iata_code": airport.iata_code,
                    "name": airport.name,
                    "city": airport.city,
                    "country": airport.country
                },
                {
                    headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error creating airport:", error);
            throw error;
        }
    },
    deleteByIATACode: async (IATACode) => {
        try {
          const success = await api.delete(`/airports/${IATACode}`, 
            {
                headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
            })
          return success
        } catch (error) {
          console.error(`Error deleting airport by IATA code: ${IATACode}`, error)
        }
    },
    putAirport: async (airport) => {
        try {
            const response = await api.put(`/airports/`, airport, {
                headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
            })
            return response.data
        } catch (error) {
            console.error("Error updating airport:", error);
            throw error;
        }
    }
};

export default AirportAPI;