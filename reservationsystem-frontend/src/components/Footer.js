import React from "react";
import Logo from '../images/logo.png'
import { SiLinkedin } from "react-icons/si";


const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-section-one">
        <div className="footer-logo-container">
          <img src={Logo} alt="" />
        </div>
        <div className="footer-icons" >
          <a href="https://www.linkedin.com/school/the-open-university-of-sri-lanka/?originalSubdomain=lk">
          <SiLinkedin />
          </a>
        </div>
      </div>
      <div className="footer-section-two">
        <div className="footer-section-columns">
        <a href="./DatabaseMenu">Database</a>
          <a href="./About">About</a>
          <a href="./Contact">Contact</a>

 
        </div>
        <div className="footer-section-columns">
          <span>011-1231230</span>
          <span>081-1231230</span>
          <span>Reginfo@ou.ac.lk</span>

        </div>
        <div className="footer-section-columns">
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;