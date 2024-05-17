import React from "react";
import BannerImage from "../images/Laboratory.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import { Navigate } from "react-router-dom";
import Footer from "./Footer";
const Home = () => {
  const [goToForm, setGoToForm] = React.useState(false);

  if (goToForm) {
    return <Navigate to="/Reservation/Form"></Navigate>;
  }

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerImage} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Chemistry Laboratory Reservation System
          </h1>
          <p className="primary-text">
            Embark on a seamless reservation journey by selecting your desired
            laboratory chemicals through our intuitive online system, making the
            process efficient and hassle-free.{" "}
          </p>
          <button
            className="secondary-button"
            onClick={() => {
              setGoToForm(true);
            }}
          >
            Reservations <FiArrowRight />{" "}
          </button>
        </div>
        <div className="home-image-section">
          <img src={""} alt="" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
