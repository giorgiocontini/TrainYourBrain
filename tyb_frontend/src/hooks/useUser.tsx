import { useContext } from "react";

import { useLocalStorage } from "./useLocalStorage";
import {TUser} from "../types/types";
import {AuthContext} from "../AuthContext";


export const useUser = () => {
    const { user, setUser } = useContext(AuthContext);

    const addUser = (user: TUser) => {
        setUser(user);
    };

    const removeUser = () => {
        setUser(undefined);
    };

    return { user, addUser, removeUser };
};