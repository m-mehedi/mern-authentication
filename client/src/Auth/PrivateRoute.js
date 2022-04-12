import React from "react";
import { Navigate } from "react-router-dom";
import { isAuth } from "./helpers";

export default function PrivateRoute({ children }){
  const auth = isAuth();

  return auth ? children : <Navigate to="/login" />
}