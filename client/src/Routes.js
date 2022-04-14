import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import Activate from "./Auth/Activate";
import Users from "./core/Users";
import PrivateRoute from "./Auth/PrivateRoute";
import Private from "./Auth/Private";
import Profile from "./Pages/Admin/Profile";
import CreateCompany from "./Pages/Admin/Company/Create";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";

const MyRoutes = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/signup"  element={<Signup />} />
                <Route path="/login"  element={<Login />} />
                <Route path="/auth/activate/:token"  element={<Activate />} />
                <Route path="/admin/*" element={<Private />}>
                    <Route path="profile" element={<Profile />} />
                    <Route path="company/create" element={<CreateCompany />} />
                </Route>
                <Route path="/user/profile"  element={<PrivateRoute><Users /></PrivateRoute>} />
                <Route path="/auth/password/forgot"  element={<ForgotPassword />} />
                <Route path="/auth/password/reset/:token"  element={<ResetPassword />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes;