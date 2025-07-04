import { jwtDecode } from "jwt-decode";

const TokenManager = {
    getAccessToken: () => sessionStorage.getItem("accessToken"), // Gets access storage from session
    getClaims: () => { // Gets claims from session storage from token
        if (!sessionStorage.getItem("claims")) {
            return undefined;
        }
        return JSON.parse(sessionStorage.getItem("claims"));
    },
    setAccessToken: (token) => { // Sets token to sessions
        sessionStorage.setItem("accessToken", token);
        const claims = jwtDecode(token);
        sessionStorage.setItem("claims", JSON.stringify(claims));
        return claims;
    },
    clear: () => { // Clears sessions (upon logout)
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("claims");
    }
}

export default TokenManager;