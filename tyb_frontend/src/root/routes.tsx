import React, {useContext, useEffect, useState} from "react";
import LoginPage from "../pages/LoginPage/LoginPage";
import WelcomePage from "../pages/WelcomePage/WelcomePage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HomePage from "../pages/HomePage/HomePage";
import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import RootLayout from "./RootLayout";
import {AuthContext} from "../AuthContext";

export const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" Component={RootLayout}>
                <Route path="login" Component={LoginPage}/>
                <Route path="home" Component={HomePage}/>
                <Route path="welcome/:userId" Component={WelcomePage}/>
                <Route path="*" Component={ErrorPage}/>
            </Route>

        </Route>
    ))

//Metodo che definisce le voci dell'headers in base al ruolo dell'utente loggato
export const useHeaderRoutes = () => {
    const {isInRole} = useContext(AuthContext);
    //const {appText, langForText} = useContext(AppContext);

    //const {LAYOUT_TEXT} = appText;
    const [headerRoutesArr, setHeaderRoutesArr] = useState(genHeaderRoutesArr());

    /**
     * Detect language change in AppContext and react to it.
     */
    useEffect(() => {
        // @ts-ignore
        setHeaderRoutesArr(genHeaderRoutesArr());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    //}, [langForText]);
    }, []);

    /**
     /**
     * Generate routing for corresponding role
     *
     * @returns array of route objects
     */
    function genHeaderRoutesArr() {
        const headerRoutesArrStudents = [
            {type: "nav-link", label: "initial", path: "/"},
            {type: "nav-link", label: "Home", path: "/home"},
            {type: "nav-link", label: "Login", path: "/login"},
           // {
           //     type: "nav-dropdown",
           //     label: LAYOUT_TEXT.ROUTE_LBL_CONSULTATION,
           //     routesArr: [
           //         {label: LAYOUT_TEXT.ROUTE_LBL_SEARCH_INSTANCE, path: routesMap.MULTIPLE_CUM_INSTANCE},
           //         {label: LAYOUT_TEXT.ROUTE_LBL_END_OF_DAY, path: routesMap.HOME_END_DAY},
           //         {label: LAYOUT_TEXT.ROUTE_LBL_PAYMENT_CONSULTATION, path: routesMap.CONSULTATION_PAYMENTS},
           //     ]
           // }
        ];

        const headerRoutesArrProfessors = [
            {type: "nav-link", label: "initial", path: "/"},
            {type: "nav-link", label: "Home", path: "/home"},
            {type: "nav-link", label: "Login", path: "/login"},
        ];

        const headerRoutesArrAdmin = [
            {type: "nav-link", label: "initial", path: "/"},
            {type: "nav-link", label: "Home", path: "/home"},
            {type: "nav-link", label: "Login", path: "/login"}
        ];

        if (isInRole("S")) {
            return headerRoutesArrStudents;
        } else if (isInRole("P")) {
            return headerRoutesArrProfessors;
        } else {
            return headerRoutesArrAdmin;
        }
    }

    return [headerRoutesArr];
};