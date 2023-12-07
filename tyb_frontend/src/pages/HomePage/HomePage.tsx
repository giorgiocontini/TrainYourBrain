import React, {FC, useContext} from 'react';
import {AuthContext} from "../../AuthContext";
import {useParams} from "react-router-dom"
import {USER_ROLE} from "../../utils/const";


interface HomeComponentProps {}

const HomePage: FC<HomeComponentProps> = () => {
    const {isInRole} = useContext(AuthContext);
    const params = useParams();

    return <div>
        <h1>Homepage</h1>

            <div className="d-flex flex-row d-inline">
                {isInRole(USER_ROLE.ADMIN) ?
                    <div className="col-7 border border-primary rounded p-2" >454544</div>
                    : null
                }
                <div className="col-4 me-auto border border-primary rounded p-2">54543545rer  werweyurgwe g uwruywg ruegwgrwgrgr u  we  uyruuywg4</div>

            </div>
    </div>
}

export default HomePage;
