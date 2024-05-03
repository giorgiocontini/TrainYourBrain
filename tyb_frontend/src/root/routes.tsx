import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../AuthContext";


interface headerRoute {
    type: string,
    label: string,
    path: string
}

export const useHeaderRoutes = () => {
    const {isInRole, user} = useContext(AuthContext);
    const [headerRoutesArr, setHeaderRoutesArr] = useState(genHeaderRoutesArr());
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        setHeaderRoutesArr(genHeaderRoutesArr());
    }, [user]);


    //Metodo che definisce le voci dell'headers in base al ruolo dell'utente loggato
    function genHeaderRoutesArr() {

        const homeRoute = {type: "nav-link", label: "Home", path: "/home"};
        const welcomeRoute = {type: "nav-link", label: "Welcome", path: "/"};

        const headerRoutesArrStudents: headerRoute[] = [homeRoute];
        const headerRoutesArrProfessors: headerRoute[] = [homeRoute];
        const headerRoutesArrAdmin: headerRoute[] = [homeRoute];
        const initialRoutes: headerRoute[] = [welcomeRoute];



        if (isInRole("S")) {
            return headerRoutesArrStudents;
        } else if (isInRole("P")) {
            return headerRoutesArrProfessors;
        } else if (isInRole("A")) {
            return headerRoutesArrAdmin;
        } else {
            return initialRoutes;
        }
    }

    return [headerRoutesArr];
};
