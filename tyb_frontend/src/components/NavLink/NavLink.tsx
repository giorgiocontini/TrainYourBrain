/**
 * Libs
 */
import { Link } from "react-router-dom";

/**
 * Locals
 */
import "./NavLink.scss";

/**
 * Types
 */
type TNavLinkProps = {
    label: string;
    href: string;
};

/**
 * Navigation link item
 *
 * @param label label for the item
 * @param href route for the item
 * @returns JSX
 */
const NavLink = ({ label, href }: TNavLinkProps) => {
    return (
        <li className="NavLink user-select-none">
            <Link to={href}>{label}</Link>
        </li>
    );
};

export default NavLink;