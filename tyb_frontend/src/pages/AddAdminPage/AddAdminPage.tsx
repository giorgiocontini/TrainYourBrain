import React, {useContext, useEffect, useState} from 'react';
import './AddAdminPage.scss';
import {AuthContext} from "../../AuthContext";
import PageTitle from "../../components/PageTitle/PageTitle";
import InputTextComponent from "../../components/form-fields/InputTextComponent/InputTextComponent";
import {useNavigate} from "react-router-dom";
import PageDescription from "../../components/PageDescription/PageDescription";
import ReactTable from "../../components/ReactTable/ReactTable";
import PageSubtitle from "../../components/PageSubtitle/PageSubtitle";
import UserClient from "../../services/API/openapicode_tyb_user/UserClient";
import {showDialogFailed, showDialogSuccess} from "../../utils/DialogUtils";
import {AdminType, UserType} from "../../services/API/openapicode_tyb_user";


const AddAdminPage = () => {

    const {user, setUser} = useContext(AuthContext);
    const navigate = useNavigate()

    const [emailToAdd, setEmailToAdd] = useState("")

    const columns = [{
        Header: "Email",
        accessor: "email"
    }, {
        Header: "Username",
        accessor: "username"
    }, {
        Header: "Data Nomina",
        accessor: "dataNomina"
    }, {
        Header: "Nominante",
        accessor: "nominante"
    }]

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [data, setData] = useState<AdminType[]>([])

    function addAdminFunction() {
        UserClient.addAdminUsingPost({email: emailToAdd, nominante: user.username})
            .then(response => {
                showDialogSuccess("", response.data.descrizione || "", () => {
                    getAddminsFunction();
                });
            })
            .catch(error => {
                showDialogFailed(error?.response.data?.esito.descrizione || "");
            });
    }

    function getAddminsFunction() {
        UserClient.getAdminsUsingGet()
            .then(response => {
                setData(response?.data?.result || [])
            })
            .catch(error => {
                //showDialogFailed(error?.response.data?.esito.descrizione || "");
            });
    }

    useEffect(() => {
        getAddminsFunction();
    }, []);
    return (
        <div>
            <PageTitle title={"Nomina profilo Admin"}/>
            <PageDescription description={"Di seguito puoi indicare una mail per un nuovo profilo admin"}/>

            <div className="row d-flex align-items-center mt-4">
                <div className="col-auto"><InputTextComponent name={"email"} label={"Email"} type={"email"}
                                                              value={emailToAdd} isRequired={true}
                                                              onChange={(name, value) => {
                                                                  setEmailToAdd(value);
                                                              }}/>
                </div>
                <div className="col-auto">
                    <button
                        className={"Button-style btn btn-primary b-0 me-auto"}
                        disabled={!emailRegex.test(emailToAdd)}
                        onClick={() => {
                            addAdminFunction();
                        }}
                    >Aggiungi Admin
                    </button>
                </div>


            </div>
            <div className="mt-4">
                <PageSubtitle subtitle={"Admin presenti"}/>
                <ReactTable columns={columns} data={data} hasPagination={true}
                            initialState={{pageSize: 5, pageIndex: 0}} border={true} hasSorting={true}/>
            </div>
        </div>
    );
};

export default AddAdminPage;
