import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import "react-icons/fa";
import React, {useContext} from 'react';
import AppContextProvider from "./AppContext";
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom";
import RootLayout from "./root/RootLayout";
import LoginRegistrationPage from "./pages/LoginRegistrationPage/LoginRegistrationPage";
import HomePage from "./pages/HomePage/HomePage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import AuthContextProvider, {AuthContext} from "./AuthContext";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ProtectedRoute from "./root/ProtectedRoute";
import QuizPage from "./pages/QuizPage/QuizPage";
import StatisticsPage from "./pages/StatisticsPage/StatisticsPage";
import AddQuizPage from "./pages/AddQuizPage/AddQuizPage";

//                 <Route path="profile" Component={ProfilePage}/>

export const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" Component={RootLayout} >
                <Route path="" Component={WelcomePage}/>
                <Route path="login" Component={LoginRegistrationPage}/>
                <Route path="home" element={<ProtectedRoute allowedRoles={["A", "S"]}><HomePage/></ProtectedRoute>}/>
                <Route path="welcome/:username" Component={WelcomePage}/>
                <Route path="quiz" element={<ProtectedRoute allowedRoles={["A", "S"]}><QuizPage/></ProtectedRoute>}/>
                <Route path="statistics" element={<ProtectedRoute allowedRoles={["A", "S"]}><StatisticsPage/></ProtectedRoute>}/>
                <Route path="add-quiz" element={<ProtectedRoute allowedRoles={["A"]}><AddQuizPage/></ProtectedRoute>}/>
                <Route path="profile" element={<ProtectedRoute allowedRoles={["A", "S"]}><ProfilePage/></ProtectedRoute>}/>
                <Route path="*" element={<Navigate to="/" replace />} />

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
