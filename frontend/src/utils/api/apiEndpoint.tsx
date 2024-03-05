import axios from 'axios';

export const apiEndpoint = axios.create({
    baseURL: 'http://localhost:3030/',
    timeout: 5000,
})