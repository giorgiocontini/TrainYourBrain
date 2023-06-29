import axios from "axios";
import {TUser} from "../../../types/types";





class UserService{

    static getUserData=()=>{
        return axios.get("http://localhost:8080/api/manage-user");
    }

    static getUserByName=(nome:string)=>{
       //Esempio metodo con params
        return axios.get(`http://localhost:8080/api/manage-user/${nome}`);
    }

    static getUserById=(id:string)=>{
        //Esempio metodo con params
        return axios.get(`http://localhost:8080/api/manage-user/${id}`);
    }

    static createUser=( payload:TUser)=>{
        return axios.post(`http://localhost:8080/api/manage-user/create`,payload);
    }
}

export default UserService;