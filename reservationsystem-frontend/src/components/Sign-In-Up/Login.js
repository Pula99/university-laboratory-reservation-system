import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import backgroundImage from "../../images/bg-white-1.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    width: "90%",
    maxWidth: 400,
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    boxShadow: theme.shadows[4],
    textAlign: "center",
  },
  inputField: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  errorText: {
    color: theme.palette.error.main,
    marginBottom: theme.spacing(2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const [userData, setUserData] = useState(null); // State to store user data
  const [loginDetails, setLoginDetails] = useState(null); // State to store login details

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Get the navigate function for navigation


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set isLoading to true when logging in
    try {
      // await new Promise((resolve) => setTimeout(resolve, 2500));

       await new Promise((resolve) => setTimeout(resolve, 2500));

      const response = await axios.post(
        "http://localhost:8080/api/v1/users/login",
        {
          userName: username,
          password,
        }
      );

      

       // Save login details locally
       const loginDetails = {
        username,
      };
      localStorage.setItem("loginDetails", JSON.stringify(loginDetails));
      console.log("loginDetails",loginDetails)

      const { role } = response.data;

      const roleResponse = await axios.get(
        `http://localhost:8080/api/v1/users/${username}`
      );

      const userRole = roleResponse.data.role;

      if (userRole === "ADMIN") {
        navigate("/Admin/Home");
      } else if (userRole === "LECTURER") {
        console.log("Navigating to Home");
        navigate("/Home");
      } else if (userRole === "TO") {
        navigate("/TO-dashboard");
      } else {
        setError("Invalid username or password");

          // Save login details locally
          const loginDetails = {
            username,
          };
          localStorage.setItem("loginDetails", JSON.stringify(loginDetails));
          console.log("loginDetails",loginDetails)
        
      } 

      
    } catch (error) {
      setError("Invalid username or password error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/users/${username}`);
        const userData = response.data; 
        setUserData(userData); 

        localStorage.setItem("userData", JSON.stringify(userData));
        console.log("UserData",userData)
      } 
      catch (error) {
       if (error.response && error.response.status === 404) {
        console.log("User not found");
      } 
      }
    };
    if (username) {
      fetchUserData();
    }
  }, [username]); 

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("loginDetails"));
    setLoginDetails(data);
  }, []);


  return (
    <div className={classes.root}>
      <Box className={classes.formContainer}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            className={classes.inputField}
            type="userName"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
            disabled={isLoading}
          />
          
          <TextField
            className={classes.inputField}
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            disabled={isLoading}
          />
          {error && (
            <Typography className={classes.errorText}>{error}</Typography>
          )}
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default Login;
