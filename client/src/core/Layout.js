import React, { Fragment } from "react";
import Container from "@mui/material/Container";
// import SearchAppBar from "./Nav";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  const nav = () => (
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link to="/" className="nav-link text-white">
          Home
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/login" className="nav-link text-white">
          Login
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/signup" className="nav-link text-white">
          Sign up
        </Link>
      </li>
    </ul>
  );

  return (
    <Fragment>
      {/* <SearchAppBar /> */}
      {nav()}

      <div>
        <Container maxWidth="sm">{children}</Container>
      </div>
    </Fragment>
  );
};

export default Layout;
