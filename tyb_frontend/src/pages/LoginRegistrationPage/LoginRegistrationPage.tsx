import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import ToggleButtonComponent from "../../components/ToggleComponent/ToggleButtonComponent";
import UserService from "../../services/API/User/UserService";
import {TUser} from "../../types/types";
import {AuthContext} from "../../AuthContext";
import {useFormik} from "formik";
import * as Yup from 'yup';
import InputTextComponent from "../../components/form-fields/InputTextComponent/InputTextComponent";


const LoginRegistrationPage = () => {

    const {user, isInRole, setUser} = useContext(AuthContext);

    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false)

    const initialFormState= {
        username: "",
        name: "",
        surname: "",
        email: "",
        password: "",
    }

    //metodo di gestione degli errori
    function handleError(error: any) {
        console.log(error?.response?.data?.message)
    }

    //metodo di gestione
    function handleResponse(response: any) {

        if (response && response.status === 200) {
            setUser(response.data);
            navigate("/home", {replace: true})
        }

    }

    function loginFunction() {

        //Chiamo il servizio da be
        UserService.getUser(initialFormState)
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

    const [isLogin, setLogin] = useState(true)

    const handleTabChanges = () => {
        setLogin(!isLogin);
        reset()
    }

    //Services-------------------------------
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
            }).catch(err => {
            console.log(err)
        })
    }

    function getUserFunction() {

        const payload: TUser = {
            name: undefined,
            surname: undefined,
            username: formik.values.username,
            role: undefined,
            password: undefined
        }

        UserService.getUser(payload)
            .then(response => {
                console.log(response)
            }).catch(err => {
            console.log(err)
        })
    }

    //---------------------------------------



    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Campo obbligatorio'),
        password: Yup.string()
            .required('Campo obbligatorio')
    })

    const formik = useFormik({
        initialValues: initialFormState,
        validationSchema: validationSchema,
        onSubmit: () => {
            isLogin ? loginFunction() : addUserFunction()
        },
    });

    const reset = () => {
        formik.setFormikState((oldState: any) => {
            const newState = {...oldState};
            //Todo vedere se passando l'initial state funziona correttamente, l'alternativa è passare l'oggetto con campi vuoti
            newState.values = {
                username: "",
                name: "",
                surname: "",
                email: "",
                password: "",
            };
            return newState;
        });

        //Todo vedere se passando l'initial state funziona correttamente, l'alternativa è passare l'oggetto con campi vuoti
        formik.setErrors({
            username: "",
            name: "",
            surname: "",
            email: "",
            password: "",
        })
    };

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
                                onClick={()=>formik.handleSubmit}>Accedi
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
                        <InputTextComponent name="username" label="Username" type="text"
                                            formik={formik}
                                            isRequired/>
                        <InputTextComponent name="email" label="Email" type="email"
                                            formik={formik}/>
                        <InputTextComponent name="name" label="Nome" type="text"
                                            formik={formik}/>
                        <InputTextComponent name="surname" label="Cognome" type="text"
                                            formik={formik}
                        />
                        <InputTextComponent name="password" label="Password" type="password"
                                            isRequired formik={formik}
                        />
                        <button type="submit" onClick={()=>formik.handleSubmit}
                                className="btn btn-primary btn-block mb-3 mt-5">Conferma
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>)
}

export default LoginRegistrationPage;