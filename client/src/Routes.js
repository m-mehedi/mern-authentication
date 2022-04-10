import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import Activate from "./Auth/Activate";

const MyRoutes = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<App />} />
                <Route path="/signup" exact  element={<Signup />} />
                <Route path="/login" exact  element={<Login />} />
                <Route path="/auth/activate/:token" exact  element={<Activate />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes;