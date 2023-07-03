import {createContext, useEffect, useState} from "react";
import {TUser} from "./types/types";
import UserService from "./services/API/User/UserService";
import {useLocalStorage} from "./hooks/useLocalStorage";

type TAuthContextProvider = {
    children: React.ReactNode;
};

type TAuthState = {
    containerStatus: number;
};


/**
 * Local Enums
 */
const ErrorsEnum: { [key: string]: string } = {
    AUTHENTICATION_FAILED: "AUTHENTICATION_FAILED"
};

const ErrorsMap: any = {
    [ErrorsEnum.AUTHENTICATION_FAILED]: {
        key: [ErrorsEnum.AUTHENTICATION_FAILED],
        message: "User authentication failed"
    }
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

    const { getItem, removeItem} = useLocalStorage();

    const initUserState = () => {
        const user: TUser = {
            password: "",
            name: "",
            surname: "",
            username: "",
            role: ""
        };
        return user;
    };

    const [userState, setUserState] = useState<TUser>(initUserState);

    const isInRole = (role: string) => {
        return userState.role === role;
    };

    /**
     * Call the AuthService on component load
     */
    useEffect(() => {
        console.log(userState)

        isInRole("S")
    }, [userState]);

    return (
        <AuthContext.Provider
            value={{
                user: undefined,
                setUser:setUserState,
                isInRole:()=>{}
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
export {AuthContext};