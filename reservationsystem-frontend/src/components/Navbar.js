import React, { useState } from "react";
import Logo from "../../src/images/logo.png";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-logo-container ">
        <img src={Logo} alt="" />
      </div>
      <div className="navbar-links-container">
        <a className="primary-button" href="/DatabaseMenu">
          Database
        </a>
        <a className="primary-button" href="./About">
          About
        </a>
        <a className="primary-button" href="./Contact">
          Contact
        </a><a className="primary-button" href="./Dashboard">
          DashBoard
        </a>
        <a className="primary-button" href="./">
          Logout
        </a>
        
      </div>
    </nav>
  );
};

export default Navbar;
