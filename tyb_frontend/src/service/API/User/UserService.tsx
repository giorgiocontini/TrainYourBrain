import axios from "axios";


type TUser = {
    firstName: string | undefined;
    lastName: string | undefined;
    userId: number | undefined;
    role: string | undefined;
};


class UserService{

    static getUserData=()=>{
       //const user :TUser={
       //    firstName:"",
       //    lastName:"",
       //    role:"P",
       //    userId:21221
       //}

        return axios.get("http://localhost:8080/api/manageData");
    }

    static getUserDataParam=(nome:string)=>{
       //Esempio metodo con params
        return axios.get(`http://localhost:8080/api/manageData/${nome}`);
    }
}

export default UserService;