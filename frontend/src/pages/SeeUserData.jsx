import React from "react";
import "./SeeUserData.css";
import { RxCross2 } from "react-icons/rx";

const SeeUserData = ({ userDivData, userDiv, setuserDiv }) => {
  return (
    <>
      <div className={`overlay ${userDiv === "fixed" ? "show" : ""}`} />
      <div className={`user-data-container ${userDiv}`}>
        <div className="User-information">
          <h1>User Information</h1>
          <button onClick={() => setuserDiv("hidden")}>
            <RxCross2 />
          </button>
        </div>
        <div className="user-details">
          <div className="user-detail">
            <label className="user-label">Username:</label>
            <span className="user-value">{userDivData.username}</span>
          </div>
          <div className="user-detail">
            <label className="user-label">Email:</label>
            <span className="user-value">{userDivData.email}</span>
          </div>
          <div className="user-detail">
            <label className="user-label">Address:</label>
            <span className="user-value">{userDivData.address}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeeUserData;
