import {createContext, useEffect, useState} from "react";
import {TUser} from "./types/types";
import userService from "./services/API/User/UserService";

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

    const initUserState = () => {
        const user: TUser = {
            firstName: "",
            lastName:"",
            userId: undefined,
            role: ""
        };
        return user;
    };

    const [userState, setUserState] = useState<TUser>(initUserState);

    const isInRole = (role: string) => {
        return userState.role === role;
    };

    const isUserLogged =()=>{
        if (userState.userId){
            return true
        }
        return  false;
    }

    /**
     * Call the AuthService on component load
     */
    useEffect(() => {
       //setUserState({firstName: "Giorgio",
       //    lastName: "",
       //    userId: 0,
       //    role:"A"})
        //TODO chiamare il servizio be che recupera i dati dell'user loggato
        //const UserDetailsObservable = AuthService.userDetails({})
        //    .pipe(
        //        tap(() => {
        //            setAuthStateContainerStatus(ENUM_CONTAINER_STATUS.LOADING);
        //        }).
        //        map((data) => {
        //            const user: TUser | null = _initUserState(data);
//
        //            if (user === null) {
        //                throw new Error(
        //                    ErrorsMap[ErrorsEnum.AUTHENTICATION_FAILED].message
        //                );
        //            }
        //            return user;
        //        })
        //    )
        //    .subscribe({
        //        next: (user) => {
        //            setUserState(user);
        //            setAuthStateContainerStatus(ENUM_CONTAINER_STATUS.SUCCESS);
        //        },
        //        error: (err) => {
        //            debugConsoleLog(err.message);
        //            setAuthStateContainerStatus(ENUM_CONTAINER_STATUS.ERROR);
        //        }
        //    });
//
        //return () => {
        //    UserDetailsObservable.unsubscribe();
        //};

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user: userState,
                isInRole: isInRole,
                isUserLogged: isUserLogged
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
export {AuthContext};