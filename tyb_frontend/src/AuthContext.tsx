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

    //const { getItem, removeItem} = useLocalStorage();

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

    const [userState, setUserState] = useState<TUser | undefined>(undefined);


    const isInRole = (role: string) => {
        if (userState){
            return userState.role === role;
        }
    };

    useEffect(() => {
     //if (userState){
     //    setUserState((oldState) => {
     //        let newState = { ...oldState };
     //        newState=JSON.parse(userLogged);
     //        return newState;
     //    });
     //    setUserState( JSON.parse(userLogged));
     //}
    }, [userState]);

    return (
        <AuthContext.Provider
            value={{
                user: userState,
                setUser:setUserState,
                isInRole:isInRole
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
export {AuthContext};
