import React from "react";
import PageNavbar from "../PageNavbar";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

function ReservationNotice() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/Home");
  };

  return (
    <div>
      <PageNavbar />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            my={4}
            display="flex"
            flexDirection="column" // Change to column layout
            alignItems="center"
            gap={4}
            p={2}
            sx={{
              border: "2px solid grey",
              width: "100%",
              maxWidth: 800,
              margin: "auto",
              textAlign: "center",
            }}
          >
            <div style={{ margin: "auto", flex: 1 }}>
              {" "}
              {/* Ensure flex item fills available space */}
              <Typography variant="h2" gutterBottom>
                Thank You
              </Typography>
              <Typography>
                Thank you for your order. Your reservation has been successfully
                processed through the University Laboratory Reservation System.
                We are currently preparing your order according to your
                specifications. Rest assured, we will notify you promptly once
                it is ready for delivery. <br/><br/>
               
    
      
                Best regards,<br/> The University
                Laboratory Team

               
              </Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                className="buttonRemove"
                type="submit"
                onClick={handleNext}
              >
                Exit
              </button>
            </div>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default ReservationNotice;
