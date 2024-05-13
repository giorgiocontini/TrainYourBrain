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
import PlotComponent from "../../components/PlotComponent/PlotComponent";
import PageDescription from "../../components/PageDescription/PageDescription";
import ToggleButtonComponent from "../../components/ToggleComponent/ToggleButtonComponent";


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
        debugger

        if (isInRole("P") || isInRole("A")){
            //recupero i dati di tutti gli utenti
            getTableDate("all")
        }else{
            //recupero i dati dello studente loggato
            getTableDate(user?.username)

        }
    }, [user]);

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
    const [showCart, setShowChart] = useState(true)


    return <div>
        <PageTitle title={"Le tue statistiche"}/>
        <PageDescription description={"Di seguito i risultati raggiunti distinti per argomento e data"}/>
        <div className={"container p-4"}>

            <div className="d-flex row justify-content-between mt-3" style={{alignItems:"center"}}>
                <div className="col-lg-9 col-sm-12">
                    <ToggleButtonComponent flag={showCart} setFlag={setShowChart} option2={"Tabella"} option1={"Grafici"}/>
                </div>
                <div className="col-lg-3 col-sm-12 mb-2" >
                    <ExportXLSXButton columns={getColumns} data={tableData} fileName={"Statistiche"} customStyle={"d-flex me-0 ms-auto"}/>
                </div>
            </div>

            {showCart ? <div className={"border rounded shadow"}>
                <PlotComponent label={"Math"} data={tableData.map((el) => {
                    return {label: el.topic, value: el.totalScore, labelAX: el.date || "test"}
                })} plotType={"line"}/>
            </div> : <div>
                <ReactTable columns={getColumns} data={tableData} hasPagination={true}
                            initialState={{pageSize: 10, pageIndex: 0}} border={true} hasSorting={true}/>
            </div>}


        </div>


    </div>
}

export default StatisticsPage;
