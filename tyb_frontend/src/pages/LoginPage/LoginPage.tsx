import {useState} from "react";
import {useNavigate} from "react-router-dom";
import React from "react";
import {handleFieldChange} from "../../utils/commonFunctions";
import UserService from "../../service/API/User/UserService";

 const LoginPage =()=> {

    const navigate = useNavigate();

    const initialLoginState = {
        userId: "",
        firstName:"",
        lastName:"",
        password: "",
        isLogged: false
    }
    const [loginState, setLoginState] = useState(initialLoginState);


    //metodo di gestione degli errori
     function handleError(error:any) {
         console.log(error)
     }

     function loginFunction() {

        if (loginState.userId === "Giorgio") {
            setLoginState({...loginState, isLogged: true});
            //passiamo sulla pagina welcome e inviamo un param
            navigate(`/welcome/${loginState.userId}`); //ALT + 0096 (APICE SINGOLO)
        } else {
            setLoginState({...loginState, isLogged: false})
        }


        //Chiamo il servizio da be
        UserService.getUserData()
            //chiamato quando si ottengono le risposte dal web service
            .then(response =>{
                console.log(response)
                //Posso gestire i dati recuperati
                }
            )
            //in caso di errore
            .catch(error =>handleError(error))
    }

    const handleLoginFieldsChange = (e: { target: { name: string | number; value: any; }; }) => {
        handleFieldChange(loginState, setLoginState, e);
    }


    return (<div>
        Nome utente: <input type="text" name="userId" value={loginState.userId} onChange={handleLoginFieldsChange}/>
        Password: <input type="password" name="password" value={loginState.password}
                         onChange={handleLoginFieldsChange}/>
        <button className="btn btn-primary" onClick={loginFunction}> Accedi</button>
        <button className="btn btn-danger" onClick={loginFunction}> callBE</button>
    </div>)
}

export default LoginPage;