import React, {createContext} from "react";

/**
 * Create initial empty context
 */
const AppContext: React.Context<any> = createContext({});
/**
 * Local Types
 */
type TContextProvider = {
    children: React.ReactNode;
};


const AppContextProvider = ({children}: TContextProvider) => {

    return <AppContext.Provider value={{}}>

        {children}
    </AppContext.Provider>


}
export default AppContextProvider;
export {AppContext};