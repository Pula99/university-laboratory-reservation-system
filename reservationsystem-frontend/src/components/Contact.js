import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import PageNavbar from "./PageNavbar";
import Footer from "./Footer";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";


const sendMail = (values) => {
  const serviceId = "service_584mqzy";
  const templateId = "template_dde2774";
  const publicKey = "-8a-xvSoilHlpUHUp";

  // Create a new object that contains dynamic template params
  const templateParams = {
    from_firstName: values.firstName,
    from_lastName: values.lastName,
    from_email: values.email,
    from_phoneNumber: values.phoneNumber,
    from_message: values.message,
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

const Contact = () => {

  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/Home");
  };



  const validateEmail = (email) => {
    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Regular expression for validating phone number format (only integers)
    const phoneRegex = /^\d+$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget); // Access the form element using event.currentTarget
  
    const values = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phoneNumber: formData.get("phoneNumber"),
      message: formData.get("message"),
    };
    sendMail(values);
    handleNext();
    alert("Email Sent Successfully")
  };
  

  return (
    <div>
      <PageNavbar />
      <div className="contact-page-wrapper">
        <h1 className="primary-heading">Have a Question in Mind?</h1>
        <div>
          <Grid marginTop="10%">
            <Card style={{ maxWidth: 500 }}>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  Contact Us
                </Typography>
                <form id="contactForm" onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="firstName"
                        name="firstName"
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        required
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="lastName"
                        name="lastName"
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        required
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        required
                        error={!validateEmail}
                        helperText={
                          !validateEmail && "Please enter a valid email address"
                        }
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="phoneNumber"
                        label="Phone"
                        type="tel"
                        variant="outlined"
                        fullWidth
                        required
                        error={!validatePhoneNumber}
                        helperText={
                          !validatePhoneNumber &&
                          "Please enter a valid phone number (only integers)"
                        }
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="message"
                        label="Message"
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                        required
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
                
              </CardContent>
            </Card>
          </Grid>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
