import React from "react";
import PageNavbar from "../../components/PageNavbar";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import { makeStyles } from "@material-ui/core/styles";
import { FiArrowRight } from "react-icons/fi";
import {
  Button,
  Card,
  CardContent,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "55vh",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: theme.spacing(2),
    backgroundSize: "cover",
  },
  card: {
    maxWidth: 300,
    textAlign: "center",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  gridItem: {
    height: "200px",
  },
  button: {
    width: "250px",
    height: "150px",
  },
}));

const DatabaseMenu = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  const handleLiquidChemicalDatabase = () => {
    navigate("/DatabaseMenu/LiquidChemicalDatabase");
  };

  const handleSolidChemicalDatabase = () => {
    navigate("/DatabaseMenu/SolidChemicalDatabase");
  };

  const handleLabEquipmentDatabase = () => {
    navigate("/DatabaseMenu/LabEquipmentDatabase");
  };

  return (
    <div>
      <PageNavbar />

      <div className={classes.root}>
        {" "}
        <Typography component="h1" variant="h2" marginBottom="100px">
          View Database
        </Typography>
        <CssBaseline />
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={6} sm={3} className={classes.gridItem}>
            <Card className={classes.card}>
              <CardContent>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={handleLiquidChemicalDatabase}
                  style={{ backgroundColor: "#208ddb", color: "white" }}
                >
                  <Typography>Liquid Chemical Database</Typography>
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6} sm={3} className={classes.gridItem}>
            <Card className={classes.card}>
              <CardContent>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={handleSolidChemicalDatabase}
                  style={{ backgroundColor: "#208ddb", color: "white" }}
                >
                  <Typography>Solid Chemical Database</Typography>
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6} sm={3} className={classes.gridItem}>
            <Card className={classes.card}>
              <CardContent>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={handleLabEquipmentDatabase}
                  style={{ backgroundColor: "#208ddb", color: "white" }}
                >
                  <Typography> Lab Equipment Database</Typography>{" "}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default DatabaseMenu;
