import axios from 'axios';
import Cookies from "js-cookie";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL + '/api', // Replace with your backend API URL
});

api.interceptors.request.use((config) => {
    const authToken = Cookies.get('session');

    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
}, (error) => {
    console.error('Error in request interceptor:', error);
    return Promise.reject(error);
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            // Remove session token from cookies or local storage
            Cookies.remove('session');

            // Redirect to login page
            window.location.href = '/login';
        }
        return Promise.reject(error);
    },
);


export default api;
