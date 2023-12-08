import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import ToggleButtonComponent from "../../components/ToggleComponent/ToggleButtonComponent";
import UserService from "../../services/API/User/UserService";
import {TUser} from "../../types/types";
import {AuthContext} from "../../AuthContext";
import {useFormik} from "formik";
import * as Yup from 'yup';
import InputTextComponent from "../../components/form-fields/InputTextComponent/InputTextComponent";
import CheckboxComponent from "../../components/form-fields/CheckboxComponent/CheckboxComponent";
import {User} from "../../services/API/openapicode_tyb_user";
import {USER_ROLE} from "../../utils/const";
import UserClient from "../../services/API/openapicode_tyb_user/UserClient";


const LoginRegistrationPage = () => {

    const {setUser} = useContext(AuthContext);
    const [isLogin, setLogin] = useState(true)
    const [isProfessor, setProfessor] = useState(false)
    const navigate = useNavigate();

    const initialFormState : User = {
        username: "", name: "", surname: "", email: "", password: "", role:""
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
        UserClient.createUserUsingPOST(formik.values)
            .then(response => {
                console.log(response)
                //riporto l'utente alla finestra di login per fare l'accesso
                //TODO gestire l'oggetto di risposta manca implementazione BE
                handleTabChanges();
            }).catch(err => {
            console.log(err)
        })
    }

    function loginFunction() {
        //Chiamo il servizio da be
        UserClient.recuperateUserByUsernameAndPasswordUsingGET(formik.values)
            //chiamato quando si ottengono le risposte dal web service
            .then(response => {
                //Posso gestire i dati recuperati
                //TODO gestire l'oggetto di risposta manca implementazione BE

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

    function manageRoleBeforeSave() {
        formik.setFormikState((oldState: any) => {
            const newState = {...oldState};
            newState.values.role = isProfessor ? USER_ROLE.PROFESSORE : USER_ROLE.STUDENTE;
            return newState;
        });
    }

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
                        <div className="d-flex flex-row justify-content-between mb-3">
                            <CheckboxComponent name="typeP" label={"Professore"} checked={isProfessor} onChange={()=>{setProfessor(true)}}/>
                            <CheckboxComponent name="typeS" label={"Studente"} checked={!isProfessor} onChange={()=>{setProfessor(false)}}/>
                        </div>

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
