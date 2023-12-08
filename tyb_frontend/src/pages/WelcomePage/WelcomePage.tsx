import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom"

const WelcomePage = () => {

    const params = useParams();
    const navigate = useNavigate();

    return (<div className="WelcomePage ">
        <div className="row"><h1>Benvenuto su TRAIN YOUR BRAIN, comincia subito ad allenare la mente!</h1></div>
        <div className="row"><h3>Puoi accedere o registrarti <span className="primary-color-b1 " style={{cursor:"pointer"}}onClick={()=>{
            navigate("/login")
        }}>qui</span></h3></div>

    </div>)
}

export default WelcomePage;
