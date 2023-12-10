import {createContext, useState} from "react";
import {User} from "./services/API/openapicode_tyb_user";


type TAuthContextProvider = {
    children: React.ReactNode;
};

/**
 * Create initial empty context
 */
const AuthContext = createContext<any | null>(null);

/**
 * Main app context
 *
 * @param {*} props
 * @returns
 */
const AuthContextProvider = ({children}: TAuthContextProvider) => {

    //const { getItem, removeItem} = useLocalStorage();

    const [userState, setUserState] = useState<User | undefined>(undefined);

    const isInRole = (role: string) => {
        if (userState) {
            return userState.role === role;
        }
    };

    return (<AuthContext.Provider
            value={{
                user: userState, setUser: setUserState, isInRole: isInRole
            }}
        >
            {children}
        </AuthContext.Provider>);
};

export default AuthContextProvider;
export {AuthContext};
