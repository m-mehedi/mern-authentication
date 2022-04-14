import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { isAuth, getCookie, logout, updateUser } from "../Auth/helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Users = () => {
  const [values, setValues] = useState({
    role: "",
    name: "",
    email: "",
    password: "",
    buttonText: "Submit",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const token = getCookie("token");

  const loadProfile = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("PROFILE UPDATE", response);
        const { role, name, email } = response.data;
        setValues({ ...values, role, name, email });
      })
      .catch((error) => {
        console.log("PROFILE UPDATE ERROR", error.response.data.error);
        if (error.response.status === 401) {
          logout(() => {
            <Navigate to="/" />;
          });
        }
      });
  };

  const { name, email, password, role, buttonText } = values;

  const handleChange = (name) => (event) => {
    // console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting.." });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/user/update`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { name, password },
    })
      .then((response) => {
        console.log("PROFILE UPDATE SUCCESS", response);
        updateUser(response, () =>{
          setValues({
            ...values,
            buttonText: "Submitted",
          });
          toast.success('Profile updated successfully.');
        });
      })
      .catch((error) => {
        console.log("PROFILE UPDATE ERROR", error.response.data.error);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error);
      });
  };

  const updateForm = () => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            onChange={handleChange("name")}
            value={name}
            type="text"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Role</label>
          <input value={role} type="text" className="form-control" disabled />
        </div>

        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            onChange={handleChange("email")}
            value={email}
            type="email"
            className="form-control"
            disabled
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
        <h1 className="p-5 text-center">Profile Update</h1>
        {updateForm()}
      </div>
    </Layout>
  );
};
export default Users;
