import React, {useEffect, useState} from 'react';

/**
 * Locals
 */
import "./AddQuizPage.scss";
import {QuestionType, QuestionTypeAnswersInner} from "../../services/API/openapicode_tyb_user";
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
import ImageFolderUploader, {ImageData} from "../../components/ImageFolderUploader/ImageFolderUploader";
import ToggleButtonComponent from "../../components/ToggleComponent/ToggleButtonComponent";


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

    const [foldertoJson, setFolderToJson] = useState<ImageData[]>([]);

    const [quizTestuale, setQuizTestuale] = useState(true);
    const [fileImage, setFileImage] = useState<string | undefined>(undefined);

    const templateColumns = [{
        Header: "Domanda",
        accessor: "domanda"
    }, {
        Header: "Risposta",
        accessor: "risposta"
    }, {
        Header: "Corretta(Si/No)",
        accessor: "corretta"
    }]

    const initialFormState = {
        topic: "",
        topicDescription: "",
        file: undefined
    }

    const validationSchema = Yup.object().shape({
        topic: Yup.string().required('Campo obbligatorio'),
        topicDescription: Yup.string().required('Campo obbligatorio')
    })

    const createQuiz = (data: QuestionType[]) => {
        debugger
        QuizClient.createQuizUsingPost({
                questions: data,
                ...formik.values,
                imagesQuiz: !quizTestuale,
                imageFile: fileImage
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

            createQuiz(quizTestuale ? dataToSave : transformData(foldertoJson));
        }
    });

    function transformData(folderToJson: ImageData[]): QuestionType[] {
        // Helper function to get random indices for incorrect answers

        return folderToJson.map((item, index, array) => {
            const fileNames = folderToJson.map(item => item.fileName);
            const filtered = fileNames.filter(filename => filename !== item.fileName)
            const shuffledFileNames = filtered.sort(() => Math.random() - 0.5);
            // Build answers array
            const answers: QuestionTypeAnswersInner[] = [
                {
                    description: item.fileName,
                    isCorrect: true
                },
                ...shuffledFileNames.slice(0, 3).map(desc => ({
                    description: desc,
                    isCorrect: false
                }))
            ];

            // Shuffle answers to randomize the position of the correct answer
            answers.sort(() => Math.random() - 0.5);

            return {
                description: item.base64,
                answers
            };
        });
    }

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    useEffect(() => {
        if (quizTestuale){
            setFolderToJson([])
        }else{
            formik?.setFormikState((oldState: any) => {
                const newState = {...oldState};
                newState.values["file"] = undefined;
                return newState;
            });
        }
    }, [quizTestuale]);

    return <div className={"mb-5"}>
        <PageTitle title={"Aggiungi un quiz"}/>
        <div className="container">
            <NotificationComponent className={"mt-3"} type={"info"}
                                   messages={"In questa pagina potrai inserire un quiz" +
                                       " seguendo gli step" +
                                       " sotto."} children={<ul>
                <li>{"Scegli la tipologia di quiz che vuoi inserire, le opzioni sono \"Quiz testuale\" oppure" +
                    " \"Quiz ad immagini\""}</li>
                <li>{"Specifica l'argomento e una descrizione breve"}</li>
                {quizTestuale ?
                    <li>{"Scarica il template, compilalo e poi caricalo utilizzando l'apposito tasto"}</li> :
                    <li>{"Seleziona la cartella da cui caricare le immagini"}</li>}

            </ul>}/>


            <div className="row" style={{alignItems: "center"}}>


                <div className={"col-12 mb-3"}>
                    <ToggleButtonComponent flag={quizTestuale} setFlag={setQuizTestuale} option1={"Testuale"}
                                           option2={"Immagini"}/>
                </div>
                <div className={"col-lg-6 col-sm-12 "}>
                    <InputTextComponent label={"Argomento"} formik={formik} name={"topic"} isRequired={true}/>
                </div>
                <div className={"col-lg-6 col-sm-12 "}>
                    <InputTextComponent label={"Descrizione"} formik={formik} name={"topicDescription"}
                                        isRequired={true}/>
                </div>
                {quizTestuale ? <>
                    <div className={"col-lg-2 col-sm-12 mt-2"}>
                        <ExportXLSXButton disabled={!formik.values.topic} columns={templateColumns} data={[{}]}
                                          fileName={"Quiz_" + formik.values.topic}
                                          title={"Scarica Template"}/></div>
                    <div className={"col-lg-4 col-sm-12 mt-2"}>
                        <ExcelReader manageDataFunction={(risultato: any) => {
                            setDataToSave(risultato);
                        }} formik={formik}/>
                    </div>
                </> : <>
                    <div className={"col-lg-6 col-sm-12 mt-2"}><ImageFolderUploader folderState={foldertoJson}
                                                                                    isRequired={true} disabled={false}
                                                                                    setFolderState={setFolderToJson}/>
                    </div>
                </>}
                <div className={"col-lg-4 col-sm-12 mt-2"}>
                    <FileUploaderComponent
                        labelButton={"Carica una copertina"}
                        disabled={!formik.values.topic}
                        name={"imageFile"}
                        handleFile={async (file) => {
                            const base64 = await fileToBase64(file);
                            setFileImage(base64);
                        }}
                    />
                </div>
            </div>
            <div className={"row mt-5 d-flex ms-auto me-auto"}>
                <button className={"btn btn-primary mt-4"} type={"submit"} onClick={() => formik.handleSubmit()}
                        title={"Salva"}
                        disabled={!(formik.values.topic !== ""
                            && formik.values.topicDescription !== ""
                            && (formik.values.file !== undefined || foldertoJson.length > 0))}>Salva
                </button>
            </div>

        </div>


    </div>
}

export default AddQuizPage;
