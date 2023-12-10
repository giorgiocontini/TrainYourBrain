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

    function getPersonCircleSvg() {
        return <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor"
                    style={{cursor: "pointer"}}
                    className="bi bi-person-circle ms-2" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
            <path fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"></path>
        </svg>
    }

    function logout() {
        return () => {
            setUser(undefined);
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
                                navigate("/profile")
                            }}>
                                <i className="bi bi-person-circle me-2"></i>{user.username}
                            </button>
                            <button className="btn btn-danger ms-2" onClick={logout()}>
                                <i className="bi bi-box-arrow-right me-2"></i>Logout
                            </button>
                        </> : <button className="btn btn-primary" onClick={() => {
                            navigate("/login", {replace: true})
                        }}><i className="bi bi-box-arrow-in-left me-2"></i>Login</button>}
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
