import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Activate = () => {
  const params = useParams();
  const [values, setValues] = useState({
    name: "",
    token: "",
    show: true,
  });

  useEffect(() => {
    let token = params.token;
    console.log(token);
  }, []);

  const { name, token, show } = values;

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting.." });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signup`,
      data: { token },
    })
      .then((response) => {
        console.log("ACTIVATE SUCCESS", response);
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          buttonText: "Submitted",
        });
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log("ACTIVATE ERROR", error.response.data);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error);
      });
  };

  const activationLink = () => (
    <div>
      <h1 className="p-5 text-center">
        Hey {name}, Please activate your account!
      </h1>

      <Box sx={{ p: 1 }} display="flex" justifyContent="flex-center">
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
