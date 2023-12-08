// axiosClient.js

import {UserApi} from "./api";
import axios from "axios";


const instance = axios.create({
    baseURL: 'http://localhost:8080/api/manage-user', // Sostituisci con l'URL della tua API
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        // Altre intestazioni personalizzate, se necessario
    },
});

const UserClient = new UserApi(undefined, 'http://localhost:8080/api/manage-user', instance);

export default UserClient;
