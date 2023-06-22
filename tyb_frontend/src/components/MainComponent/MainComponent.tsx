import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import LoginComponent from "../LoginComponent/LoginComponent";
import WelcomeComponent from "../WelcomeComponent/WelcomeComponent";
import ErrorPageComponent from "../ErrorPageComponent/ErrorPageComponent";


const  MainComponent = ()=>{
    return (<div className="MainComponent">
        <Router>
            <Routes>
                <Route path="/"  Component={LoginComponent}/>
                <Route path="/login"  Component={LoginComponent}/>
                <Route path="/welcome/:userId"  Component={WelcomeComponent}/>
                <Route path="/*" Component={ErrorPageComponent}/>
            </Routes>
        </Router>
    </div>)
}

export default MainComponent;