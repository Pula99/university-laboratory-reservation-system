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
    chemicalName: "",
    chemicalCommonName: "",
    chemicalFormula: "",
    chemicalProperties: "",
    chemicalHazard: "",
    storageCondition: "",
    safetyDataSheet: "",
    purchaseDate: "",
    expireDate: "",
    availableQuantityInLitre: "",
  };

  //Validations of Values

  const validationSchema = Yup.object({
    chemicalName: Yup.string().required("Required"),
    chemicalCommonName: Yup.string().required("Required"),
    chemicalFormula: Yup.string().required("Required"),
    chemicalProperties: Yup.string().required("Required"),
    chemicalHazard: Yup.string().required("Required"),
    storageCondition: Yup.string().required("Required"),
    safetyDataSheet: Yup.string()
      .required("Required")
      .url("Must be a valid URL"),
    purchaseDate: Yup.date().required("Required").nullable(),
    expireDate: Yup.date().required("Required").nullable(),
    availableQuantityInLitre: Yup.number()
      .required("Required")
      .positive("Quantity must be positive")
      .integer("Quantity must be an integer"),
  });
  //submit validation

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log("Form data", values);
      const response = await FormService.postLiquidChemical(values);
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

  const chemicalHazard = [
    { key: "Toxicity", value: "Toxicity" },
    { key: "Carcinogenicity", value: "Carcinogenicity" },
    { key: "Mutagenicity", value: "Mutagenicity" },
    { key: "Teratogenicity", value: "Teratogenicity" },
    { key: "Irritants", value: "Irritants" },
    { key: "Corrosivity", value: "Corrosivity" },
    { key: "Flammability", value: "Flammability" },
    { key: "Explosivity", value: "Explosivity" },
    { key: "Reactivity", value: "Reactivity" },
    { key: "Sensitization", value: "Sensitization" },
  ];

  return (
    <Box sx={{ marginTop: "50px", marginLeft: "10px", marginRight: "10px" }}>
      <div
        style={{ textAlign: "center", marginBottom: "40px", marginTop: "40px" }}
      >
        <Typography variant="h2" gutterBottom>
          Add Liquid Chemical
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
                    label="Chemical Name"
                    name="chemicalName"
                    className="input-spacing"
                  />

                  <FormikControl
                    control="input"
                    type="text"
                    label="Chemical Commonc Name"
                    name="chemicalCommonName"
                    className="input-spacing"
                  />

                  <FormikControl
                    control="input"
                    type="text"
                    label="Chemical Formula"
                    name="chemicalFormula"
                    className="input-spacing"
                  />

                  <FormikControl
                    control="textarea"
                    label="Chemical Properties"
                    name="chemicalProperties"
                    className="input-spacing"
                  />

                  <FormikControl
                    control="select"
                    label={`Select Chemical Hazard`}
                    name={`chemicalHazard`}
                    options={chemicalHazard}
                  />

                  <FormikControl
                    control="textarea"
                    label="Storage Condition"
                    name="storageCondition"
                    className="input-spacing"
                  />

                  <FormikControl
                    control="input"
                    type="text"
                    label="Safety Data Sheet"
                    name="safetyDataSheet"
                    className="input-spacing"
                  />

                  <FormikControl
                    control="date"
                    type="date"
                    label="Select Purchase Date"
                    name="purchaseDate"
                    className="input-spacing"
                    style={{ cursor: "pointer", userSelect: "none" }}
                  />

                  <FormikControl
                    control="date"
                    type="date"
                    label="Select Expire Date"
                    name="expireDate"
                    className="input-spacing"
                    style={{ cursor: "pointer", userSelect: "none" }}
                  />

                  <FormikControl
                    control="input"
                    type="textAmount"
                    label="Amount in Litre"
                    name="availableQuantityInLitre"
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
