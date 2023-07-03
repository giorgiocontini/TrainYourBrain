import { useContext } from "react";

import { useLocalStorage } from "./useLocalStorage";
import {TUser} from "../types/types";
import {AuthContext} from "../AuthContext";


export const useUser = () => {
    const { user, setUser } = useContext(AuthContext);
    const { setItem } = useLocalStorage();

    const addUser = (user: TUser) => {
        setUser(user);
        setItem("user", JSON.stringify(user));
    };

    const removeUser = () => {
        setUser(null);
        setItem("user", "");
    };

    return { user, addUser, removeUser };
};