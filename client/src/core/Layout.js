import React, { Fragment } from "react";
import Container from "@mui/material/Container";
// import ColorTabs from "./Nav";
import {
  Link,
  useLocation,
  // useParams ,
  // Navigation,
  useNavigate,
} from "react-router-dom";
import { isAuth, logout } from "../Auth/helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Layout = ({ children }) => {
  let location = useLocation();
  // const params = useParams();
  // const isActive = location.pathname;

  const history = useNavigate();

  const isActive = (path) => {
    if (location.pathname === path) {
      return { color: "#000" };
    } else {
      return { color: "#FFF" };
    }
  };
  // console.log(location.pathname);

  const nav = () => (
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link to="/" className="nav-link" style={isActive("/")}>
          Home
          {/* {JSON.stringify(location.pathname)} */}
        </Link>
      </li>

      {!isAuth() && (
        <Fragment>
          <li className="nav-item">
            <Link to="/login" className="nav-link" style={isActive("/login")}>
              Login
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/signup" className="nav-link" style={isActive("/signup")}>
              Sign up
            </Link>
          </li>
        </Fragment>
      )}
      {isAuth() && isAuth().role === 'admin' && (          
          <li className="nav-item">
            <Link to="/admin/company" className="nav-link" style={isActive("/admin/company")}>              
            <span>{isAuth().name}</span>
            </Link>
          </li>
      )}
      {isAuth() && isAuth().role === 'subscriber' && (
          <li className="nav-item">
            <Link to="/users" className="nav-link" style={isActive("/users")}>              
            <span>{isAuth().name}</span>
            </Link>
          </li>
      )}

      {isAuth() && (
        <Fragment>

        
        <li className="nav-item">
          <span
            className="nav-link"            
            style={{ cursor: 'pointer', color: '#FFF' }}
            onClick={() => {
              logout(() => {
                toast.error(`You are logged out!`);
                history("/");
              });
            }}
          >
            Logout
          </span>
        </li>

        </Fragment>
      )}
    </ul>
  );

  return (
    <Fragment>
      {/* <ColorTabs /> */}
      {nav()}
        <ToastContainer />

      <div>
        <Container maxWidth="sm">{children}</Container>
      </div>
    </Fragment>
  );
};

export default Layout;
