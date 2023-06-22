import React, {useState} from "react";
import {useParams} from "react-router-dom"
import DataTable from 'react-data-table-component';


//column{
// name,
// accessor,
// cell}


const TableComponent = ({
                            columns,
                            data
                        }:{columns:any, data:any}) => {

    const params = useParams();
    return (<div className="TableComponent">
        <DataTable columns={columns} data={data} className="table-responsive" defaultSortAsc={true}/>
    </div>)
}

export default TableComponent;