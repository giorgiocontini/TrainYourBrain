// axiosClient.js

import {AuthApi} from "../openapicode_tyb_user";
import axios from "axios";


const instance = axios.create({
    baseURL: 'http://localhost:8080/api', // Sostituisci con l'URL della tua API
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        // Altre intestazioni personalizzate, se necessario
    },
});

const UserClient = new AuthApi(undefined, 'http://localhost:8080/api', instance);

export default UserClient;
