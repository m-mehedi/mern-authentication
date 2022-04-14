import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import jwtDecode from "jwt-decode";

const ResetPassword = () => {    
const params = useParams();
  const [values, setValues] = useState({
    name: "",
    token:'',
    newPassword: '',
    buttonText: "Reset Password",
  });

  useEffect(()=>{
    let token = params.token;
    let { name } = jwtDecode(token);
    // console.log(name);
    if (token) {
      setValues({ ...values, name, token });
    }
  },[])

  const { name, token, newPassword, buttonText } = values;

  const handleChange = event => {
    // console.log(event.target.value);
    setValues({ ...values, newPassword: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting.." });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/reset-password`,
      data: { newPassword, resetPasswordLink: token },
    })
      .then((response) => {
        console.log("RESET PASSWORD SUCCESS", response);

        // Save the response (user, token) in (LocalStorage/cookie)
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            buttonText: "Request password reset link",
          });
          toast.success(response.data.message);
          setValues({...values, buttonText: 'Done'})
          
      })
      .catch((error) => {
        console.log("RESET PASSWORD  ERROR", error.response.data);
        toast.error(error.response.data.error);
        setValues({ ...values, buttonText: "Reset Password" });
      });
  };

  const ResetPasswordForm = () => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            onChange={handleChange}
            value={newPassword}
            type="password"
            className="form-control"
            placeholder="Type new password"
            required
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
        <h1 className="p-5 text-center">Hey {name}, Type new Password</h1>
        {ResetPasswordForm()}
      </div>
    </Layout>
  );
};
export default ResetPassword;
