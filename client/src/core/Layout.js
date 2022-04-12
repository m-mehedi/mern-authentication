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
import withRouter from "./withRouter";

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

      {isAuth() && (
        <Fragment>
          
          <li className="nav-item">
            <Link to="/admin/company" className="nav-link" style={isActive("/admin/company")}>
              Admin
            </Link>
          </li>
          
          <li className="nav-item">
          <span
            className="nav-link"            
            style={{ cursor: 'pointer', color: '#FFF' }}
          >
            <span>{isAuth().name}</span>
          </span>
          </li>

        
        <li className="nav-item">
          <span
            className="nav-link"            
            style={{ cursor: 'pointer', color: '#FFF' }}
            onClick={() => {
              logout(() => {
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

      <div>
        <Container maxWidth="sm">{children}</Container>
      </div>
    </Fragment>
  );
};

export default withRouter(Layout);
