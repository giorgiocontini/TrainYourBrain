import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../AuthContext";

export const useHeaderRoutes = () => {
    const {isInRole} = useContext(AuthContext);
    const [headerRoutesArr, setHeaderRoutesArr] = useState(genHeaderRoutesArr());

    useEffect(() => {
        setHeaderRoutesArr(genHeaderRoutesArr());
    }, []);


    //Metodo che definisce le voci dell'headers in base al ruolo dell'utente loggato
    function genHeaderRoutesArr() {
        const headerRoutesArrStudents = [
            {type: "nav-link", label: "Welcome", path: "/welcome"},
            {type: "nav-link", label: "Home", path: "/home"},
            {type: "nav-link", label: "Login", path: "/login"},
        ];

        const headerRoutesArrProfessors = [
            {type: "nav-link", label: "Home", path: "/home"},
            {type: "nav-link", label: "Login", path: "/login"},
        ];

        const headerRoutesArrAdmin = [
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