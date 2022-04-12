import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import Activate from "./Auth/Activate";
import Users from "./core/Users";
import PrivateRoute from "./Auth/PrivateRoute";
import Private from "./Auth/Private";
import Company from "./Pages/Admin/Company/Company";
import CreateCompany from "./Pages/Admin/Company/Create";

const MyRoutes = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/signup"  element={<Signup />} />
                <Route path="/login"  element={<Login />} />
                <Route path="/auth/activate/:token"  element={<Activate />} />
                <Route path="/admin/*" element={<Private />}>
                    <Route path="company" element={<Company />} />
                    <Route path="company/create" element={<CreateCompany />} />
                </Route>
                <Route path="/users"  element={<PrivateRoute><Users /></PrivateRoute>} />
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes;