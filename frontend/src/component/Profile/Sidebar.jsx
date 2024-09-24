import React from "react";
import "./Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const role = useSelector((state) => state.auth.role);

  return (
    <div className="sidebar">
      <div className="sidebar-profile">
        <img src={data.avatar} alt="User Avatar" />
        <p className="username">{data.username}</p>
        <p className="email">{data.email}</p>
        <div className="divider"></div>
      </div>

      {role === "user" && (
        <div className="user-sidebar-link">
          <Link to="/profile/favourites" className="favourites">
            Favourites
          </Link>
          <Link to="/profile/order-history" className="order-history">
            Order History
          </Link>
          <Link to="/profile/settings" className="settings">
            Settings
          </Link>
        </div>
      )}
      {role === "admin" && (
        <div className="admin-sidebar-link">
          <Link to="/profile" className="all-orders">
            All Orders
          </Link>
          <Link to="/profile/add-book" className="add-book">
            Add Book
          </Link>
        </div>
      )}
      <button
        className="log-out"
        onClick={() => {
          dispatch(authActions.logout());
          dispatch(authActions.changeRole("user"));
          localStorage.clear("id");
          localStorage.clear("token");
          localStorage.clear("role");
          history("/");
        }}
      >
        Log Out <MdLogout className="logout-icon" />
      </button>
    </div>
  );
};

export default Sidebar;
