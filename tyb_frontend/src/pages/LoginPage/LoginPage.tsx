import {useState} from "react";
import {useNavigate} from "react-router-dom";
import React from "react";
import {handleFieldChange} from "../../utils/commonFunctions";

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


    function loginFunction() {

        if (loginState.userId === "Giorgio") {
            setLoginState({...loginState, isLogged: true});
            //passiamo sulla pagina welcome e inviamo un param
            navigate(`/welcome/${loginState.userId}`); //ALT + 0096 (APICE SINGOLO)
        } else {
            setLoginState({...loginState, isLogged: false})
        }
    }

    const handleLoginFieldsChange = (e: { target: { name: string | number; value: any; }; }) => {
        handleFieldChange(loginState, setLoginState, e);
    }

    return (<div>
        Nome utente: <input type="text" name="userId" value={loginState.userId} onChange={handleLoginFieldsChange}/>
        Password: <input type="password" name="password" value={loginState.password}
                         onChange={handleLoginFieldsChange}/>
        <button className="btn btn-primary" onClick={loginFunction}> Accedi</button>
    </div>)
}

export default LoginPage;