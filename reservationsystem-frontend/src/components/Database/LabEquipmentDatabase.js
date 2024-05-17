import {
  Box,
  Button,
  Container,
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FormService from "../Services/FormService";
import { useNavigate } from "react-router-dom";
import PageNavbar from "../PageNavbar";

const defaultTheme = createTheme();

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableHeadCell: {
    fontSize: 16,
    backgroundColor: "#C8CCE0",
    color: "#000000",
    fontWeight: "bold",
    border: "1px solid #000000",
    padding: "8px",
    textAlign: "center",
  },
  tableBodyCell: {
    fontSize: 14,
  },
  tableCell: {
    fontSize: 14,
    backgroundColor: "#F0F8FF",
    color: "#000000",
    fontWeight: "bold",
    border: "1px solid #000000",
    padding: "8px",
    textAlign: "center",
  }, 
  fixedWidthCell: {
    width: "100px", // Adjust the width as needed
  },
}));

export default function LabEquipmentDatabase() {
  const [loading, setLoading] = useState(true);
  const [labequipments, setlabequipments] = useState([]);
  const [filteredlabequipments, setFilteredlabequipments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await FormService.getLabEquipmentNames();
        setlabequipments(response.data);
        setFilteredlabequipments(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleBack = () => {
    navigate("/DatabaseMenu");
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    if (!searchTerm) {
      setFilteredlabequipments(labequipments);
    } else {
      const filteredlabequipments = labequipments.filter((row) => {
        const labequipmentsName = row.equipmentName.toLowerCase();
        return labequipmentsName.includes(searchTerm);
      });
      setFilteredlabequipments(filteredlabequipments);
    }
  };

  const prependProtocol = (url) => {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };

  const shortenLink = (url) => {
    const { pathname } = new URL(url);
    const maxCharacters = 15;
    return pathname.length > maxCharacters
      ? `${pathname.slice(0, maxCharacters)}...`
      : pathname;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <PageNavbar />
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginTop="20px"
          marginBottom="20px"
        >
          <Typography component="h1" variant="h2" marginBottom="10px">
           Lab Equipments Database
          </Typography>
          <button variant="contained" color="primary" onClick={handleBack}>
            Back
          </button>
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginTop="20px"
          marginBottom="40px"
        >
          <TextField
            label="Search by labequipments Name"
            fullWidth
       value={searchTerm}
            onChange={handleSearch}

          />
        </Box>


        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginTop="20px"
          marginBottom="20px"
        >
          <Table size="medium" className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeadCell}>Name</TableCell>
                <TableCell className={classes.tableHeadCell}>
                  Type
                </TableCell>
                <TableCell className={classes.tableHeadCell}>
                  Description
                </TableCell>
                <TableCell className={classes.tableHeadCell}>
                  Instructions
                </TableCell>
  
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading &&
                filteredlabequipments.map((labequipments) => (
                  <TableRow key={labequipments.labequipmentsName}>
                    <TableCell className={classes.tableCell}>
                      {labequipments.equipmentName}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {labequipments.equipmentType}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {labequipments.equipmentDescription}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {labequipments.equipmentInstruction}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
