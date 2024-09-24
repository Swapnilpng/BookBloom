import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import "./Settings.css";

const Settings = () => {
  const [value, setValue] = useState({ address: "" });
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-user-information",
          { headers }
        );
        setProfileData(response.data);
        setValue({ address: response.data.address });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user information", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const submitAddress = async () => {
    try {
      await axios.put(
        "http://localhost:1000/api/v1/update-address",
        { address: value.address },
        { headers }
      );
      setMessage("Address updated successfully");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error updating address", error);
      setMessage("Failed to update address");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="user-Settings">
          <h1>Settings</h1>

          {message && <div className="flash-message">{message}</div>}

          <div className="UserInformation">
            <div>
              <label htmlFor="username">Username</label>
              <p className="user-Name">{profileData.username}</p>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <p className="user-Email">{profileData.email}</p>
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <textarea
                className="Useraddress"
                rows="5"
                placeholder="Address"
                name="address"
                value={value.address}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div>
              <button className="Update-btn" onClick={submitAddress}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
