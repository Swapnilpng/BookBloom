import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="Hero">
      <div className="heading">
        <h1>Read. Explore. Get Inspired.</h1>
        <p>
          "Ignite your passion for reading with stories that stay with you long
          after the last page."
        </p>
        <div className="button-container">
          <Link className="discover-button" to="/all-books">
            Discover Books
          </Link>
        </div>
      </div>
      <div className="img">
        <img src="../images/home page.png" alt="bookshop" />
      </div>
    </div>
  );
};

export default Hero;
