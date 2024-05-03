import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import "react-icons/fa";
import React, {useContext} from 'react';
import AppContextProvider from "./AppContext";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import RootLayout from "./root/RootLayout";
import LoginRegistrationPage from "./pages/LoginRegistrationPage/LoginRegistrationPage";
import HomePage from "./pages/HomePage/HomePage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import AuthContextProvider, {AuthContext} from "./AuthContext";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ProtectedRoute from "./root/ProtectedRoute";
import QuizPage from "./pages/QuizPage/QuizPage";


export const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" Component={RootLayout}>
                <Route path="" Component={WelcomePage}/>
                <Route path="login" Component={LoginRegistrationPage}/>
                <Route path="profile" Component={ProfilePage}/>
                <Route path="home" element={<ProtectedRoute allowedRoles={["A", "P", "S"]}><HomePage/></ProtectedRoute>}/>
                <Route path="welcome/:username" Component={WelcomePage}/>
                <Route path="quiz" Component={QuizPage}/>
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
