import axios from "axios";
import {TUser} from "../../../types/types";
import {setApiKeyToObject} from "../openapicode_tyb_user/common";
import {BaseAPI} from "../openapicode_tyb_user/base";
import {AuthApi, AuthApiFp} from "../openapicode_tyb_user";
import UserClient from "./UserClient";


class UserService {

    static createUser = (payload: any) => {

        return UserClient.userUsingGET(payload);
        //return axios.post(`http://localhost:8080/api/manage-user/create`, payload);

    }

    static getUser = async (payload: TUser) => {
        return axios.post(`http://localhost:8080/api/manage-user/user`, payload);
    }
}



export default UserService;


