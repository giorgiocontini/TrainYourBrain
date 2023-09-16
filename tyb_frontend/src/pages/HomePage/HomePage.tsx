import React, {FC, useContext} from 'react';
import {AuthContext} from "../../AuthContext";
import {useParams} from "react-router-dom"


interface HomeComponentProps {}

const HomePage: FC<HomeComponentProps> = () => {
    const {user, isInRole, setUser} = useContext(AuthContext);
    const params = useParams();

    return <div>
        <h1>Homepage</h1>

            <div className="d-flex flex-row d-inline">
                    <div className="col-4 me-auto border border-primary rounded p-2">54543545rer  werweyurgwe g uwruywg ruegwgrwgrgr u  we  uyruuywg4</div>
                    <div className="col-7 border border-primary rounded p-2" >454544</div>
            </div>
    </div>
}

export default HomePage;