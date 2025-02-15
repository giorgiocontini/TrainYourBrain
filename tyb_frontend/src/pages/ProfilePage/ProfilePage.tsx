import React, {useContext, useState} from 'react';
import './ProfilePage.scss';
import {AuthContext} from "../../AuthContext";
import PageTitle from "../../components/PageTitle/PageTitle";
import InputTextComponent from "../../components/form-fields/InputTextComponent/InputTextComponent";
import {showDialogFailed, showDialogSuccess} from "../../utils/DialogUtils";
import UserClient from "../../services/API/openapicode_tyb_user/UserClient";
import {useNavigate} from "react-router-dom";
import ModalPortal from "../../components/ModalPortal/ModalPortal";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import PageSubtitle from "../../components/PageSubtitle/PageSubtitle";
import {useFormik} from "formik";
import * as Yup from "yup";
import PageDescription from "../../components/PageDescription/PageDescription";


const ProfilePage = () => {

    const {user, setUser} = useContext(AuthContext);
    const navigate = useNavigate()

    const [showModalChangePw, setShowModalChangePw] = useState(false)
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)

    const deleteUserFunction = () => {
        UserClient.deleteUserUsingDelete({
            username: user.username,
            password: formikDeleteProfile.values.password
        }).then(response => {

            if (response?.data?.codice === "OK") {
                showDialogSuccess("", response.data.descrizione || "", () => {
                    sessionStorage.clear();
                    setUser(undefined)
                    navigate("/", {replace: true});
                });
            } else {
                showDialogFailed(response.data.descrizione);
            }
        })
            .catch(error => {
                showDialogFailed(error?.response.data?.esito.descrizione || "");
            });
    }

    const initialValuesChangePw = {passwordAttuale: "", nuovaPassword: "", confermaPassword: ""};
    const initialValuesDelete = {password: ""};
    const formikChangePw = useFormik({
        initialValues: initialValuesChangePw,
        validationSchema: Yup.object().shape({
            passwordAttuale: Yup.string().required('Campo obbligatorio'),
            nuovaPassword: Yup.string().required('Campo obbligatorio'),
            confermaPassword: Yup.string()
                .oneOf([Yup.ref('nuovaPassword')], 'Le password non coincidono')
                .required('Campo obbligatorio')
        }), onSubmit: () => {
            changePWFunction()
        }
    });

    const formikDeleteProfile = useFormik({
        initialValues: initialValuesDelete,
        validationSchema: Yup.object().shape({
            password: Yup.string().required('Campo obbligatorio')
        }), onSubmit: () => {
            deleteUserFunction()
        }
    });

    const changePWFunction = () => {
        UserClient.changePasswordUsingPut({
            username: user.username,
            oldPassword: formikChangePw.values.passwordAttuale,
            newPassword: formikChangePw.values.nuovaPassword
        }).then(response => {
            if (response?.data?.codice === "OK") {
                showDialogSuccess("", response.data.descrizione || "", () => {
                    setShowModalChangePw(false);
                    resetFormPw();
                });
            } else {
                showDialogFailed(response.data.descrizione);
            }
        })
            .catch(error => {
                showDialogFailed(error?.response.data?.esito.descrizione || "");
            });
    }
    const resetFormPw = () => {
        const {values, errors, ...other} = formikChangePw
        formikChangePw.resetForm({...other, values: initialValuesChangePw, errors: initialValuesChangePw})
    }

    const resetDelete = () => {
        const {values, errors, ...other} = formikDeleteProfile
        formikDeleteProfile.resetForm({...other, values: initialValuesDelete, errors: initialValuesDelete})
    }
    return (
        <div>
            <PageTitle title={"Dettaglio Profilo"}/>

            <div className="d-flex justify-content-around mt-5 grid-row">
                <div>
                    <InputTextComponent name={"username"} label={"Username"} type={"text"} value={user.username}
                                        disabled={true}/>
                    <InputTextComponent name={"name"} label={"Nome"} type={"text"} value={user.name || "-"}
                                        disabled={true}/>
                    <InputTextComponent name={"surname"} label={"Cognome"} type={"text"} value={user.surname || "-"}
                                        disabled={true}/>
                    <InputTextComponent name={"email"} label={"Email"} type={"text"} value={user.email || "-"}
                                        disabled={true}
                    />
                    <InputTextComponent name={"role"} label={"Ruolo"} type={"text"}
                                        value={user.role === "A" ? "Admin" : "Studente"} disabled={true}
                    />
                    <div className={"d-flex"}>
                        <button
                            className={"Button-style btn btn-primary b-0 me-auto"}
                            disabled={false}
                            onClick={() => {
                                setShowModalChangePw(true);
                            }}
                        >Cambia password
                        </button>
                        <button
                            className={"Button-style btn btn-danger b-0"}
                            disabled={false}
                            onClick={() => {
                                setShowModalDeleteUser(true);
                            }}
                        >Elimina Profilo
                        </button>
                    </div>

                </div>
            </div>

            <ModalPortal display={showModalChangePw} element={
                <div>
                    <PageSubtitle subtitle={"Inserisci la nuova password"}/>
                    <div className="mt-5">
                        <InputTextComponent name={"passwordAttuale"} label={"Password attuale"} type={"password"}
                                            formik={formikChangePw}
                        />
                        <InputTextComponent name={"nuovaPassword"} label={"Nuova password"} type={"password"}
                                            formik={formikChangePw}
                        />
                        <InputTextComponent name={"confermaPassword"} label={"Conferma password"} type={"password"}
                                            formik={formikChangePw}
                        />
                        <div className={"d-flex justify-content-between mt-5"}>
                            <button
                                className={"Button-style btn btn-outline-danger"}
                                disabled={false}
                                onClick={() => {
                                    setShowModalChangePw(false);
                                    resetFormPw();
                                }}
                            >Annulla
                            </button>
                            <button
                                className={"Button-style btn btn-primary"}
                                disabled={false}
                                onClick={() => {
                                    formikChangePw.handleSubmit()
                                }}
                            >Aggiorna Password
                            </button>
                        </div>
                    </div>

                </div>
            }/>
            <ModalComponent display={showModalDeleteUser} element={
                <div>
                    <PageSubtitle subtitle={"Elimina il profilo"}/>
                    <PageDescription description={"Vuoi davvero eliminare il tuo account? Inserisci la password per" +
                        " confermare"}/>
                    <div className="mt-5">
                        <InputTextComponent name={"password"} label={"Password"} type={"password"}
                                            formik={formikDeleteProfile}
                        />
                        <div className={"d-flex justify-content-between mt-5"}>
                            <button
                                className={"Button-style btn btn-outline-danger"}
                                disabled={false}
                                onClick={() => {
                                    setShowModalDeleteUser(false);
                                    resetDelete();
                                }}
                            >Annulla
                            </button>
                            <button
                                className={"Button-style btn btn-primary"}
                                disabled={false}
                                onClick={() => {
                                    formikDeleteProfile.handleSubmit()
                                }}
                            >Conferma
                            </button>
                        </div>
                    </div>

                </div>
            }/>

        </div>
    );
};

export default ProfilePage;

// Esempio di utilizzo del componente UserProfile
// import UserProfile from './UserProfile';

// const user = {
//   name: 'John Doe',
//   email: 'johndoe@example.com',
//   profilePicture: 'https://example.com/johndoe.jpg',
//   bio: 'Software engineer with a passion for open source projects and community building.',
// };

// function App() {
//   return (
//     <div>
//       <UserProfile user={user} />
//     </div>
//   );
// }

// export default App;
