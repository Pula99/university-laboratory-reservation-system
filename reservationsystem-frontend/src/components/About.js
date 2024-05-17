import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PageNavbar from "./PageNavbar";
import Footer from "./Footer";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        Faculty of Natural Sciences
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function About() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <PageNavbar />
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          width="100%"
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h2">
            About
          </Typography>

          <p>
            {" "}
            <br />
            Welcome to our online laboratory chemical reservation system at Open
            University of Sri Lanka. We are dedicated to providing a streamlined
            and efficient solution for managing the reservation of laboratory
            chemicals, ensuring a safe and organized environment for our
            students and faculty members.
            <br />
            <br />
            We understand the critical role that laboratory experiments play in
            the education and research process. Our reservation system is
            designed to simplify the process of acquiring the necessary
            chemicals while adhering to the highest standards of safety and
            compliance. With a user-friendly interface, students and researchers
            can easily browse our extensive catalog of chemicals, check their
            availability, and make reservations with just a few clicks.
            <br />
            <br />
            Our team is committed to continuously enhancing the user experience
            and expanding the range of available chemicals to meet the diverse
            needs of our academic community. Whether you're a student embarking
            on a class experiment or a researcher working on groundbreaking
            discoveries, our online reservation system is here to support your
            journey.
          </p>
        </Box>

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
