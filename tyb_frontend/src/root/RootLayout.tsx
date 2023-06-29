import React, {useContext, useEffect} from 'react';
import {Outlet} from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent/HeaderComponent";
import FooterComponent from "../components/FooterComponent/FooterComponent";
import {AuthContext} from "../AuthContext";

const RootLayout = () => {

    const {user, isInRole, isUserLogged} = useContext(AuthContext);

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