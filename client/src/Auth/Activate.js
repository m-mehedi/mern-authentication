import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import jwtDecode from 'jwt-decode'

const Activate = () => {
  const params = useParams();
  const [values, setValues] = useState({
    name: "",
    token: "",
    show: true,
  });

  useEffect(() => {
    let token = params.token;
    let { name } = jwtDecode(token);
    // console.log(name);
    if (token) {
      setValues({ ...values, name, token });
    }
  }, []);

  const { name, token, show } = values;

  const clickSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/account-activation`,
      data: { token },
    })
      .then((response) => {
        console.log("ACCOUNT ACTIVATEION SUCCESS", response);
        setValues({
          ...values,
          show: false
        });
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log("ACCOUNT ACTIVATEION ERROR", error.response.data.error);
        toast.error(error.response.data.error);
      });
  };

  const activationLink = () => (
    <div>
        <Box display="flex" alignItems="center"
        justifyContent="center">
            <h3>
                Hey {name}, Please activate your account!
            </h3>
        </Box>

      <Box sx={{ p: 1 }} display="flex" m="auto">
        <Button variant="contained" color="success" onClick={clickSubmit}>
          Activate Account
        </Button>
      </Box>
    </div>
  );

  return (
    <Layout>
      <div className="col-d-6 offset-md-3">
        <ToastContainer />
        {/* {JSON.stringify({ name, email, password })} */}
        {activationLink()}
      </div>
    </Layout>
  );
};
export default Activate;
