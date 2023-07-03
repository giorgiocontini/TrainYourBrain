import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import {useUser} from "./useUser";
import {TUser} from "../types/types";

export const useAuth = () => {
    const { user, addUser, removeUser } = useUser();
    const { getItem } = useLocalStorage();

    useEffect(() => {
        const user = getItem("user");
        if (user) {
            addUser(JSON.parse(user));
        }
    }, []);

    const login = (user: TUser) => {
        addUser(user);
    };

    const logout = () => {
        removeUser();
    };

    return { user, login, logout };
};