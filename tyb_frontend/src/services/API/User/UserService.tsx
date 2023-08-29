import axios from "axios";
import {TUser} from "../../../types/types";




class UserService{

    static createUser=(payload:any)=>{
        return axios.post(`http://localhost:8080/api/manage-user/create`,payload);
    }

    static getUser=(payload:TUser)=>{
        return axios.post(`http://localhost:8080/api/manage-user/user`,payload).then(

        );
    }
}

export default UserService;