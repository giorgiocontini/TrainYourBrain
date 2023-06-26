import React, {useContext} from 'react';
import {useHeaderRoutes} from "../../root/routes";
import "./HeaderComponent.scss";
import NavDropdown from "../NavDropdown/NavDropdown";
import NavLink from "../NavLink/NavLink";
import {Link} from "react-router-dom";
import {AuthContext} from "../../AuthContext";

interface HeaderComponentProps {}


const HeaderComponent = ({}:HeaderComponentProps) => {
    const [headerRoutesArr] = useHeaderRoutes();
    const {user, isInRole} = useContext(AuthContext);



    return <div className="flex-container HeaderComponent">
        <div className="primary-header d-flex flex-row ">TrainYourBrain - {user.role}</div>
        <div className="nav secondary-header">
            <div className="container">
                <div className="navbar-toggler" aria-controls="basic-navbar-nav" />
                <ul className="nav-ul">
                    {headerRoutesArr.map((header: any, idx: number) => {
                        if (header.type === "nav-link") {
                            return (
                                <NavLink
                                    key={idx}
                                    label={header.label}
                                    href={header.path}
                                />
                            );
                        } else if (header.type === "nav-dropdown") {
                            return (
                                <NavDropdown
                                    key={idx}
                                    label={header.label}
                                    routesArr={header.routesArr}
                                />
                            );
                        } else {
                            return (
                                <Link key={idx} to={header.path}>
                                    {header.label}
                                </Link>
                            );
                        }
                    })}
                </ul>
            </div>
        </div>
    </div>
}

export default HeaderComponent;