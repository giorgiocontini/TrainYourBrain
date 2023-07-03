import React, {useContext, useEffect} from 'react';
import {Outlet} from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent/HeaderComponent";
import FooterComponent from "../components/FooterComponent/FooterComponent";
import {AuthContext} from "../AuthContext";

const RootLayout = () => {


    return <div>
                <HeaderComponent/>
                <main className="container rounded shadow p-5" style={{backgroundColor:"rgba(222,220,220,0.54)"}}>
                    <Outlet/>
                </main>
                <FooterComponent/>
            </div>
}


export default RootLayout;