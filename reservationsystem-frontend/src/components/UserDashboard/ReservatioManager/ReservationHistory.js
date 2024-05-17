import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import PageNavbar from "../../PageNavbar";
import FormService from "../../Services/FormService";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import FormikControl from "../../Reservation/FormikControl";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ReservationHistory() {
  const [reservationHistory, setReservationHistory] = useState([]);
  const [loginDetails, setLoginDetails] = useState([]);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/Dashboard");
  };

  useEffect(() => {
    const fetchReservationHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/reservations`
        );
        const allReservations = response.data;

        // Filter reservations by name
        const filteredReservations = allReservations
          .filter((reservation) => reservation.name === loginDetails.username)
          .map((filteredReservation) => ({
            key: filteredReservation.orderDetails,
            value: filteredReservation.id,
          }));

        // Update the state with the filtered reservation history
        setReservationHistory(filteredReservations);
      } catch (error) {
        console.log("Error fetching Reservation History ", error);
      }
    };

    // Call the fetchReservationHistory function when the component mounts
    fetchReservationHistory();
  }, [loginDetails.username]); // Make sure to include loginDetails.username in the dependency array

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("loginDetails"));
    setLoginDetails(data);
  }, []);

  const initialValues = {
    orderDetails: "",
  };

  const validationSchema = Yup.object({
    orderDetails: Yup.string().required("Required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      localStorage.setItem("SelectedReservation", JSON.stringify(values));
      console.log("Order Details saved:", values.orderDetails); // Print the value
      navigate("/Dashboard/ReservationDetails");
      resetForm();
    } catch (error) {
      console.error("Error:", error.message);
      alert("An error occurred. Please try again later.");
    }
  };

  function roundUpString(str, maxLength) {
    if (str.length <= maxLength) {
      return str;
    } else {
      return str.slice(0, maxLength - 3) + '...';
    }
  }
  
  function roundUpOptions(options, maxLength) {
    return options.map(option => ({
      ...option,
      key: roundUpString(option.key, maxLength)
    }));
  }
  

  return (
    
    <div>
      <PageNavbar />
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
                            label={`Select Reservation`}
                            name={`orderDetails`}
                            options={roundUpOptions(reservationHistory,80)}
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

export default ReservationHistory;
