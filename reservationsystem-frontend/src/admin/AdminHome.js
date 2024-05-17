import React from "react";
import { CssBaseline, Grid, Button, Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import backgroundImage from "../images/bg-white-1.jpg";
import { Navigate, useNavigate } from "react-router-dom";

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
    maxWidth: 300,
    textAlign: "center",
    height: "100%",
    width:"100%" 
  },
  gridItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "200px", 
  },
  button: {
    width: "250px",
    height: "150px", 
  },
}));

const AdminHome = () => {
  const classes = useStyles();

  const navigate = useNavigate()

  const handleUserManagementClick = () => {
    navigate("/Admin/UserManagment");
  };

  const handleDatabase = () => {
    navigate("/Admin/Database")
  }

  const handleLogout = () => {
    navigate("/")
  }



  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid container spacing={3} justifyContent="center">
        
        <Grid item xs={6} sm={3} className={classes.gridItem}>
          <Card className={classes.card}>
            <CardContent>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleUserManagementClick}
                style={{ backgroundColor: "#208ddb", color: "white" }}
              >
                User Managment
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} sm={3} className={classes.gridItem}>
          <Card className={classes.card}>
            <CardContent>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleDatabase}
                style={{ backgroundColor: "#208ddb", color: "white" }}
              >
                Database Managment
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} sm={3} className={classes.gridItem}>
          <Card className={classes.card}>
            <CardContent>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleLogout}
                style={{ backgroundColor: "#208ddb", color: "white" }}
              >
                Logout
              </Button>
            </CardContent>
          </Card>
        </Grid>
       
        
      </Grid>
    </div>
  );
};

export default AdminHome;
