import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../component/Loader/Loader";
import "./AllOrders.css";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaRegCheckSquare } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import SeeUserData from "./SeeUserData";

const AllOrders = () => {
  const [AllOrders, setAllOrders] = useState([]);
  const [optionsVisible, setOptionsVisible] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [userDiv, setuserDiv] = useState("hidden");
  const [userDivData, setuserDivData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-all-orders",
          { headers }
        );
        console.log(response);

        // Filter out orders where the book details are missing (null or undefined)
        const filteredOrders = response.data.data.filter((order) => order.book);
        setAllOrders(filteredOrders);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = (i, newStatus) => {
    setSelectedStatus((prevState) => ({ ...prevState, [i]: newStatus }));
    setOptionsVisible(null);
  };

  const getStatusButtonClass = (status) => {
    if (status === "Canceled") {
      return "statusButton canceled";
    }
    return "statusButton";
  };

  return (
    <>
      {!AllOrders.length ? (
        <div className="loaderOrder">
          <Loader />
        </div>
      ) : (
        <div className="ordersContainer">
          <div className="ordersTitle">
            <h1>All Orders</h1>
          </div>
          <div className="ordersHeader">
            <div className="headerItem-Sr">Sr.</div>
            <div className="headerItem-book">Books</div>
            <div className="headerItem-desc">Description</div>
            <div className="headerItem-price">Price</div>
            <div className="headerItem-status">Status</div>
            <div className="headerItem userIcon">
              <FaUser />
            </div>
          </div>

          {AllOrders.map((items, i) => (
            <div className="orderRow" key={i}>
              <div className="orderItem">{i + 1}</div>

              {/* Check if items.book exists before trying to access its properties */}
              {items.book ? (
                <>
                  <Link
                    className="orderBookTitle"
                    to={`/view-book-details/${items.book._id}`}
                  >
                    {items.book.title}
                  </Link>
                  <div className="orderDescription">
                    {items.book.desc.slice(0, 50)} ...
                  </div>
                  <div className="orderPrice">₹ {items.book.price}</div>
                </>
              ) : (
                <>
                  <div className="orderBookTitle">
                    Book details not available
                  </div>
                  <div className="orderDescription">N/A</div>
                  <div className="orderPrice">N/A</div>
                </>
              )}

              <div className="orderStatus">
                <button
                  className={getStatusButtonClass(
                    selectedStatus[i] || items.status
                  )}
                  onClick={() =>
                    setOptionsVisible(optionsVisible === i ? null : i)
                  }
                >
                  {selectedStatus[i] || items.status}
                </button>
                {optionsVisible === i && (
                  <div className="statusOptions">
                    <select
                      value={selectedStatus[i] || items.status}
                      onChange={(e) => handleStatusChange(i, e.target.value)}
                      className="statusSelect"
                    >
                      <option value="Order placed">Order placed</option>
                      <option value="Out of delivery">Out of delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Canceled">Canceled</option>
                    </select>
                    <button className="updateStatusButton">
                      <FaRegCheckSquare />
                    </button>
                  </div>
                )}
              </div>
              <button
                className="userIconButton"
                onClick={() => {
                  setuserDiv("fixed");
                  setuserDivData(items.user);
                }}
              >
                <IoOpenOutline />
              </button>
            </div>
          ))}
        </div>
      )}

      {userDivData && (
        <SeeUserData
          userDivData={userDivData}
          userDiv={userDiv}
          setuserDiv={setuserDiv}
        />
      )}
    </>
  );
};

export default AllOrders;
