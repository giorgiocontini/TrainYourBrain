import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import InputTextComponent from "../../components/input-components/InputTextComponent";

const LoginPage = () => {

    const navigate = useNavigate();

    const initialLoginState = {
        form: {
            fields: {
                username: "",
                password: ""
            }
        }

    }
    const initialRegistrationState = {
        form: {
            fields: {
                username: "",
                firstname: "",
                lastname: "",
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

    function loginFunction() {

        //const userrrr = {username: "Test", name: "nameee", surname: "rewerwerw"}
        //UserService.createUser(userrrr).then(
        //    response => {
        //        return "Creato!!"
        //    }
        //)
        //    .catch(err => console.log(err))
        ////Chiamo il servizio da be
        //UserService.getUserByName(loginState.userId)
        //    //chiamato quando si ottengono le risposte dal web service
        //    .then(response =>{
        //        console.log(response)
        //        //Posso gestire i dati recuperati
        //        }
        //    )
        //    //in caso di errore
        //    .catch(error =>handleError(error))
    }

    const [isLogin, setLogin] = useState(true)

    const handleTabChanges = () => {
        setLogin(!isLogin);
        setLoginState(initialLoginState);
        setRegistrationState(initialRegistrationState);
    }

    return (<div className="row">
        <div className="col-6">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                 className="img-fluid" alt="image"/>
        </div>
        <div className="col-6 p-4">
            <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                    <a className={"nav-link " + (isLogin ? "active" : "")} onClick={handleTabChanges}
                       id="tab-login" data-mdb-toggle="pill" role="tab"
                       aria-controls="pills-login" aria-selected="true">Accedi</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className={"nav-link " + (!isLogin ? "active" : "")} onClick={handleTabChanges}
                       id="tab-register" data-mdb-toggle="pill" role="tab"
                       aria-controls="pills-register" aria-selected="false">Registrati</a>
                </li>
            </ul>
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
                                <a href=" ">Password dimenticata?</a>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block mb-4">Accedi</button>

                        <div className="text-center">
                            <p>Non sei registrato? <a href=" " onClick={() => {
                                setLogin(false)
                            }}>Registrati</a></p>
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
                        <InputTextComponent name="firstname" label="Nome" type="text"
                                            value={registrationState.form.fields.firstname}
                                            setState={setRegistrationState}/>
                        <InputTextComponent name="lastname" label="Cognome" type="text"
                                            value={registrationState.form.fields.lastname}
                                            setState={setRegistrationState}/>
                        <InputTextComponent name="password" label="Password" type="text"
                                            value={registrationState.form.fields.password}
                                            setState={setRegistrationState}/>
                        <button type="submit" className="btn btn-primary btn-block mb-3">Conferma</button>
                    </div>
                </div>
            </div>
        </div>

    </div>)
}

export default LoginPage;