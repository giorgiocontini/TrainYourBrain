import React from 'react';
import {Outlet} from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent/HeaderComponent";
import FooterComponent from "../components/FooterComponent/FooterComponent";

const RootLayout = () => {

    {//TODO definire l'header e il footer per tutta l'applicazione
    }

    return <div>
        <HeaderComponent/>
        <main className="container rounded shadow p-5">
            <Outlet/>
        </main>
        <FooterComponent/>
    </div>
}


export default RootLayout;