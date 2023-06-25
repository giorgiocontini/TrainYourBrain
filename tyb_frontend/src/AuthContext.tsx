import {createContext, useEffect, useState} from "react";

type TAuthContextProvider = {
    children: React.ReactNode;
};

type TAuthState = {
    containerStatus: number;
};

type TUser = {
    firstName: string | undefined;
    lastName: string | undefined;
    userId: number | undefined;
    role: string | undefined;
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

    const [userState, setUserState] = useState<TUser>({
        firstName: "",
        lastName: "",
        userId: undefined,
        role: ""
    });


    const _initUserState = (userData: TUser) => {
        // Guard: if field does not exist, return.
        if (typeof userData.userId === "undefined") {
            return null;
        }

        const user: TUser = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            userId: userData.userId,
            role: userData.role
        };
        return user;
    };

    /**
     * Returns a boolean value indicating whether the current user is in the specified role.
     * The function is only intended to work with values from the enumeration `ENUM_ROLES` from AuthContext.
     *
     * @param {ENUM_ROLES} role The name of the role to search for.
     * @returns {Boolean} if the current user is in the specified role returns `true`; otherwise, returns `false`.
     * @access public
     */
    const isInRole = (role: string) => {
        debugger
        return userState.role === role;
    };

    /**
     * Call the AuthService on component load
     */
    useEffect(() => {
debugger
        setUserState({firstName: "Giorgio",
            lastName: "",
            userId: 0,
            role:"A"})
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
                isInRole: isInRole
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
export {AuthContext};