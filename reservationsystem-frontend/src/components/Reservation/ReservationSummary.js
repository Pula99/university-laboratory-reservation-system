import React, { useEffect, useState } from "react";
import PageNavbar from "../PageNavbar";
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
import SummaryCard from "./SummaryCard";
import { useNavigate } from "react-router-dom";

function ReservationSummary() {
  const [submittedData, setSubmittedData] = useState(null);
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/Reservation/ReservationNotice");
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("submittedFormData"));
    setSubmittedData(data);
  }, []);

  return (
    <div>
      <PageNavbar />
      <div
        style={{ textAlign: "center", marginBottom: "40px", marginTop: "40px" }}
      >
        <Typography variant="h2" gutterBottom>
          Reservation Summary
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
              maxWidth: 800,
              margin: "auto",
            }}
          >
            {submittedData && (
              <div style={{ marginBottom: "10px" }}>
                <SummaryCard title="Name" content={submittedData.name} />
                <SummaryCard title="Email" content={submittedData.email} />
                <SummaryCard
                  title="Requesting Centre"
                  content={submittedData.requestingCentre}
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
                        value={submittedData.orderDetails}
                        InputProps={{
                          style: { color: 'black' } 
                        }}
                      />
                    </CardContent>
                  </Card>
                </Box>

                <SummaryCard
                  title="Order Date"
                  content={submittedData.orderDate}
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
                          {submittedData.requestedLiquidChemicals.map(
                            (chemical, index) => (
                              <TableRow
                                key={chemical.chemicalName}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell>{chemical.chemicalName}</TableCell>
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
                          {submittedData.requestedSolidChemicals.map(
                            (chemical, index) => (
                              <TableRow
                                key={chemical.chemicalName}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell>{chemical.chemicalName}</TableCell>
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
                          {submittedData.requestedLabEquipments.map(
                            (equipment, index) => (
                              <TableRow
                                key={equipment.equipmentName}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell>{equipment.equipmentName}</TableCell>
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
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    className="buttonSubmit"
                    type="submit"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default ReservationSummary;
