import React, { useEffect, useState } from "react";
import PageNavbar from "../../PageNavbar";
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
import SummaryCard from "../../Reservation/SummaryCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormService from "../../Services/FormService";


function ReservationDetails() {
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/Dashboard/ReservationHistory");
  };

  const handleNext = () => {
    navigate("/Dashboard/ReservationNotice");
  };

  useEffect(() => {
    const fetchReservationDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/reservations/${id}`);
        setSelectedReservation(response.data);
      } catch (error) {
        console.error("Error fetching reservation details:", error);
      }
    };
  
    if (id) {
      fetchReservationDetails();
    }
  }, [id]);

  useEffect(() => {
    const selectedReservation = JSON.parse(localStorage.getItem("SelectedReservation"));
    if (selectedReservation) {
      const orderId = selectedReservation.orderDetails;
      setId(orderId);
    }
  }, []);

  return (
    <div>
      <PageNavbar />
      <div
        style={{ textAlign: "center", marginBottom: "40px", marginTop: "40px" }}
      >
        <Typography variant="h2" gutterBottom>
          Reservation Details
        </Typography>
      </div>
      <Grid container spacing={2} style={{marginBottom:"100px"}}>
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
            {selectedReservation && (
              <div style={{ marginBottom: "10px" }}>
                <SummaryCard title="Name" content={selectedReservation.name} />
                <SummaryCard title="Email" content={selectedReservation.email} />
                <SummaryCard
                  title="Requesting Centre"
                  content={selectedReservation.requestingCentre}
                />
               <Box sx={{ minWidth: 765, marginBottom: "20px" }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: "bold" }}
                      >
                        Order Details
                      </Typography>
                      <div style={{ marginBottom: "15px" }} />{" "}
                      <TextField
                        variant="outlined"
                        multiline
                        rows={5}
                        fullWidth
                        disabled
                        value={selectedReservation.orderDetails}
                        InputProps={{
                          style: { color: 'black' } 
                        }}
                      />
                    </CardContent>
                  </Card>
                </Box>
                <SummaryCard
                  title="Order Date"
                  content={selectedReservation.orderDate}
                />

                <SummaryCard title="Requested Liquid Chemicals">
                  <ul>
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 650 }}
                        size="small"
                        aria-label="a dense table"
                      >
                        <TableHead>
                          <TableRow bgcolor="#aaaaaa">
                            <TableCell> Liquid Chemical</TableCell>
                            <TableCell align="right">Litre</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selectedReservation.requestedLiquidChemicals && selectedReservation.requestedLiquidChemicals.map(
                            (chemical, index) => (
                              <TableRow
                                key={chemical.id} // Use chemical id as the key if available
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell>
                                  {chemical.liquidChemicalName}
                                </TableCell>
                                <TableCell align="right">
                                  {chemical.litre}
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </ul>
                </SummaryCard>

                <SummaryCard title="Requested Solid Chemicals">
                  <ul>
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 650 }}
                        size="small"
                        aria-label="a dense table"
                      >
                        <TableHead>
                          <TableRow bgcolor="#aaaaaa">
                            <TableCell> Solid Chemical</TableCell>
                            <TableCell align="right">Grams</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selectedReservation.requestedSolidChemicals && selectedReservation.requestedSolidChemicals.map(
                            (chemical, index) => (
                              <TableRow
                                key={chemical.id} // Use chemical id as the key if available
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell>
                                  {chemical.solidChemicalName}
                                </TableCell>
                                <TableCell align="right">
                                  {chemical.grams}
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </ul>
                </SummaryCard>

                <SummaryCard title="Requested LabEquipment">
                  <ul>
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 650 }}
                        size="small"
                        aria-label="a dense table"
                      >
                        <TableHead>
                          <TableRow bgcolor="#aaaaaa">
                            <TableCell> LabEquipment</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selectedReservation.requestedLabEquipments && selectedReservation.requestedLabEquipments.map(
                            (equipment, index) => (
                              <TableRow
                                key={equipment.id} // Use equipment id as the key if available
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell>
                                  {equipment.labEquipmentName}
                                </TableCell>
                                <TableCell align="right">
                                  {equipment.quantity}
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </ul>
                </SummaryCard>
                <Box textAlign="center" >
                        <button
                          className="buttonRemove"
                          onClick= {handleBack}
                        >
                          Back
                        </button>
                        {/* <button
                          className="buttonSubmit"
                          type="submit"
                          
                        >
                          View
                        </button> */}
                      </Box>
              </div>
            )}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default ReservationDetails;
