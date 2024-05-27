// axiosClient.js

import axios from "axios";
import { UserApi } from "./api";

// Crea un'istanza di Axios con configurazioni di base
const instance = axios.create({
    baseURL: 'http://localhost:8080/api', // Sostituisci con l'URL della tua API
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Aggiungi un interceptor per includere il token in tutte le richieste
instance.interceptors.request.use(
    config => {
        // Recupera il token dalla session storage
        const token = sessionStorage.getItem('authToken');
        if (token) {
            // Aggiungi l'header di autorizzazione con il token
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Crea una nuova istanza del client User utilizzando l'istanza di Axios configurata
const UserClient = new UserApi(undefined, 'http://localhost:8080/api', instance);

export default UserClient;
