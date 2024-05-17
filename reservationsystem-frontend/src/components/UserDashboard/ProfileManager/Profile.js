import React, { useEffect, useState } from "react";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormikControl from "../../Reservation/FormikControl";
import FormService from "../../Services/FormService";
import "../../../App.css";
import { Box, Container } from "@mui/system";
import { Grid, Typography } from "@material-ui/core";
import Navbar from "../../PageNavbar";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import TextError from "../../Reservation/components/TextError";
import axios from "axios";

function Profile() {
  const [loginDetails, setLoginDetails] = useState([]);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/Dashboard");
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    setLoginDetails(data);
  }, []);

  //Initial Vaules

  const initialValues = {
    userName: loginDetails ? loginDetails.userName : "",
    email: loginDetails ? loginDetails.email : "",
    role: loginDetails ? loginDetails.role : "",
    password: "",
    confirmPassword: "",
  };

  //Validations of Values

  const validationSchema = Yup.object({
    userName: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });
  //submit validation

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const id = loginDetails ? loginDetails.id : null; // Get the id from loginDetails
      if (!id) throw new Error("User ID not found.");

      const { userName, email, password, role } = values;
      const dataToPost = { userName, email, password, role };
      console.log("Data to post:", dataToPost);

      const response = await axios.put(
        `http://localhost:8080/api/v1/users/${id}`,
        dataToPost
      );
      console.log("Response from server:", response);
      alert("Form submitted successfully!");

      navigate("/");
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
      <Navbar />

      <div
        style={{ textAlign: "center", marginBottom: "40px", marginTop: "40px" }}
      >
        <Typography variant="h2" gutterBottom>
          Profile Settings
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
                    label="Change Name"
                    name="userName"
                    className="input-spacing"
                    readOnly={true}
                  />

                  <FormikControl
                    control="input"
                    type="email"
                    label="Change Email"
                    name="email"
                    className="input-spacing"
                  />

                  <FormikControl
                    control="input"
                    type="text"
                    label="User role"
                    name="role"
                    className="input-spacing"
                    readOnly={true}
                  />

                  <div className="form-control">
                    <label htmlFor="password">Create new password</label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Create new password"
                    />
                    <ErrorMessage name="password" component={TextError} />
                  </div>

                  <div className="form-control">
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <Field
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm password"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component={TextError}
                    />
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

export default Profile;
