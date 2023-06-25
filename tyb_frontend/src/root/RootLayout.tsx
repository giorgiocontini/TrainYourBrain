import React from 'react';
import {Outlet} from "react-router-dom";

const RootLayout = () => {

    {//TODO definire l'header e il footer per tutta l'applicazione
    }
    return <div>
        <main>
            <Outlet/>
        </main>
    </div>
}


export default RootLayout;