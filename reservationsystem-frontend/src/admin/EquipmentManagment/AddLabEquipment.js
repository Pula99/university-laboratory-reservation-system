import React, { useState } from "react";
import { CssBaseline, Grid, Button, Card, CardContent, TextField, InputLabel, Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import backgroundImage from "../../images/bg-white.jpg";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle, Typography } from "@mui/material";
import { format } from "date-fns";
import { Box } from "@mui/system";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: theme.spacing(2),
    background: `url(${backgroundImage})`,
    backgroundSize: "cover",
  },
  card: {
    maxWidth: 400,
    width: "100%",
  },
  gridItem: {
    maxWidth: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const AddLabEquipment = () => {
  const classes = useStyles();

  const [equipment_name, set_equipment_name] = useState("");
  const [equipment_type, set_equipment_type] = useState("");
  const [equipment_status, set_equipment_status] = useState("");
  const [equipment_description, set_equipment_description] = useState("");
  const [equipment_instruction, set_equipment_instruction] = useState("");
  const [error, setError] = useState("");
 
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

 

    try {
      const response = await fetch("http://localhost:8080/api/v2/labEquipment/createLabEquipment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            equipment_name,
            equipment_type,
            equipment_description,
            equipment_instruction,
            equipment_status
            
        }),
      });

      if (response.ok) {

        navigate("Admin/EquipmentManagment");
        console.log("Successful");
      } else {

        setError("Failed to create lab equipment. Please try again later.");
        console.error("Failed to create lab equipment:", response.statusText);
      }
    } catch (error) {

      setError("Network error occurred. Please try again later.");
      console.error("Error occurred:", error);
    }
  };

  const handleBack = () => {
    navigate("/Admin/EquipmentManagment");
  };
  
  return (
      <div className={classes.root}>
      <CssBaseline />
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={4} className={classes.gridItem}>

          
        <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="20px" marginBottom="20px">
          <Typography component="h1" variant="h2" marginBottom="10px">
            Database
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={handleBack}
          >
            Back
          </Button>
        </Box> 

          <Card className={classes.card}>
            <CardContent>
              {error && (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {error}
                </Alert>
              )}
              <form className={classes.form} onSubmit={handleSubmit}>
                <InputLabel id="role-label">Input Equipment Name</InputLabel>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="EquipmentName"
                  name="EquipmentName"
                  autoComplete="EquipmentName"
                  autoFocus
                  value={equipment_name}
                  onChange={(e) => set_equipment_name(e.target.value)}
                />
                <InputLabel id="role-label">Input Equipment Type</InputLabel>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="EquipmentType"
                  name="EquipmentType"
                  autoComplete="EquipmentType"
                  autoFocus
                  value={equipment_type}
                  onChange={(e) => set_equipment_type(e.target.value)}
                />
                <InputLabel id="role-label">Select Equipment Status</InputLabel>            
                <Select
                  labelId="role-label"
                  id="EquipmentStatus"
                  value={equipment_status}
                  onChange={(e) => set_equipment_status(e.target.value)}
                  fullWidth
                  variant="outlined"
                >
                  <MenuItem value={"Available"}>Available</MenuItem>
                  <MenuItem value={"InUse"}>In Use</MenuItem>
                  <MenuItem value={"Reserved"}>Reserved</MenuItem>
                  <MenuItem value={"Under_Maintenance"}>Under Maintenance</MenuItem>
                  <MenuItem value={"Out_of_Service"}>Out of Service</MenuItem>
                  <MenuItem value={"Damaged"}>Damaged</MenuItem>
                  <MenuItem value={"Lost"}>Lost</MenuItem>
                </Select>

                <InputLabel id="role-label">Input Equipment Description </InputLabel>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="EquipmentDescription"
                  name="EquipmentDescription"
                  autoComplete="EquipmentDescription"
                  autoFocus
                  value={equipment_description}
                  onChange={(e) => set_equipment_description(e.target.value)}
                />
                <InputLabel id="role-label">Input Equipment Instruction </InputLabel>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="EquipmentInstruction"
                  name="EquipmentInstruction"
                  autoComplete="EquipmentInstruction"
                  autoFocus
                  value={equipment_instruction}
                  onChange={(e) => set_equipment_instruction(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Input Data
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddLabEquipment;
