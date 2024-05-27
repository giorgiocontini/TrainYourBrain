import React, {useContext} from 'react';
import {useHeaderRoutes} from "../../root/routes";
import "./HeaderComponent.scss";
import NavDropdown from "../NavDropdown/NavDropdown";
import NavLink from "../NavLink/NavLink";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../AuthContext";


interface HeaderComponentProps {

}

const HeaderComponent = ({}: HeaderComponentProps) => {
    const [headerRoutesArr] = useHeaderRoutes();
    const {user, isInRole, setUser} = useContext(AuthContext);
    const navigate = useNavigate();


    function logout() {
        return () => {
            setUser(undefined);
            sessionStorage.clear();
            navigate("/", {replace: true})
        };
    }

    return <div className="HeaderComponent">
        <div className="primary-header d-flex flex-row align-items-center">
            <div className="container ">
                <div className="d-flex flex-row align-items-center ">
                    <span className="me-auto">TrainYourBrain</span>
                    <div>
                        {user ? <>
                            <button className="btn btn-primary" onClick={() => {
                                //navigate("/profile")
                            }}>
                                <i className="bi bi-person-circle"></i><span className="ms-2 hide-on-sm">{user.username}</span>
                            </button>
                            <button className="btn btn-danger ms-2" onClick={logout()}>
                                <i className="bi bi-box-arrow-right"></i><span className="ms-2 hide-on-sm">{"Logout"}</span>
                            </button>
                        </> : <button className="btn btn-primary" onClick={() => {
                            navigate("/login", {replace: true})
                        }}><i className="bi bi-box-arrow-in-left"></i><span
                            className="ms-2 hide-on-sm">{"Login"}</span></button>}
                    </div>
                </div>
            </div>
        </div>
        <div className="nav secondary-header">
            <div className="container">
                <ul className="nav-ul">
                    {

                        headerRoutesArr.map((header: any, idx: number) => {
                            if (header.type === "nav-link") {
                                return (<NavLink
                                    key={idx}
                                    label={header.label}
                                    href={header.path}
                                />);
                            } else if (header.type === "nav-dropdown") {
                                return (<NavDropdown
                                    key={idx}
                                    label={header.label}
                                    routesArr={header.routesArr}
                                />);
                            } else {
                                return (<Link key={idx} to={header.path}>
                                    {header.label}
                                </Link>);
                            }
                        })}
                </ul>
            </div>
        </div>


    </div>
}

export default HeaderComponent;
