import {
    Box,
    Button,
    Container,
    CssBaseline,
    TextField,
    ThemeProvider,
    Typography,
    createTheme,
  } from "@material-ui/core";
  import React, { useEffect, useState } from "react";
  import FormService from "../../components/Services/FormService";
  import Table from "@mui/joy/Table";
import { useNavigate } from "react-router-dom";
  
  const defaultTheme = createTheme();
  
  export default function GetEquipments() {
    const [loading, setLoading] = useState(true);
    const [labEquipment, setLabEquipment] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredlabEquipment, setFilteredlabEquipment] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            const response = await FormService.getLabEquipmentNames();
            setLabEquipment(response.data);
            setFilteredlabEquipment(response.data); 
          } catch (error) {
            console.log(error);
          }
          setLoading(false);
        };
        fetchData();
      }, []);
  
    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);
    
        if (!searchTerm) {
          // If search term is empty, show all data
          setFilteredlabEquipment(labEquipment);
        } else {
          // Filter data based on search term
          const filteredChemicals = labEquipment.filter((row) => {
            const Name = row.equipment_name.toLowerCase();
            return Name.includes(searchTerm);
          });
          setFilteredlabEquipment(filteredChemicals);
        }
      };
  
    const prependProtocol = (url) => {
      if (!/^https?:\/\//i.test(url)) {
        return `https://${url}`;
      }
      return url;
    };

    const navigate = useNavigate()

  const handleBack = () => {
    navigate("/Admin/EquipmentManagment");
  };

  
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xl">
          <CssBaseline />

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
  
  
        <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="20px" marginBottom="20px">
          <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
          margin="normal"
          />
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="20px" marginBottom="20px">
          <div className="container mx-auto my-8">
            <div className="h-12"></div>
            <div className="flex shadow border-b">
              <Table
                hoverRow
                borderAxis="both"
                color="primary"
                size="md"
                stickyFooter={false}
                stickyHeader
                stripe="odd"
                variant="soft"
                >
                <thead>
                  <tr>
                    <th style={{ width: "3%", fontSize: "13px", height: "50px" }}>
                      {"Id"}
                    </th>
                    <th style={{ fontSize: "13px", height: "40px" }}>
                      {"Name"}
                    </th>
                    <th style={{ fontSize: "13px", height: "40px" }}>
                      {"Type"}
                    </th>
                    <th style={{ fontSize: "13px", height: "40px"  }}>
                      {"Status"}
                    </th>
                    <th style={{ fontSize: "13px", height: "40px" }}>
                      {"Description"}
                    </th>
                    <th style={{ fontSize: "13px", height: "40px" }}>
                      {"Instruction"}
                    </th>
                  </tr>
                </thead>
  
                {!loading && (
                    <tbody>
                    {filteredlabEquipment.map((row) => (
                        <tr key={row.id}>
                        <td>{row.equipment_id}</td>
                        <td>{row.equipment_name}</td>
                        <td>{row.equipment_type}</td>
                        <td>{row.equipment_status}</td>
                        <td>{row.equipment_description}</td>
                        <td>{row.equipment_instruction}</td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </Table>
            </div>
          </div>
        </Box>
        </Container>
      </ThemeProvider>
    );
  }
  