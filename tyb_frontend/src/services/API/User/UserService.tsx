import {TUser} from "../../../types/types";
import UserClient from "../openapicode_tyb_user/UserClient";
import {User} from "../openapicode_tyb_user";


class UserService {

    static createUser = (payload: any) => {

        return UserClient.createUserUsingPOST(payload);
        //return axios.post(`http://localhost:8080/api/manage-user/create`, payload);

    }

    static getUser = async (payload: User) => {
        return UserClient.recuperateUserByUsernameAndPasswordUsingGET(payload);

        //return axios.post(`http://localhost:8080/api/manage-user/user`, payload);
    }
}

export default UserService;


