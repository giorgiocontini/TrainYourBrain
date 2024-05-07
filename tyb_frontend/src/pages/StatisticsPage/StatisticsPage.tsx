import React, {useContext, useEffect, useMemo, useState} from 'react';
import {useLocation} from "react-router-dom"

/**
 * Locals
 */
import "./StatisticsPage.scss";
import {AuthContext} from "../../AuthContext";
import ReactTable from "../../components/ReactTable/ReactTable";
import QuizClient from "../../services/API/openapicode_tyb_user/QuizClient";
import {showDialogFailed} from "../../utils/DialogUtils";
import {UserQuizResultType} from "../../services/API/openapicode_tyb_user";
import {getDateFormatted} from "../../utils/commonFunctions";
import ExportXLSXButton from "../../components/ExcelButton/ExportXLSXButton";
import PageTitle from "../../components/PageTitle/PageTitle";


const StatisticsPage = () => {

    const {user, isInRole} = useContext(AuthContext)
    const {state: location} = useLocation();
    const {topic} = location || {};

    const [tableData, setTableData] = useState<UserQuizResultType[]>([])

    const getTableDate=(userId:string)=>{
        QuizClient.getQuizResultsByUserId(userId).then(
            (res) => {
                setTableData(res.data.result || [])
            }
        ).catch((error) => {
            showDialogFailed(error?.response?.data.error)
        })
    }
    useEffect(() => {
        //TODO chiamare il servizio per recuperare i dati
        if (isInRole("P") || isInRole("A")){
            //recupero i dati di tutti gli utenti
            getTableDate("all")
        }else{
            //recupero i dati dello studente loggato
            getTableDate(topic)

        }
    }, []);

    const getColumns=useMemo(()=>{
        return [{
            Header: "Id utente",
            accessor: "userId"
        }, {
            Header: "Argomento",
            accessor: "topic"
        }, {
            Header: "Punteggio",
            accessor: "totalScore"
        },{
            Header: "Data completamento",
            accessor: "date"
        }]
    }, []);

    return <div>
        <PageTitle title={"Le tue statistiche"}/>
        <div className="d-flex flex-row ms-auto">
            <ExportXLSXButton columns={getColumns} data={tableData} fileName={"test"}/>
        </div>
        <div className="m-5">
            <ReactTable columns={getColumns} data={tableData} hasPagination={true}
                        initialState={{pageSize: 10, pageIndex: 0}} border={true}  hasSorting={true}/>
        </div>


    </div>
}

export default StatisticsPage;
