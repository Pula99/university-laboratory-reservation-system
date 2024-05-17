import "./App.css";
import "../src/Styles/Preloader.css";
import Home from "./components/Home";
import Register from "./components/Sign-In-Up/Register";
import Footer from "./components/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./components/Sign-In-Up/Login";
import About from "./components/About";
import Contact from "./components/Contact";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import AdminHome from "./admin/AdminHome";
import UserManagment from "./admin/UserManagment";
import UserRegistation from "./admin/UserManagment/UserRegistration";
import AddChemical from "./admin/ChemicalManagment/AdminDatabaseInsert";
import ChemicalManagment from "./admin/ChemicalManagment";
import GetChemicals from "./admin/ChemicalManagment/AdminLiquidChemicalDatabase";
import EquipmentManagment from "./admin/EquipmentManagment";
import GetEquipments from "./admin/EquipmentManagment/GetEquipments";
import AddLabEquipment from "./admin/EquipmentManagment/AddLabEquipment";
import DatabaseMenu from "./components/Database/DatabaseMenu";
import LiquidChemicalDatabase from "./components/Database/LiquidChemicalDatabase";
import SolidChemicalDatabase from "./components/Database/SolidChemicalDatabase";
import LabEquipmentDatabase from "./components/Database/LabEquipmentDatabase";
import ReservationSummary from "./components/Reservation/ReservationSummary";
import FormikContainer from "./components/Reservation/FormikContainer";
import DashboardHome from "./components/UserDashboard/DashboardHome";
import ReservationHistory from "./components/UserDashboard/ReservatioManager/ReservationHistory";
import usePreventZoom from "../src/Configs/usePreventZoom"
import ReservationNotice from "./components/Reservation/ReservationNotice";
import ReservationDetails from "./components/UserDashboard/ReservatioManager/ReservationDetails";
import Profile from "./components/UserDashboard/ProfileManager/Profile";
import ManageUsers from "./admin/UserManagment/ManageUsers";
import UserDetails from "./admin/UserManagment/UserDetails";
import AdminDatabaseMenu from "./admin/ChemicalManagment/AdminDatabaseMenu";
import AdminLiquidChemicalDatabase from "./admin/ChemicalManagment/AdminLiquidChemicalDatabase";
import AdminSolidChemicalDatabase from "./admin/ChemicalManagment/AdminSolidChemicalDatabase";
import AdminLabEquipmentDatabase from "./admin/ChemicalManagment/AdminLabEquipmentDatabase";
import AdminDatabaseView from "./admin/ChemicalManagment/AdminDatabaseView";
import AdminDatabaseInsert from "./admin/ChemicalManagment/AdminDatabaseInsert";
import AdminInsertSolidChemical from "./admin/ChemicalManagment/AdminInsertSolidChemical";
import AdminInsertLiquidChemical from "./admin/ChemicalManagment/AdminInsertLiquidChemical";
import AdminInsertLabEquipment from "./admin/ChemicalManagment/AdminInsertLabEquipment";

const theme = createTheme();

function App() {
  usePreventZoom();
  return (
      
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/Home" element={<Home />} />

          <Route path="/Admin/Home" element={<AdminHome />} />
          <Route path="/Admin/UserManagment" element={<UserManagment/>} />
          <Route path="/Admin/UserManagment/UserRegistation" element={<UserRegistation/>} />
          <Route path="/Admin/UserManagment/ManageUsers" element={<ManageUsers/>} />
          <Route path="/Admin/UserManagment/ManageUsers/UserDetails" element={<UserDetails/>} />
          <Route path="/Admin/ChemicalManagment" element={<ChemicalManagment/>} />
          <Route path="/Admin/ChemicalManagment/AddChemicals" element={<AddChemical/>} />
          <Route path="/Admin/EquipmentManagment" element={<EquipmentManagment/>} />
          <Route path="/Admin/Database" element={<AdminDatabaseMenu/>} />
          <Route path="/Admin/Database/AdminDatabaseView" element={<AdminDatabaseView/>} />
          <Route path="/Admin/Database/AdminDatabaseView/AdminLiquidChemicalDatabase" element={<AdminLiquidChemicalDatabase/>} />
          <Route path="/Admin/Database/AdminDatabaseView/AdminSolidChemicalDatabase" element={<AdminSolidChemicalDatabase/>} />
          <Route path="/Admin/Database/AdminDatabaseView/AdminLabEquipmentDatabase" element={<AdminLabEquipmentDatabase/>} />
          <Route path="/Admin/Database/AdminDatabaseInsert" element={<AdminDatabaseInsert/>} />
          <Route path="/Admin/Database/AdminDatabaseInsert/AdminInsertSolidChemical" element={<AdminInsertSolidChemical/>} />
          <Route path="/Admin/Database/AdminDatabaseInsert/AdminInsertLiquidChemical" element={<AdminInsertLiquidChemical/>} />
          <Route path="/Admin/Database/AdminDatabaseInsert/AdminInsertLabEquipment" element={<AdminInsertLabEquipment/>} />
          <Route path="/Admin/EquipmentManagment/GetEquipments" element={<GetEquipments/>} />
          <Route path="/Admin/EquipmentManagment/AddLabEquipment" element={<AddLabEquipment/>} />

          <Route path="/Home" element={<Footer />} />
          <Route path="/About" element={<About />} />
          <Route path="/DatabaseMenu" element={<DatabaseMenu />} />
          <Route path="/DatabaseMenu/LiquidChemicalDatabase" element={<LiquidChemicalDatabase />} />
          <Route path="/DatabaseMenu/SolidChemicalDatabase" element={<SolidChemicalDatabase />} />
          <Route path="/DatabaseMenu/LabEquipmentDatabase" element={<LabEquipmentDatabase />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Reservation/Form" element={<FormikContainer />} />
          <Route path="/Reservation/ReservationSummary" element={<ReservationSummary />} />
          <Route path="/Reservation/ReservationNotice" element={<ReservationNotice />} />
          <Route path="/Register" element={<Register />} />

          <Route path="/Dashboard" element={<DashboardHome />} />
          <Route path="/Dashboard/ReservationHistory" element={<ReservationHistory />} />
          <Route path="/Dashboard/ReservationDetails" element={<ReservationDetails />} />
          <Route path="/Dashboard/Profile" element={<Profile />} />

        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
