import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import "./UserOrderHistory.css";

const UserOrderHistory = () => {
  const [OrderHistory, setOrderHistory] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrderHistory = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-order-history",
        { headers }
      );
      setOrderHistory(response.data.data);
    };
    fetchOrderHistory();
  }, []);

  return (
    <div className="UserOrderHistory">
      {!OrderHistory && <Loader />}
      {OrderHistory && OrderHistory.length === 0 && (
        <div className="OrderHistory">
          <h1>No Order History</h1>
          <img src="../../assets/order_history.png" alt="No Orders" />
        </div>
      )}
      {OrderHistory && OrderHistory.length > 0 && (
        <>
          <div className="order-history-header">
            <h1>Your Order History</h1>
          </div>
          <div className="order-table">
            <div className="order-table-header">
              <div>Sr.</div>
              <div>Books</div>
              <div>Description</div>
              <div>Price</div>
              <div>Status</div>
              <div>Mode</div>
            </div>
            {OrderHistory.map((item, i) => (
              <div className="order-row" key={item._id}>
                <div className="order-index">{i + 1}</div>
                <div className="order-book">
                  <Link to={`/view-book-details/${item.book._id}`}>
                    {item.book.title}
                  </Link>
                </div>
                <div className="order-desc">
                  {item.book.desc.slice(0, 50)}...
                </div>
                <div className="order-price">₹ {item.book.price}</div>
                <div className="order-status">
                  {item.status === "Order Placed" ? (
                    <div>{item.status}</div>
                  ) : item.status === "Canceled" ? (
                    <div>{item.status}</div>
                  ) : (
                    item.status
                  )}
                </div>
                <div className="order-mode">COD</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserOrderHistory;
