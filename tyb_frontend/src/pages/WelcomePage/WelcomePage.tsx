import React, {useState} from "react";
import {useParams} from "react-router-dom"

const WelcomePage = () => {

    const params = useParams();

    return (<div className="WelcomePage ">
        <div className="row"><h1>Benvenuto su TRAIN YOUR BRAIN, comincia subito ad allenare la mente!</h1></div>
        <div className="row"><h3>Puoi accedere o registrarti <a href="/login">qui</a></h3></div>

    </div>)
}

export default WelcomePage;