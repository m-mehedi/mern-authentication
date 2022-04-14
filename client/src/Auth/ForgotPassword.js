import React, { useState } from "react";
import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: "",
    buttonText: "Request password reset link",
  });

  const { email, buttonText } = values;

  const handleChange = (name) => (event) => {
    console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting.." });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/forgot-password`,
      data: { email },
    })
      .then((response) => {
        console.log("FORGOT PASSWORD SUCCESS", response);

        // Save the response (user, token) in (LocalStorage/cookie)
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            buttonText: "Request password reset link",
          });
          toast.success(response.data.message);
          setValues({...values, buttonText: 'Requested'})
          
      })
      .catch((error) => {
        console.log("FORGOT PASSWORD  ERROR", error.response.data);
        toast.error(error.response.data.error);
        setValues({ ...values, buttonText: "Request password reset link" });
      });
  };

  const ForgotPassword = () => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            onChange={handleChange("email")}
            value={email}
            type="email"
            className="form-control"
          />
        </div>

        <Box sx={{ p: 1 }} display="flex" justifyContent="flex-end">
          <Button variant="contained" color="success" onClick={clickSubmit}>
            {buttonText}
          </Button>
        </Box>
      </form>
    );
  };

  return (
    <Layout>
      <div className="col-d-6 offset-md-3">
        <ToastContainer />
        {/* {JSON.stringify({ name, email, password })} */}
        <h1 className="p-5 text-center">Forgot Password</h1>
        {ForgotPassword()}
      </div>
    </Layout>
  );
};
export default ForgotPassword;
