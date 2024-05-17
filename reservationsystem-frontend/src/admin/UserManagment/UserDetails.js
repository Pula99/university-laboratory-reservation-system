import React, { useEffect, useState } from "react";
import PageNavbar from "../../components/PageNavbar";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import { Box } from "@mui/system";
import SummaryCard from "../../components/Reservation/SummaryCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormService from "../../components/Services/FormService";

function UserDetails() {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [id, setId] = useState("");
  const [idReservation, setIdReservation] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/Admin/UserManagment/ManageUsers");
  };

  useEffect(() => {
    const fetchReservationDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/reservations/userReservationData/${id}`
        );
        setSelectedReservation(response.data);
        console.log(selectedReservation)
      } catch (error) {
        console.error("Error fetching reservation details:", error);
      }
    };

    if (id) {
      fetchReservationDetails();
    }
  }, [id]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/users/${id}`
        );
        setSelectedUser(response.data);
      } catch (error) {
        console.error("Error fetching User details:", error);
      }
    };

    if (id) {
      fetchUserDetails();
    }
  }, [id]);

  useEffect(() => {
    const selectedUser = JSON.parse(localStorage.getItem("SelectedUser"));
    if (selectedUser) {
      const userName = selectedUser.userName;
      const id = selectedUser.id;
      setId(userName);
      setIdReservation(id);
    }
  }, []);

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          marginBottom: "40px",
          marginTop: "40px",
        }}
      >
        <Typography variant="h2" gutterBottom>
          User Details
        </Typography>
      </div>
      <Grid container spacing={2} style={{ marginBottom: "100px" }}>
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
              maxWidth: 800,
              margin: "auto",
            }}
          >
            {selectedUser && (
              <div style={{ marginBottom: "10px" }}>
                <SummaryCard title="Name" content={selectedUser.userName} />
                <SummaryCard title="Email" content={selectedUser.email} />
                <SummaryCard title="Email" content={selectedReservation.name} />
                <SummaryCard
                  title="Requesting Centre"
                  content={selectedUser.role}
                />
              </div>
              
            )}
            
          </Box>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    className="buttonRemove"
                    type="submit"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                </div>
        </Grid>
      </Grid>
      
       
      




      
    </div>
  );
}

export default UserDetails;
