import React from 'react';
import {Outlet} from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent/HeaderComponent";
import FooterComponent from "../components/FooterComponent/FooterComponent";


const RootLayout = () => {

    return <div style={{backgroundColor: "lightgray", minHeight:"700px"}} >
        <HeaderComponent/>
        <main className="container rounded shadow mt-3 mb-5" style={{backgroundColor:"white", minHeight:"700px"}}>
            <Outlet/>
        </main>
        <FooterComponent/>
    </div>
}

export default RootLayout;
