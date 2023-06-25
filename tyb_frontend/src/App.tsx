import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import AppContextProvider from "./AppContext";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import RootLayout from "./root/RootLayout";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import AuthContextProvider from "./AuthContext";


export const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" Component={RootLayout}>
                <Route path="login" Component={LoginPage}/>
                <Route path="home" Component={HomePage}/>
                <Route path="welcome/:userId" Component={WelcomePage}/>
                <Route path="*" Component={ErrorPage}/>
            </Route>

        </Route>
    ))

const App = () => {

    return (
        <div className="App">
            <AuthContextProvider>
                <AppContextProvider>
                    <RouterProvider router={routes}/>
                </AppContextProvider>
            </AuthContextProvider>
        </div>

    );
}

export default App;