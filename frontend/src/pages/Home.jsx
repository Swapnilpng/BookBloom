import React from "react";
import "./Home.css";
import Hero from "../component/Home/Hero";
import RecentlyAdded from "../component/Home/RecentlyAdded";

const Home = () => {
  return (
    <div className="Home">
      <Hero />
      <RecentlyAdded />
    </div>
  );
};

export default Home;
