import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import PageNavbar from "../../components/PageNavbar";
import FormService from "../../components/Services/FormService";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import FormikControl from "../../components/Reservation/FormikControl";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ManageUsers() {
  const [reservationHistory, setReservationHistory] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/Admin/UserManagment");
  };

 
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await FormService.getUsersDetails();
        const formattedUserDetails = response.data.map((users) => ({
          key: users.userName,
          value: users.userName,
        }));
        setUserDetails(formattedUserDetails);
      } catch (error) {
        console.error("Error fetching lab equipments:", error);
      }
    };

    fetchUserDetails();
  }, []);


  const initialValues = {
    id: "",
    userName: "",
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required("Required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      localStorage.setItem("SelectedUser", JSON.stringify(values));
      console.log("Selected User saved:", values.userName); // Print the value
      navigate("/Admin/UserManagment/ManageUsers/UserDetails");
      resetForm();
    } catch (error) {
      console.error("Error:", error.message);
      alert("An error occurred. Please try again later.");
    }
  };


  return (
    
    <div>
      <div
        style={{ textAlign: "center", marginBottom: "40px", marginTop: "40px" }}
      >
        <Typography variant="h2" gutterBottom style={{ textAlign: "center" }}>
          Reservation History
        </Typography>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            my={4}
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
            sx={{
              border: "2px solid grey",
              width: "100%",
              maxWidth: 640,
              margin: "auto",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                  enableReinitialize
                  validateOnMount
                >
                  {(formik) => (
                    <Form>
                      <Grid container spacing={1} alignItems="center">
                        <Grid item xs={5.9}>
                          <FormikControl
                            control="select"
                            label={`Select User`}
                            name={`userName`}
                            options={userDetails}
                          />
                        </Grid>
                      </Grid>
                      <Box textAlign="center">
                        <button
                          className="buttonRemove"
                          onClick= {handleBack}
                          style={{ marginBottom: "50px" ,marginRight: "20px"  }}
                        >
                          Back
                        </button>
                        <button
                          className="buttonSubmit"
                          type="submit"
                          style={{ marginBottom: "50px" }}
                        >
                          View
                        </button>
                      </Box>
                    </Form>
                  )}
                </Formik>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default ManageUsers;
