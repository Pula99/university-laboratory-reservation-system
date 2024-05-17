import React, { useEffect, useState } from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import FormService from "../Services/FormService";
import "../../App.css";
import { Box, Container } from "@mui/system";
import { Grid, Typography } from "@material-ui/core";
import Navbar from "../PageNavbar";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

function FormikContainer() {
  const [solidChemicals, setSolidChemicals] = useState([]);
  const [liquidChemicals, setLiquidChemicals] = useState([]);
  const [labEquipments, setLabEquipments] = useState([]);
  const [loginDetails, setLoginDetails] = useState([]);
  const navigate = useNavigate();

  const sendMail = (values) => {
    // Your EmailJS service ID, template ID, and Public Key
    const serviceId = "service_584mqzy";
    const templateId = "template_ci9bz7l";
    const publicKey = "-8a-xvSoilHlpUHUp";

    // Create a new object that contains dynamic template params
    const templateParams = {
      from_name: "admin",
      from_email: values.email,
      from_requestingCentre: values.requestingCentre,
      from_orderDetails: values.orderDetails,
      from_orderDate: values.orderDate,
      from_liquidChemicalName: values.requestedLiquidChemicals
        .map((chemical) => `${chemical.chemicalName}\n`)
        .join(""),
      from_litre: values.requestedLiquidChemicals
        .map((chemical) => `${chemical.litre}\n`)
        .join(""),
      from_solidChemicalName: values.requestedSolidChemicals
        .map((chemical) => `${chemical.chemicalName}\n`)
        .join(""),
      from_grams: values.requestedSolidChemicals
        .map((chemical) => `${chemical.grams}\n`)
        .join(""),
      from_labEquipmentName: values.requestedLabEquipments
        .map((equipment) => `${equipment.equipmentName}\n`)
        .join(""),
      from_quantity: values.requestedLabEquipments
        .map((equipment) => `${equipment.quantity}\n`)
        .join(""),
    };

    // Send the email using EmailJS
    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("Email sent successfully!", response);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  const requestedCentreDropDownOptions = [
    {
      key: "Anuradhapura Regional Centre",
      value: "Anuradhapura Regional Centre",
    },
    { key: "Badulla Regional Centre", value: "Badulla Regional Centre" },
    { key: "Batticaloa Regional Centre", value: "Batticaloa Regional Centre" },
    { key: "Jaffna Regional Centre", value: "Jaffna Regional Centre" },
    { key: "Kandy Regional Centre", value: "Kandy Regional Centre" },
    { key: "Kurunegala Regional Centre", value: "Kurunegala Regional Centre" },
    { key: "Matara Regional Centre", value: "Matara Regional Centre" },
    { key: "Ratnapura Regional Centre", value: "Ratnapura Regional Centre" },
  ];

  const grams = [
    { key: "50", value: "50" },
    { key: "100", value: "100" },
    { key: "150", value: "150" },
    { key: "200", value: "200" },
    { key: "250", value: "250" },
    { key: "300", value: "300" },
    { key: "350", value: "350" },
    { key: "400", value: "400" },
    { key: "450", value: "450" },
    { key: "500", value: "500" },
    { key: "550", value: "550" },
    { key: "600", value: "600" },
    { key: "650", value: "650" },
    { key: "700", value: "700" },
    { key: "750", value: "750" },
    { key: "800", value: "800" },
    { key: "850", value: "850" },
    { key: "900", value: "900" },
    { key: "950", value: "950" },
    { key: "1000", value: "1000" },

  ];

  const litre = [
    { key: "1", value: "1" },
    { key: "2", value: "2" },
    { key: "3", value: "3" },
    { key: "4", value: "4" },
    { key: "5", value: "5" },
    { key: "6", value: "6" },
    { key: "7", value: "7" },
    { key: "8", value: "8" },
    { key: "9", value: "9" },
    { key: "10", value: "10" },

  ];

  const quantity = [
    { key: "1", value: "1" },
    { key: "2", value: "2" },
    { key: "3", value: "3" },
    { key: "4", value: "4" },
    { key: "5", value: "5" },
    { key: "6", value: "6" },
    { key: "7", value: "7" },
    { key: "8", value: "8" },
    { key: "9", value: "9" },
    { key: "10", value: "10" },

  ];

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    setLoginDetails(data);
  }, []);

  useEffect(() => {
    const fetchSolidChemicals = async () => {
      try {
        const response = await FormService.getSolidChemicalNames();
        const formattedSolidChemicals = response.data.map((solidChemicals) => ({
          key: solidChemicals.chemicalName,
          value: solidChemicals.id,
        }));
        setSolidChemicals(formattedSolidChemicals);
      } catch (error) {
        console.error("Error fetching chemicals:", error);
      }
    };

    fetchSolidChemicals();
  }, []);

  useEffect(() => {
    const fetchLiquidChemicals = async () => {
      try {
        const response = await FormService.getLiquidChemicalNames();
        const formattedLiquidChemicals = response.data.map(
          (liquidChemicals) => ({
            key: liquidChemicals.chemicalName,
            value: liquidChemicals.id,
          })
        );
        setLiquidChemicals(formattedLiquidChemicals);
      } catch (error) {
        console.error("Error fetching Liquid chemicals:", error);
      }
    };
    fetchLiquidChemicals();
  }, []);

  useEffect(() => {
    const fetchLabEquipments = async () => {
      try {
        const response = await FormService.getLabEquipmentNames();
        const formattedLabEquipments = response.data.map((labEquipment) => ({
          key: labEquipment.equipmentName,
          value: labEquipment.id,
        }));
        setLabEquipments(formattedLabEquipments);
      } catch (error) {
        console.error("Error fetching lab equipments:", error);
      }
    };

    fetchLabEquipments();
  }, []);

  //Initial Vaules

  const initialValues = {
    name: loginDetails ? loginDetails.userName : "",
    email: loginDetails ? loginDetails.email : "",
    requestingCentre: "",
    orderDetails: "",
    requestedLiquidChemicals: [{ chemicalName: "null", litre: "0" }],
    requestedSolidChemicals: [{ chemicalName: "null", grams: "0" }],
    requestedLabEquipments: [{ equipmentName: "null", quantity: "0" }],
    orderDate: "",
  };

  //Validations of Values

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    requestingCentre: Yup.string().required("Required"),
    orderDetails: Yup.string().required("Required"),

    // requestedLiquidChemicals: Yup.array().of(
    //   Yup.object().shape({
    //     chemicalName: Yup.string().required("Required"),
    //     litre: Yup.number()
    //       .required("Quantity is required")
    //       .min(1, "Quantity must be at least 1"),
    //   })
    // ),

    // selectChemicals: Yup.array().of(
    //   Yup.object().shape({
    //     chemicalName: Yup.string().required("Required"),
    //     grams: Yup.number()
    //       .required("Quantity is required")
    //       .min(1, "Quantity must be at least 1"),
    //   })
    // ),

    // selectLabEquipments: Yup.array().of(
    //   Yup.object().shape({
    //     labEquipmentName: Yup.string().required("Equipment ID is required"),
    //     quantity: Yup.number()
    //       .required("Quantity is required")
    //       .min(1, "Quantity must be at least 1"),
    //   })
    // ),

    orderDate: Yup.date().required("Required").nullable(),
  });

  //submit validation

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log("Form data", values);
      // Call the FormService to submit the form data
      const response = await FormService.submitReservation(values);
      console.log("Response from server:", response);

      alert("Form submitted successfully!");
      localStorage.setItem("submittedFormData", JSON.stringify(values));
      navigate("/Reservation/ReservationSummary");
      sendMail(values);
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
      // Reset the form state
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
          Reservation Form
        </Typography>

      </div>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
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
                    name="name"
                    className="input-spacing"
                    readOnly={true}
                  />

                  <FormikControl
                    control="input"
                    type="email"
                    label="Email"
                    name="email"
                    className="input-spacing"
                    readOnly={true}
                  />

                  <FormikControl
                    control="select"
                    label={`Select Requesting Centre`}
                    name={`requestingCentre`}
                    options={requestedCentreDropDownOptions}
                  />

                  <FormikControl
                    control="textarea"
                    label="Order Details"
                    name="orderDetails"
                    placeholder="Enter your order details "
                    className="input-spacing"
                  />

                  <FormikControl
                    control="date"
                    type="date"
                    label="Select Data"
                    name="orderDate"
                    className="input-spacing"
                    style={{ cursor: "pointer", userSelect: "none" }}
                  />

                  <FieldArray name="requestedLiquidChemicals">
                    {(arrayHelpers) => (
                      <div>
                        {formik.values.requestedLiquidChemicals.map(
                          (requestedLiquidChemical, index) => (
                            <Grid
                              container
                              spacing={1}
                              alignItems="center"
                              key={index}
                            >
                              <Grid item xs={5.9}>
                                <FormikControl
                                  control="select"
                                  label={`Select Liquid Chemical ${index + 1}`}
                                  name={`requestedLiquidChemicals[${index}].chemicalName`}
                                  options={liquidChemicals}
                                  value={
                                    formik.values.requestedLiquidChemicals[
                                      index
                                    ]?.chemicalName || ""
                                  }
                                />
                              </Grid>
                              <Grid item md={5.9}>
                                <FormikControl
                                  control="select"
                                  label={`Amount in Litre`}
                                  name={`requestedLiquidChemicals[${index}].litre`}
                                  options={litre}
                                  style={{ width: "150px" }}
                                />

                                {/* <FormikControl
                                  control="input"
                                  type="textAmount"
                                  label="Amount in Litre"
                                  name={`requestedLiquidChemicals[${index}].litre`}
                                  onKeyPress={(event) => {
                                    // Allow only numbers and special keys
                                    const charCode = event.which
                                      ? event.which
                                      : event.keyCode;
                                    if (charCode < 48 || charCode > 57) {
                                      event.preventDefault();
                                    }
                                  }}
                                /> */}

                              </Grid>
                              {index > 0 && (
                                <Grid item xs={1}>
                                  <button
                                    className="buttonRemove"
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)}
                                    style={{ marginBottom: "10px" }}
                                  >
                                    Remove
                                  </button>
                                </Grid>
                              )}
                            </Grid>
                          )
                        )}
                        <button
                          type="button"
                          onClick={() =>
                            arrayHelpers.push({ chemicalId: "", amount: "" })
                          }
                          style={{ marginBottom: "20px" }}
                        >
                          Add Chemical
                        </button>
                      </div>
                    )}
                  </FieldArray>

                  <FieldArray name="requestedSolidChemicals">
                    {(arrayHelpers) => (
                      <div>
                        {formik.values.requestedSolidChemicals.map(
                          (requestedSolidChemicals, index) => (
                            <Grid
                              container
                              spacing={1}
                              alignItems="center"
                              key={index}
                            >
                              <Grid item xs={5.9}>
                                <FormikControl
                                  control="select"
                                  label={`Select Solid Chemical ${index + 1}`}
                                  name={`requestedSolidChemicals[${index}].chemicalName`}
                                  options={solidChemicals}
                                  value={
                                    formik.values.requestedSolidChemicals[index]
                                      ?.chemicalName || ""
                                  }
                                />
                              </Grid>
                              <Grid item md={5.5}>
                              
                                <FormikControl
                                  control="select"
                                  label={`Amount in Grams`}
                                  name={`requestedSolidChemicals[${index}].grams`}
                                  options={grams}
                                  style={{ width: "150px" }}
                                />


                                {/* <FormikControl
                                  control="input"
                                  type="textAmount"
                                  label="Amount in Grams"
                                  name={`requestedSolidChemicals[${index}].grams`}
                                  onKeyPress={(event) => {
                                    // Allow only numbers and special keys
                                    const charCode = event.which
                                      ? event.which
                                      : event.keyCode;
                                    if (charCode < 48 || charCode > 57) {
                                      event.preventDefault();
                                    }
                                  }}
                                /> */}


                              </Grid>
                              {index > 0 && (
                                <Grid item xs={1}>
                                  <button
                                    className="buttonRemove"
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)}
                                    style={{ marginBottom: "10px" }}
                                  >
                                    Remove
                                  </button>
                                </Grid>
                              )}
                            </Grid>
                          )
                        )}
                        <button
                          type="button"
                          onClick={() =>
                            arrayHelpers.push({ chemicalId: "", amount: "" })
                          }
                          style={{ marginBottom: "20px" }}
                        >
                          Add Chemical
                        </button>
                      </div>
                    )}
                  </FieldArray>

                  <FieldArray name="requestedLabEquipments">
                    {(arrayHelpers) => (
                      <div>
                        {formik.values.requestedLabEquipments.map(
                          (requestedLabEquipments, index) => (
                            <Grid
                              container
                              spacing={1}
                              alignItems="center"
                              key={index}
                            >
                              <Grid item xs={5.9}>
                                <FormikControl
                                  control="select"
                                  label={`Select Lab Equipment ${index + 1}`}
                                  name={`requestedLabEquipments[${index}].equipmentName`}
                                  options={labEquipments}
                                  value={
                                    formik.values.requestedLabEquipments[index]
                                      ?.equipmentName || ""
                                  }
                                />
                              </Grid>
                              <Grid item md={5.5}>
                              <FormikControl
                                  control="select"
                                  label={`Quantity`}
                                  name={`requestedLabEquipments[${index}].quantity`}
                                  options={quantity}
                                  style={{ width: "150px" }}
                                />
                                {/* <FormikControl
                                  control="input"
                                  type="textAmount"
                                  label="Quantity"
                                  name={`requestedLabEquipments[${index}].quantity`}
                                  onKeyPress={(event) => {
                                    // Allow only numbers and special keys
                                    const charCode = event.which
                                      ? event.which
                                      : event.keyCode;
                                    if (charCode < 48 || charCode > 57) {
                                      event.preventDefault();
                                    }
                                  }}
                                /> */}
                              </Grid>
                              {index > 0 && (
                                <Grid item xs={1}>
                                  <button
                                    className="buttonRemove"
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)}
                                    style={{ marginBottom: "10px" }}
                                  >
                                    Remove
                                  </button>
                                </Grid>
                              )}
                            </Grid>
                          )
                        )}
                        <button
                          type="button"
                          onClick={() =>
                            arrayHelpers.push({
                              labEquipmentName: "",
                              quantity: "",
                            })
                          }
                          style={{ marginBottom: "20px" }}
                        >
                          Add Lab Equipment
                        </button>
                      </div>
                    )}
                  </FieldArray>

                  <button
                    className="buttonSubmit"
                    type="submit"
                    style={{ marginBottom: "100px" }}
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default FormikContainer;
