import React, {useState} from 'react';

/**
 * Locals
 */
import "./AddQuizPage.scss";
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

import {getDocument, GlobalWorkerOptions} from 'pdfjs-dist';
import 'pdfjs-dist/legacy/build/pdf.worker';
import FileUploaderComponent from "../../components/FileUploaderComponent/FileUploaderComponent";


GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/x.y.z/pdf.worker.js'; // Sostituisci x.y.z con la versione corretta

const loadPdf = async (file: Blob) => {
    const loadingTask = getDocument(URL.createObjectURL(file));
    const pdf = await loadingTask.promise;
    let textContent = '';

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const text = await page.getTextContent();
        textContent += text.items.map((item: any) => item.str).join(' ');
    }

    console.log(textContent);  // Log del testo estratto per debug
};

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
        topicDescription: "",
        file: undefined,
        imageFile: undefined
    }

    const validationSchema = Yup.object().shape({
        topic: Yup.string().required('Campo obbligatorio'),
        topicDescription: Yup.string().required('Campo obbligatorio'),
        file: Yup.mixed().required('Devi caricare un file'),
        imageFile: Yup.mixed().required('Devi caricare un file')
    })

    const manageDataGotFromExcel = (data: QuestionType[]) => {
        debugger
        QuizClient.createQuizUsingPost({
                questions: data,
                ...formik.values
            }
        ).then(
            (response) => {
                showDialogSuccess("", response.data.descrizione, () => {
                    formik.resetForm({...formik, values: initialFormState, errors: {}});
                })

            }
        ).catch((error) => {
            showDialogFailed(error?.response?.data.error)
        })

    }
    const formik = useFormik({
        initialValues: initialFormState, validationSchema: validationSchema, onSubmit: () => {
            debugger
            manageDataGotFromExcel(dataToSave);
        }
    });

    return <div className={"mb-5"}>
        <PageTitle title={"Aggiungi un quiz"}/>
        <div className="container">
            <NotificationComponent className={"mt-3"} type={"info"}
                                   messages={"In questa pagina potrai inserire un quiz" +
                                       " seguendo gli step" +
                                       " sotto."} children={<ul>
                <li>{"Specifica l'argomento per cui vuoi inserire il quiz (questo verra' visualizzato in hompage)"}</li>
                <li>{"Scarica il template e compilalo con le domande e" +
                    " le relative risposte"}</li>
                <li>{"Carica il file completo utilizzando l'apposito tasto di salvataggio"}</li>
            </ul>}/>


            <div className="row" style={{alignItems: "center"}}>

                <div className={"col-lg-6 col-sm-12 "}>
                    <InputTextComponent label={"Argomento"} formik={formik} name={"topic"} isRequired={true}/>
                </div>
                <div className={"col-lg-6 col-sm-12 "}>
                    <InputTextComponent label={"Descrizione"} formik={formik} name={"topicDescription"}
                                        isRequired={true}/>
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
                <div className={"col-lg-4 col-sm-12 mt-2"}>
                    <FileUploaderComponent acceptFile={".png, .jpg"}
                                           labelButton={"Carica File"}
                                           disabled={!formik.values.topic}
                                           isRequired={true}
                                           name={"imageFile"}
                                           handleFile={(file: File) => {
                                               const reader = new FileReader();
                                               reader.onload = (readEvent) => {
                                                   const base64 = readEvent.target?.result as string;
                                                   formik.setFormikState((oldState: any) => {
                                                       const newState = {...oldState};
                                                       newState.values["imageFile"] = base64;
                                                       return newState;
                                                   });
                                               };
                                               reader.readAsDataURL(file);
                                           }}/>
                </div>

                {
                    //    <div className={"col-lg-4 col-sm-12 mt-2"}>
                    //    Carica file pdf
                    //    <FileUploaderComponent acceptFile={".pdf"}
                    //                           labelButton={"Carica File Pdf"}
                    //                           disabled={!formik.values.topic}
                    //                           isRequired={true}
                    //                           handleFile={loadPdf}/>
                    //</div>
                }


            </div>

            <div className={"row mt-3 d-flex ms-auto me-auto"}>
                <button className={"btn btn-primary"} type={"submit"} onClick={() => formik.handleSubmit()}
                        title={"Salva"}>Salva
                </button>
            </div>

        </div>


    </div>
}

export default AddQuizPage;
