import api from "./API";
import TokenManager from "./TokenManager";

const AuthAPI = {
    login: async (email, password) => {
        try {
            const loginRequest = {
                email: email,
                password: password,
            };
    
            const response = await api.post("/login", loginRequest);
    
            if (response.data) {
                // Set access token to TokenManager
                TokenManager.setAccessToken(response.data.access_token)
            } else {
                throw new Error("Invalid API response: access_token is missing or not a string");
            }
        } catch (error) {
            console.error("Login API error: ", error);
            throw error;
        }
    },    
};

export default AuthAPI;