import axios from 'axios';

const api = axios.create({
    baseURL: "/apiredirect",
    withCredentials: true
});

export default api;