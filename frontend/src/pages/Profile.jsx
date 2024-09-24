import React, { useEffect, useState } from "react";
import "./Profile.css";
import Sidebar from "../component/Profile/Sidebar";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../component/Loader/Loader";

const Profile = () => {
  const isLoggedIn = useSelector((state) => state.user);
  const [Profile, setProfile] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-user-information",
        { headers }
      );
      setProfile(response.data);
    };
    fetch();
  }, []);

  return (
    <div className="Container">
      {!Profile && (
        <div className="Loader">
          <Loader />
        </div>
      )}
      {Profile && (
        <>
          <div className="Sidebar">
            <Sidebar data={Profile} />
          </div>
          <div className="Outlet">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
