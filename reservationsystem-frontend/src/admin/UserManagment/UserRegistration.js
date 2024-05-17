import React, { useEffect, useState } from "react";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormikControl from "../../components/Reservation/FormikControl";
import FormService from "../../components/Services/FormService";
import "../../App.css";
import { Box, Container } from "@mui/system";
import { Grid, Typography } from "@material-ui/core";
import Navbar from "../../components/PageNavbar";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import TextError from "../../components/Reservation/components/TextError";
import axios from "axios";

function UserRegistration() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/Admin/UserManagment");
  };

  const userRole = [
    { key: "Admin", value: "ADMIN" },
    { key: "Lecturer", value: "LECTURER" },
    { key: "Technical Officer", value: "TO" },
  ];

  //Initial Vaules

  const initialValues = {
    userName: "",
    password: "",
    email: "",
    role: "",
  };

  //Validations of Values

  const validationSchema = Yup.object({
    userName: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });
  //submit validation

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log("Form data", values);
      const response = await FormService.createUser(values);
      console.log("Response from server:", response);
      alert("Form submitted successfully!");

      navigate("/Admin/UserManagment");
      resetForm();
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
        alert("Server Error. Please try again later.");
      } else if (error.request) {
        console.error("Network Error:", error.request);
        alert("Network Error. Please check your internet connection.");
      } else {
        console.error("Error:", error.message);
        alert("An error occurred. Please try again later.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // return

  return (
    <Box sx={{ marginTop: "50px", marginLeft: "10px", marginRight: "10px" }}>

      <div
        style={{ textAlign: "center", marginBottom: "40px", marginTop: "40px" }}
      >
        <Typography variant="h2" gutterBottom>
          Create a User
        </Typography>
      </div>

      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
          marginRight: "5px",
        }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={24} sm={20} md={16} lg={12}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              enableReinitialize
              validateOnMount
            >
              {(formik) => (
                <Form>
                  <FormikControl
                    control="input"
                    type="text"
                    label="Name"
                    name="userName"
                    className="input-spacing"
                  />

                  <FormikControl
                    control="input"
                    type="email"
                    label="Email"
                    name="email"
                    className="input-spacing"
                  />

                  <FormikControl
                    control="select"
                    label={`Select user role`}
                    name={`role`}
                    options={userRole}
                  />

                  <div className="form-control">
                    <label htmlFor="password">Create tempory password</label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Create new password"
                    />
                    <ErrorMessage name="password" component={TextError} />
                  </div>

                  <div style={{ marginBottom: "100px" }}>
                    <button
                      className="buttonRemove"
                      onClick={handleBack}
                      style={{ marginRight: "10px" }}
                    >
                      Back
                    </button>

                    <button
                      className="buttonSubmit"
                      type="submit"
                      style={{ marginLeft: "10px" }}
                    >
                      Apply
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default UserRegistration;
