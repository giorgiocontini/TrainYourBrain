import React, {useEffect} from 'react';
import * as XLSX from 'xlsx';
import {QuestionType} from "../../services/API/openapicode_tyb_user";
import FileUploaderComponent from "../FileUploaderComponent/FileUploaderComponent";

const ExcelReader = ({manageDataFunction, formik}: { manageDataFunction: Function, formik:any}) => {
    const handleFileUpload = (file:any): void => {
        //const file = e.target.files?.[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const data = event.target?.result;
            if (!data) {
                return;
            }

            const workbook = XLSX.read(data, {type: 'binary'});
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            // Converti il foglio di lavoro in un array di oggetti
            const excelData = XLSX.utils.sheet_to_json(worksheet, {header: 1}).slice(1).map((row: any) => {
                return {
                    description: row[0],
                    answer: row[1],
                    isCorrect: row[2] === "Si"
                }
            });

            const getObjectForQuiz: {
                [question: string]: {
                    description: string,
                    answers: { answer: string, isCorrect: boolean }[]
                }
            } = excelData.reduce((acc, oggetto) => {
                const {description, answer, isCorrect} = oggetto;
                if (!acc[description as keyof {}]) {
                    //@ts-ignore
                    acc[description as keyof {}] = {description, answers: []};
                }
                (acc[description as keyof {}] as QuestionType).answers.push({description: answer, isCorrect: isCorrect});
                return acc;
            }, {});

            const risultato = Object.values(getObjectForQuiz);

            //  Gestiamo i dati dell'Excel
            manageDataFunction(risultato);

        };
        reader.readAsBinaryString(file);
    };

    useEffect(() => {
        handleFileUpload(formik.values.file);
    }, [formik.values.file]);

    return (
        <div className={"text-center"}>
            <FileUploaderComponent acceptFile={".xlsx, .xls"}
                                   labelButton={"Carica Excel"}
                                   disabled={!formik.values.topic}
                                   isRequired={true}
                                   name={"file"}
                                   formik={formik}/>
        </div>
    );
}

export default ExcelReader;
