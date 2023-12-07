import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ToggleButtonComponent from "../../components/ToggleComponent/ToggleButtonComponent";
import UserService from "../../services/API/User/UserService";
import {TUser} from "../../types/types";
import {AuthContext} from "../../AuthContext";
import {useFormik} from "formik";
import * as Yup from 'yup';
import InputTextComponent from "../../components/form-fields/InputTextComponent/InputTextComponent";


const LoginRegistrationPage = () => {

    const {setUser} = useContext(AuthContext);
    const [isLogin, setLogin] = useState(true)
    const navigate = useNavigate();

    const initialFormState = {
        username: "", name: "", surname: "", email: "", password: ""
    }

    //metodo di gestione degli errori
    function handleError(error: any) {
        console.log(error?.response?.data?.message)
    }

    //metodo di gestione della response
    function handleResponse(response: any) {

        if (response && response.status === 200) {
            setUser(response.data);
            navigate("/home", {replace: true})
        }
    }

    //metodo di gestione dei tab (log/reg)
    const handleTabChanges = () => {
        resetFormikForm();
        setLogin(!isLogin);
    }

    //Services
    function addUserFunction() {

        const payload: TUser = {
            name: formik.values.name,
            surname: formik.values.surname,
            username: formik.values.username,
            role: "A",
            password: formik.values.password
        }

        UserService.createUser(payload)
            .then(response => {
                console.log(response)
                //riporto l'utente alla finestra di login per fare l'accesso
                handleTabChanges();
            }).catch(err => {
            console.log(err)
        })
    }

    function loginFunction() {
        //Chiamo il servizio da be
        UserService.getUser(formik.values)
            //chiamato quando si ottengono le risposte dal web service
            .then(response => {
                //Posso gestire i dati recuperati
                if (response != null) {
                    handleResponse(response)
                }

            })
            //in caso di errore
            .catch(error => handleError(error))

    }

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Campo obbligatorio'),
        password: Yup.string().required('Campo obbligatorio')
    })

    const formik = useFormik({
        initialValues: initialFormState, validationSchema: validationSchema, onSubmit: () => {
            isLogin ? loginFunction() : addUserFunction()
        }
    });

    const resetFormikForm = () => {
        formik.setFormikState((oldState: any) => {
            const newState = {...oldState};
            newState.values = initialFormState;
            return newState;
        });

        formik.setErrors(initialFormState)
    };

    return (<div className="row">
        <div className="col-6">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                 className="img-fluid" alt="image"/>
        </div>
        <div className="col-6 p-4">
            <ToggleButtonComponent flag={isLogin} setFlag={setLogin} option1={"Accedi"} option2={"Registrati"}
                                   functionToReset={resetFormikForm}/>
            <div className="tab-content">
                <div className={"tab-pane fade show " + (isLogin ? "active" : "")}
                     id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                    <div className="form p-5">
                        <InputTextComponent
                            label="Username"
                            name="username"
                            isRequired
                            formik={formik}/>
                        <InputTextComponent label="Password" type="password"
                                            name="password" formik={formik}
                                            isRequired/>
                        <div className="flex-row mb-4">
                            <div className="d-flex justify-content-center">
                                <a className="fa-underline" style={{cursor: "pointer"}}>Password dimenticata?</a>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block mb-4"
                                onClick={() => {
                                    formik.handleSubmit()
                                }}>Accedi
                        </button>

                        <div className="text-center mt-3">
                            <p>Non sei registrato? <a className="fa-underline" style={{cursor: "pointer"}}
                                                      onClick={handleTabChanges}>Registrati</a></p>
                        </div>
                    </div>
                </div>
                <div className={"tab-pane fade show " + (!isLogin ? "active" : "")}
                     id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                    <div className="form p-5">
                        <InputTextComponent id="username_reg" name="username" label="Username" type="text"
                                            formik={formik}
                                            isRequired/>
                        <InputTextComponent name="email" label="Email" type="email"
                                            formik={formik}/>
                        <InputTextComponent name="name" label="Nome" type="text"
                                            formik={formik}/>
                        <InputTextComponent name="surname" label="Cognome" type="text"
                                            formik={formik}
                        />
                        <InputTextComponent id="password_reg" name="password" label="Password" type="password"
                                            isRequired formik={formik}
                        />
                        <button type="submit" onClick={() => formik.handleSubmit()}
                                className="btn btn-primary btn-block mb-3 mt-5">Conferma
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>)
}

export default LoginRegistrationPage;
