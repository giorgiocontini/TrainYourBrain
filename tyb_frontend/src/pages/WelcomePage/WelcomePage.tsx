import React, {useState} from "react";
import {useParams} from "react-router-dom"
import TableComponent from "../../components/TableComponent/TableComponent";

const WelcomePage = () => {

   //const [dataTable] = useState(
   //    [
   //        {nome: "nome1", matricola: "11111111", punteggio: "12345"},
   //        {nome: "nome2", matricola: "11111111", punteggio: "12345"},
   //        {nome: "nome3", matricola: "11111111", punteggio: "12345"},
   //        {nome: "nome6", matricola: "11111111", punteggio: "12345"},
   //        {nome: "nome5", matricola: "11111111", punteggio: "12345"},
   //    ]
   //)
   //const columns = [
   //    {
   //        name: "nome",
   //        selector: "nome"
   //    }, {
   //        name: "matricola",
   //        selector: "matricola"
   //    },
   //    {
   //        name: "punteggio",
   //        selector: "punteggio"
   //    }
   //]

    const params = useParams();

    return (<div className="WelcomePage">
        <h1>Benvenuto su TRAIN YOUR BRAIN, comincia subito ad allenare la mente!</h1>
    </div>)
}

export default WelcomePage;