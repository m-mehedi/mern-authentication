import React, { useState } from "react";
// import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    buttonText: "Submit",
  });

  const { email, password, buttonText } = values;

  const handleChange = (name) => (event) => {
    console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting.." });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/login`,
      data: { email, password },
    })
      .then((response) => {
        console.log("LOGIN SUCCESS", response);

        // Save the response (user, token) in (LocalStorage/cookie)
        setValues({ ...values, name: "", email: "", password: "", buttonText: "Submitted" });
        toast.success(`Hey ${response.data.user.name}, Welcome back!`);
      })
      .catch((error) => {
        console.log("LOGIN ERROR", error.response.data);
        setValues({ ...values, buttonText:"Submit" });
        toast.error(error.response.data.error);
      });
  };

  const loginForm = () => {
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

        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            onChange={handleChange("password")}
            value={password}
            type="password"
            className="form-control"
          />
        </div>

        <Box sx={{ p: 1}} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="success" onClick={clickSubmit} >
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
        <h1 className="p-5 text-center">Login</h1>
        {loginForm()}
      </div>
    </Layout>
  );
};
export default Login;
