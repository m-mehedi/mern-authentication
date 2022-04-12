import { Navigate, Outlet } from "react-router-dom";
import { isAuth } from "./helpers";

export default function Private(){
    const auth = isAuth();

    return (auth && auth.role === 'admin') ? <Outlet /> : <Navigate to="/login" />;
}