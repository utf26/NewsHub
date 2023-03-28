import axios from 'axios';

// axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL + '/api', // Replace with your backend API URL
});

api.interceptors.request.use((config) => {
    // const token = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    // if (token) {
    //     config.headers['X-XSRF-TOKEN'] = token[1];
    // }

    const authToken = localStorage.getItem('authToken');
    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
