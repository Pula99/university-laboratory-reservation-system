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

export default function LiquidChemicalDatabase() {
  const [loading, setLoading] = useState(true);
  const [chemicals, setChemicals] = useState([]);
  const [filteredChemicals, setFilteredChemicals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await FormService.getLiquidChemicalNames();
        setChemicals(response.data);
        setFilteredChemicals(response.data);
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
      setFilteredChemicals(chemicals);
    } else {
      const filteredChemicals = chemicals.filter((row) => {
        const chemicalName = row.chemicalName.toLowerCase();
        return chemicalName.includes(searchTerm);
      });
      setFilteredChemicals(filteredChemicals);
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
           Liquid Chemical Database
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
            label="Search by Chemical Name"
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
                  CommonName
                </TableCell>
                <TableCell className={classes.tableHeadCell}>Formula</TableCell>
                <TableCell className={classes.tableHeadCell}>
                  Properties
                </TableCell>
                <TableCell className={classes.tableHeadCell}>Hazard</TableCell>
                <TableCell className={classes.tableHeadCell}>
                  Storage Condition
                </TableCell>
                <TableCell className={`${classes.tableHeadCell} ${classes.fixedWidthCell}`}>
                  Purchase Date
                </TableCell>
                <TableCell className={`${classes.tableHeadCell} ${classes.fixedWidthCell}`}>
                  Expire Date
                </TableCell>
                <TableCell className={classes.tableHeadCell}>
                  Availability
                </TableCell>
                <TableCell className={classes.tableHeadCell}>
                  Safety Data Sheet
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading &&
                filteredChemicals.map((chemical) => (
                  <TableRow key={chemical.chemicalName}>
                    <TableCell className={classes.tableCell}>
                      {chemical.chemicalName}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {chemical.chemicalCommonName}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {chemical.chemicalFormula}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {chemical.chemicalProperties}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {chemical.chemicalHazard}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {chemical.storageCondition}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {chemical.purchaseDate}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {chemical.expireDate}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {chemical.availableQuantityInLitre}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <a
                        href={prependProtocol(chemical.safetyDataSheet)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {shortenLink(chemical.safetyDataSheet)}
                      </a>
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
