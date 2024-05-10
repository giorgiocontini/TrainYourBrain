import React, {useContext, useEffect, useState} from 'react';
import {useLocation} from "react-router-dom"

/**
 * Locals
 */
import "./AddQuizPage.scss";
import {AuthContext} from "../../AuthContext";
import {QuestionType} from "../../services/API/openapicode_tyb_user";
import ExportXLSXButton from "../../components/ExcelButton/ExportXLSXButton";
import ExcelReader from "../../components/ExcelButton/ExcelReader";
import QuizClient from "../../services/API/openapicode_tyb_user/QuizClient";
import {showDialogFailed, showDialogSuccess} from "../../utils/DialogUtils";
import PageTitle from "../../components/PageTitle/PageTitle";
import NotificationComponent from "../../components/NotificationComponent/NotificationComponent";
import InputTextComponent from "../../components/form-fields/InputTextComponent/InputTextComponent";
import {useFormik} from "formik";
import * as Yup from "yup";


const AddQuizPage = () => {

    const [dataToSave, setDataToSave] = useState([])


    const templateColumns = [{
        Header: "Domanda",
        accessor: "domanda"
    }, {
        Header: "Risposta",
        accessor: "risposta"
    }, {
        Header: "Corretta",
        accessor: "corretta"
    }]



    const initialFormState = {
        topic: "",
        file: undefined
    }

    const validationSchema = Yup.object().shape({
        topic: Yup.string().required('Campo obbligatorio'),
        file: Yup.mixed().required('Devi caricare un file')
    })

    const manageDataGotFromExcel = (data: QuestionType[]) => {

        QuizClient.createQuizUsingPost(data.map(el => {
            return {...el, topic: formik.values.topic};
        })).then(
            (response) => {
                showDialogSuccess("", response.data.descrizione, () => {
                    formik.resetForm({...formik,values: initialFormState, errors:{}});
                })

            }
        ).catch((error) => {
            showDialogFailed(error?.response?.data.error)
        })

    }
    const formik = useFormik({
        initialValues: initialFormState, validationSchema: validationSchema, onSubmit: () => {
            manageDataGotFromExcel(dataToSave);
        }
    });


    return <div>
        <PageTitle title={"Aggiungi un quiz"}/>
        <NotificationComponent className={"mt-3"} type={"info"} messages={"In questa pagina potrai inserire un quiz" +
            " seguendo gli step" +
            " sotto."} children={<ul>
            <li>{"Specifica l'argomento per cui vuoi inserire il quiz (questo verra' visualizzato in hompage)"}</li>
            <li>{"Scarica il template che sara' prepopolato con l'argomento specificato e compilalo con le domande e" +
                " le relative risposte"}</li>
            <li>{"Carica il file completo utilizzando l'apposito tasto di salvataggio"}</li>
        </ul>}/>


        <div className="row" style={{alignItems: "center"}}>

            <div className={"col-lg-6 col-sm-12 "}>
                <InputTextComponent label={"Argomento"} formik={formik} name={"topic"} isRequired={true}/>
            </div>
            <div className={"col-lg-2 col-sm-12 mt-2"}>
                <ExportXLSXButton disabled={!formik.values.topic} columns={templateColumns} data={[{}]}
                                  fileName={"Quiz_" + formik.values.topic}
                                  title={"Scarica Template"}/></div>
            <div className={"col-lg-4 col-sm-12 mt-2"}>
                <ExcelReader manageDataFunction={(risultato: any) => {
                    setDataToSave(risultato);
                }} formik={formik}/>
            </div>


        </div>

        <div className={"row mt-3 d-flex ms-auto me-auto"}>
            <button className={"btn btn-primary"} type={"submit"} onClick={() => formik.handleSubmit()}
                    title={"Salva"}>Salva
            </button>
        </div>


    </div>
}

export default AddQuizPage;
