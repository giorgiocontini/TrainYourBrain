/**
 * Libs
 */
import { useState } from "react";
import { Link } from "react-router-dom";

/**
 * Locals
 */
import "./NavDropdown.scss";

/**
 * Types
 */
type TNavDropdownProps = {
    label: string;
    routesArr: { label: string; path: string }[];
};

/**
 * Class names object composite
 *
 * Contains nav dropdown button and menu wrapper
 * Default-Hover and Default-Visible respectivly
 */
const classNamesStates = {
    NavDropdownBtn: {
        Default: ["NavDropdown__btn"],
        Hover: ["NavDropdown__btn", "hover"]
    },
    NavDropdownMenuWrapper: {
        Default: ["NavDropdown__menu-wrapper"],
        Visible: ["NavDropdown__menu-wrapper", "visible"]
    }
};

/**
 * Navigation dropdown component
 *
 * @param label button label
 * @param routesArr array with routes options
 * @returns JSX
 */
const NavDropdown = ({ label, routesArr }: TNavDropdownProps) => {
    const [state, setState] = useState({
        classNames: {
            NavDropdownBtn: classNamesStates.NavDropdownBtn.Default,
            NavDropdownMenuWrapper:
            classNamesStates.NavDropdownMenuWrapper.Default
        }
    });

    /**
     * Set class names state
     *
     * @param value value
     */
    const setStateForClassNames = (value: boolean) => {
        let newClassName: any = null;
        let newClassName2: any = null;
        if (value === true) {
            newClassName = classNamesStates.NavDropdownBtn.Hover;
            newClassName2 = classNamesStates.NavDropdownMenuWrapper.Visible;
        } else {
            newClassName = classNamesStates.NavDropdownBtn.Default;
            newClassName2 = classNamesStates.NavDropdownMenuWrapper.Default;
        }

        setState((oldState) => {
            const newState = { ...oldState };
            newState.classNames.NavDropdownBtn = newClassName;
            newState.classNames.NavDropdownMenuWrapper = newClassName2;
            return newState;
        });
    };

    return (
        <div
            className="NavDropdown user-select-none"
            onMouseLeave={() => setStateForClassNames(false)}
        >
            <div
                className={state.classNames.NavDropdownBtn.join(" ")}
                onMouseEnter={() => setStateForClassNames(true)}
            >
                <span>{label}</span>
                <i className="NavDropdown__btn-arrow bi bi-caret-down-fill"></i>
            </div>
            <div className={state.classNames.NavDropdownMenuWrapper.join(" ")}>
                <div className="NavDropdown__menu-underline"></div>
                <div className="NavDropdown__menu">
                    {routesArr.map(
                        (
                            route: { label: string; path: string },
                            idx: number
                        ) => {
                            return (
                                <div
                                    key={idx}
                                    className="NavDropdown__menu-btn"
                                >
                                    <Link to={route.path}>{route.label}</Link>
                                </div>
                            );
                        }
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavDropdown;