import React, { Fragment } from "react";
import Container from "@mui/material/Container";
// import ColorTabs from "./Nav";
import { Link, 
  useLocation,
  // useParams 
} from "react-router-dom";
  import withRouter from './withRouter';

const Layout = ({ children }) => {

    let location = useLocation();
    // const params = useParams();
    // const isActive = location.pathname;
    const isActive = path => {
        if(location.pathname === path){
          return {color: '#000'}
        } else {
          return {color: '#FFF'}
        }
    }
    // console.log(location.pathname);

  const nav = () => (
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link to="/" className="nav-link" style={isActive('/')}>
          Home
           {/* {JSON.stringify(location.pathname)} */}
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/login" className="nav-link" style={isActive('/login')}>
          Login
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/signup" className="nav-link" style={isActive('/signup')}>
          Sign up
        </Link>
      </li>
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
