import React, { useEffect, useState } from "react";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormikControl from "../../components/Reservation/FormikControl";
import FormService from "../../components/Services/FormService";
import "../../App.css";
import { Box, Container } from "@mui/system";
import { Grid, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import TextError from "../../components/Reservation/components/TextError";
import axios from "axios";

function AdminInsertLiquidChemical() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/Admin/Database/AdminDatabaseInsert");
  };

  //Initial Vaules

  const initialValues = {
    equipmentName: "",
    equipmentType: "",
    equipmentDescription: "",
    equipmentInstruction: "",
    availableQuantity: "",

  };

  //Validations of Values

  const validationSchema = Yup.object({
    equipmentName: Yup.string().required("Required"),
    equipmentType: Yup.string().required("Required"),
    equipmentDescription: Yup.string().required("Required"),
    equipmentInstruction: Yup.string().required("Required"),
    availableQuantity: Yup.number()
      .required("Required")
      .positive("Quantity must be positive")
      .integer("Quantity must be an integer"),
  });
  //submit validation

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log("Form data", values);
      const response = await FormService.postLabEquipment(values);
      console.log("Response from server:", response);
      alert("Form submitted successfully!");

      navigate("/Admin/Database/AdminDatabaseInsert");
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

  const equipmentType = [
    { "key": "Glassware", "value": "Glassware" },
    { "key": "Measuring Instruments", "value": "Measuring Instruments" },
    { "key": "Containers", "value": "Containers" },
    { "key": "Heating and Combustion", "value": "Heating and Combustion" },
    { "key": "Mixing and Stirring", "value": "Mixing and Stirring" },
    { "key": "Safety Equipment", "value": "Safety Equipment" },
    { "key": "Analytical Instruments", "value": "Analytical Instruments" },
    { "key": "Miscellaneous Equipment", "value": "Miscellaneous Equipment" }
  ];

  return (
    <Box sx={{ marginTop: "50px", marginLeft: "10px", marginRight: "10px" }}>
      <div
        style={{ textAlign: "center", marginBottom: "40px", marginTop: "40px" }}
      >
        <Typography variant="h2" gutterBottom>
          Add Lab Equipment
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
                    label="Equipment Name"
                    name="equipmentName"
                    className="input-spacing"
                  />

<FormikControl
                    control="select"
                    label={`Select Equipment Type`}
                    name={`equipmentType`}
                    options={equipmentType}
                  />

                  <FormikControl
                    control="textarea"
                    label="Equipment Description"
                    name="equipmentDescription"
                    className="input-spacing"
                  />

                  <FormikControl
                    control="textarea"
                    label="Equipment Instruction"
                    name="equipmentInstruction"
                    className="input-spacing"
                  />

                  <FormikControl
                    control="input"
                    type="textAmount"
                    label="Quantity"
                    name="availableQuantity"
                    onKeyPress={(event) => {
                      // Allow only numbers and special keys
                      const charCode = event.which
                        ? event.which
                        : event.keyCode;
                      if (charCode < 48 || charCode > 57) {
                        event.preventDefault();
                      }
                    }}
                  />

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

export default AdminInsertLiquidChemical;
