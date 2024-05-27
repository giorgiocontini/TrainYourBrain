/**
 * Libs
 */
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import {AuthContext} from "../AuthContext";

/**
 * Locals
 */

/**
 * Types
 */
type TProtectedRouteProps = {
    children: JSX.Element;
    allowedRoles: string[];
};

/**
 * Route to a page, guarded from the allowed roles
 *
 * @param children routes
 * @param allowedRoles array of allowed roles
 * @returns
 */
const ProtectedRoute = ({ children, allowedRoles }: TProtectedRouteProps) => {
    const { isInRole } = useContext(AuthContext);
    const [isAuthorized] = useState<boolean>(() => {
        let isAuthorized = false;
        for (let i = 0; i < allowedRoles.length; i++) {
            const allowedRole = allowedRoles[i];
            if (isInRole(allowedRole)) {
                isAuthorized = true;
                break;
            }
        }
        return isAuthorized;
    });

    return (
        <>
            {isAuthorized ?
                    <>{children}</>
              : (
                    <Navigate to="/" replace={true} />
                )}
        </>
    );
};

export default ProtectedRoute;
