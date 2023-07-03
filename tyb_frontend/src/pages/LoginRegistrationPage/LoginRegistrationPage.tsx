import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import InputTextComponent from "../../components/input-components/InputTextComponent";
import ToggleButtonComponent from "../../components/ToggleComponent/ToggleButtonComponent";
import UserService from "../../services/API/User/UserService";
import {TUser} from "../../types/types";
import {AuthContext} from "../../AuthContext";
import {useAuth} from "../../hooks/useAuth";
import {debug} from "util";

const LoginRegistrationPage = () => {

    const {user, isInRole, setUser} = useContext(AuthContext);

    const navigate = useNavigate();
    const { login } = useAuth();

    const initialLoginState = {
        form: {
            fields: {
                username: "",
                name: "",
                surname: "",
                email: "",
                password: "",
            }
        }

    }
    const initialRegistrationState = {
        form: {
            fields: {
                username: "",
                name: "",
                surname: "",
                email: "",
                password: "",
            }
        }

    }
    const [loginState, setLoginState] = useState(initialLoginState);
    const [registrationState, setRegistrationState] = useState(initialRegistrationState);


    //metodo di gestione degli errori
    function handleError(error: any) {
        console.log(error?.response?.data?.message)
    }

    //metodo di gestione
    function handleResponse(response: any) {
        if (response && response.status===200) {
            setUser(response.data);
        }
    }

    function loginFunction() {

        //Chiamo il servizio da be
        UserService.getUser(loginState.form.fields)
            //chiamato quando si ottengono le risposte dal web service
            .then(response => {
                    if (response != null) {
                        //localStorage
                       //login({
                       //    name:response.data.name,
                       //    username: response.data.username,
                       //    role:response.data.role,
                       //    password:response.data.password,
                       //    surname:response.data.surname
                       //})
                        handleResponse(response)
                    }
                    //Posso gestire i dati recuperati
                }
            )
            //in caso di errore
            .catch(error => handleError(error))
    }

    const [isLogin, setLogin] = useState(true)

    const handleTabChanges = () => {
        setLogin(!isLogin);
        setLoginState(initialLoginState);
        setRegistrationState(initialRegistrationState);
    }

    function addUserFunction() {

        const payload: TUser = {
            name: registrationState.form.fields.name,
            surname: registrationState.form.fields.surname,
            username: registrationState.form.fields.username,
            role: "A",
            password: registrationState.form.fields.password
        }

        UserService.createUser(payload)
            .then(response => {
                console.log(response)
            }).catch(err => {
            console.log(err)
        })
    }

    function getUserFunction() {

        const payload: TUser = {
            name: undefined,
            surname: undefined,
            username: loginState.form.fields.username,
            role: undefined,
            password: undefined
        }

        debugger
        UserService.getUser(payload)
            .then(response => {
                console.log(response)
            }).catch(err => {
            console.log(err)
        })
    }


    return (<div className="row">
        <div className="col-6">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                 className="img-fluid" alt="image"/>
        </div>
        <div className="col-6 p-4">
            <ToggleButtonComponent flag={isLogin} setFlag={setLogin} option1={"Accedi"} option2={"Registrati"}/>
            <div className="tab-content">
                <div className={"tab-pane fade show " + (isLogin ? "active" : "")}
                     id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                    <div className="form">
                        <InputTextComponent
                            label="Username"
                            type="text"
                            value={loginState.form.fields.username}
                            name="username"
                            setState={setLoginState}/>
                        <InputTextComponent label="Password" type="password"
                                            value={loginState.form.fields.password}
                                            name="password"
                                            setState={setLoginState}/>
                        <div className="flex-row mb-4">
                            <div className="d-flex justify-content-center">
                                <a className="fa-underline" style={{cursor: "pointer"}}>Password dimenticata?</a>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block mb-4"
                                onClick={loginFunction}>Accedi
                        </button>

                        <div className="text-center">
                            <p>Non sei registrato? <a className="fa-underline" style={{cursor: "pointer"}}
                                                      onClick={handleTabChanges}>Registrati</a></p>
                        </div>
                    </div>
                </div>
                <div className={"tab-pane fade show " + (!isLogin ? "active" : "")}
                     id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                    <div className="form">
                        <InputTextComponent name="username" label="Username" type="text"
                                            value={registrationState.form.fields.username}
                                            setState={setRegistrationState}/>
                        <InputTextComponent name="email" label="Email" type="email"
                                            value={registrationState.form.fields.email}
                                            setState={setRegistrationState}/>
                        <InputTextComponent name="name" label="Nome" type="text"
                                            value={registrationState.form.fields.name}
                                            setState={setRegistrationState}/>
                        <InputTextComponent name="surname" label="Cognome" type="text"
                                            value={registrationState.form.fields.surname}
                                            setState={setRegistrationState}/>
                        <InputTextComponent name="password" label="Password" type="password"
                                            value={registrationState.form.fields.password}
                                            setState={setRegistrationState}/>
                        <button type="submit" onClick={addUserFunction}
                                className="btn btn-primary btn-block mb-3">Conferma
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>)
}

export default LoginRegistrationPage;