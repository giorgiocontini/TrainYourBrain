import React, {FC, useContext} from 'react';
import {AuthContext} from "../../AuthContext";
import {useParams} from "react-router-dom"


interface HomeComponentProps {}

const HomePage: FC<HomeComponentProps> = () => {
    const {user, isInRole, setUser} = useContext(AuthContext);
    const params = useParams();

    return <div>
        {user? <>loggato</> : "nonloggato"}
    </div>
}

export default HomePage;