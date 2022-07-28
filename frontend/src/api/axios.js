import axios from 'axios';
// const BASE_URL = 'http://localhost:8000';
const BASE_URL = 'https://the-food-app-api.herokuapp.com';

export default axios.create({
    baseURL: BASE_URL
})

// attaching interceptors to the private instance
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})